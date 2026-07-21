---
title: "Multi-Stage Docker Builds — Shrink Your Image from 900MB to 180MB"
description: "A deep dive into multi-stage Docker builds with a real TypeScript + Prisma example, covering the build-vs-run separation, the cooking analogy, and production optimizations."
date: "2026-07-21"
tags: ["Docker", "DevOps", "Dockerfile", "Node.js", "Prisma"]
category: "DevOps"
readTime: "10 min read"
featured: false
---

In the [previous article](/blogs/writing-your-first-dockerfile), we built a production-grade Dockerfile. But there's a problem: a TypeScript + Prisma backend built as a single-stage image can easily hit 900MB+.

The fix is **multi-stage builds** — one of Docker's most impactful features and the one most beginners skip because it looks complicated. It's not.

Let's walk through a real example: a Fastify API with Prisma ORM, TypeScript, and PostgreSQL.

---

## The Problem with Single-Stage Builds

Here's what most people start with:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
```

This builds and runs everything in one image. The problem:

- **TypeScript compiler** (`tsc`) is in the final image — you don't need it at runtime
- **Dev dependencies** (`@types/*`, `eslint`, `prettier`) are in the final image — unused
- **Source code** (`.ts` files) is in the final image — the compiled `.js` is what runs
- **Prisma CLI** (`prisma generate`) is only needed during build and migrations

A production image should contain *only what's needed to run the application*. Everything else is build-time garbage.

---

## The Cooking Analogy

This is the clearest way to understand multi-stage builds.

A single-stage build is like cooking dinner in the same pot you serve it in. You chop vegetables, marinate meat, simmer sauce — and then you bring the pot to the table. Every tool, every scrap, every spill is on the table with you.

| Stage | Analogy |
|-------|---------|
| Single-stage | Cooking and serving in the same dish |
| Multi-stage | Using a kitchen to prepare, then plating cleanly |

A multi-stage build has two kitchens:

1. **Builder kitchen** — has every tool: chefs knives, food processor, all ingredients. This is where the work happens.
2. **Runner kitchen** — just a plate and a clean counter. Only the finished dish goes here.

The builder kitchen can be torn down and thrown away. You only ship the plate.

---

## The Real Example: TypeScript + Prisma API

Here's the project structure we're working with:

```
src/
├── server.ts
├── routes/
├── middleware/
prisma/
├── schema.prisma
├── migrations/
package.json
tsconfig.json
```

Without multi-stage, `docker build` produces an image with TypeScript source, dev dependencies, Prisma CLI, migration files — everything. Let's fix that.

### Step 1: The Builder Stage

This stage has all the tools. It compiles TypeScript, generates Prisma client, and produces the compiled output.

```dockerfile
# ============================================
# STAGE 1: Builder
# Everything needed to compile the application
# ============================================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies (including dev dependencies needed for TypeScript)
COPY package.json package-lock.json ./
RUN npm ci

# Copy Prisma schema before source code
# This is the layer caching trick — Prisma schema changes less often than code
COPY prisma ./prisma

# Generate Prisma client (needs the schema, runs during build)
RUN npx prisma generate

# Copy the rest of the source code
COPY tsconfig.json ./
COPY src ./src

# Compile TypeScript to JavaScript
RUN npm run build
```

Key points:
- `npm ci` installs everything including dev dependencies — the builder needs TypeScript
- `prisma generate` runs before the build so the generated client is available when TypeScript compiles
- `COPY prisma ./prisma` is before `COPY src ./src` — Prisma schema changes less often than source code, so this caches better

### Step 2: The Runner Stage (Production)

This stage is clean. It copies *only* what's needed to run.

```dockerfile
# ============================================
# STAGE 2: Runner
# Minimal — only what's needed at runtime
# ============================================
FROM node:22-alpine AS runner

WORKDIR /app

# Install production dependencies only
# We do this in the runner stage separately so the runner has its own
# clean node_modules without dev dependencies mixed in
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy the Prisma client (generated code) and migrations
# The migrations are included so the init script can apply them at startup
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Copy only the compiled output — no TypeScript source
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000

USER node

CMD ["node", "dist/server.js"]
```

What's in the final image?

```
app/
├── dist/
│   ├── server.js
│   ├── routes/
│   └── middleware/
├── node_modules/
│   ├── .prisma/
│   ├── express/
│   ├── pino/
│   └── ... (only production dependencies)
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── package.json
```

What's *not* in the final image?

```
✗ node_modules/.bin/tsc                 → Build tool, not needed
✗ src/                                  → Source code, compiled to dist/
✗ node_modules/typescript               → Dev dependency, not needed
✗ node_modules/@types/*                 → Dev dependency, not needed
✗ node_modules/eslint                   → Dev dependency, not needed
```

### The Complete Dockerfile

```dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000

USER node

CMD ["node", "dist/server.js"]
```

Build and tag it:

```bash
docker build -t my-api:latest .

docker images my-api
REPOSITORY   TAG       IMAGE ID       SIZE
my-api       latest    a1b2c3d4e5f6   182MB
```

From ~900MB to ~180MB. That's an 80% reduction.

---

## Size Breakdown

Let's see exactly where the savings come from:

| Component | Single-stage | Multi-stage |
|-----------|-------------|-------------|
| Base image (`node:22`) | 900MB | — |
| Base image (`node:22-alpine`) | 130MB | 130MB |
| Dev dependencies | 400MB | — |
| TypeScript source | 2MB | — |
| Compiled output | 1MB | 1MB |
| Production dependencies | 50MB | 50MB |
| Prisma client (compiled) | 1MB | 1MB |
| **Total** | **~1.5GB** | **~182MB** |

The 130MB Alpine base + 50MB production deps + 1MB compiled code = 181MB. The remaining 1MB is overhead from the filesystem.

---

## The `--from` Flag Explained

The magic of multi-stage builds is the `COPY --from=builder` syntax:

```dockerfile
COPY --from=builder /app/dist ./dist
```

This copies files from a specific stage — not from the filesystem. You can copy from:

1. **Named stages**: `--from=builder` (referenced by `AS builder` in the Dockerfile)
2. **Previous stages**: `--from=0` (zero-indexed stage number)
3. **External images**: `--from=nginx:alpine` (copy from any image on Docker Hub)

The copied files are flattened into the current stage's filesystem with no layer history. This is why the resulting image is clean — no intermediate layers from the builder stage exist in the final image.

---

## Pro Optimization: `COPY --link`

Docker 20.10+ supports `--link` on COPY:

```dockerfile
COPY --link --from=builder /app/dist ./dist
```

Without `--link`, `COPY` copies files, then the build checks if any existing files in the destination need to be merged or replaced. With `--link`, Docker creates a new layer that snapshots the copied files independently, then links it into the build chain.

**Effect:** The `COPY --link` layer is fully cached independently. Even if a previous layer in the same stage changes, the `--link` layer doesn't need to be re-executed.

In practice, this saves ~1-2 seconds per rebuild on the runner stage. Not dramatic, but free.

---

## Prisma-Specific Optimization

The `prisma generate` step produces a binary that depends on the operating system. Alpine Linux uses `musl` libc, while Debian uses `glibc`. If you generate Prisma client on Alpine and run it on Alpine, you're fine.

But if your CI pipeline builds on Ubuntu and runs on Alpine, the Prisma binary won't work. The fix:

```dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

# ... rest of builder stage
```

Build on the same OS you run on. Alpine builder → Alpine runner. Same `libc`, same binary.

---

## Verifying Your Image

Before you ship, check what's actually in the image:

```bash
# Check image size
docker images my-api

# Inspect layers
docker history my-api

# Open a shell and explore
docker run --rm -it --entrypoint sh my-api
ls /app
du -sh /app/node_modules
```

If you see `tsc`, `eslint`, or `.ts` files in the runner, your multi-stage build is leaking build artifacts. Fix the `COPY --from=builder` paths.

---

## What's Next?

Your builds are fast, your images are lean, and your Dockerfile is production-grade. But running a single container is just the beginning.

Real applications need databases, caches, queues, and multiple services. Running them with individual `docker run` commands is a nightmare. That's where Docker Compose comes in.

---

*This article is part of the **DevOps from Zero** series.*

| Article | Topic |
|---------|-------|
| 1. [What is Docker and Why Should You Care?](/blogs/what-is-docker) | |
| 2. [Writing Your First Dockerfile — The Right Way](/blogs/writing-your-first-dockerfile) | |
| **3. Multi-Stage Docker Builds — Shrink Your Image from 900MB to 180MB** | ← You are here |
| 4. Docker Compose — Stop Running 10 `docker run` Commands | Coming soon |
| 5. Docker Compose for Production | Coming soon |
| 6. Linux Survival Guide for Developers Coming from macOS | Coming soon |
| 7. GitHub Actions From Zero — Build Your First Pipeline | Coming soon |
| 8. Docker + GitHub Actions — Build, Push & Deploy Automatically | Coming soon |
