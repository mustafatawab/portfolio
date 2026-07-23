---
title: "Writing Your First Dockerfile — The Right Way"
description: "A production-ready Dockerfile for Node.js applications, covering every instruction, layer caching optimization, and the dist/server.js vs npm start trap that most tutorials get wrong."
date: "2026-07-21"
tags: ["Docker", "DevOps", "Node.js", "Dockerfile"]
category: "DevOps"
readTime: "11 min read"
featured: false
---

In the [previous article](/blogs/what-is-docker), we covered containers, images, and why Docker exists. Now it's time to write the most important file in your Docker workflow — the `Dockerfile`.

A well-written Dockerfile is the difference between a build that takes 2 seconds and one that takes 2 minutes. It's the difference between a 180MB image and a 900MB one. And it's the difference between a deployment that works predictably and one that doesn't.

Let's build one instruction at a time.

---

## The Naive Dockerfile (What Not to Do)

Most tutorials — and most beginners — start here:

```dockerfile
FROM node:22

WORKDIR /app

COPY . .

RUN npm install

CMD ["node", "index.js"]
```

This works. But it has four problems:

1. **Image is huge** — the full `node:22` image is ~900MB
2. **No layer caching** — changing any file invalidates the entire `npm install` cache
3. **Runs as root** — security vulnerability in production
4. **No `.dockerignore`** — `node_modules` and local config get copied into the image

Let's fix every one of these.

---

## The Right Way — Instruction by Instruction

### Step 1: Choose a Base Image

```dockerfile
FROM node:22-alpine AS builder
```

Alpine Linux is ~5MB vs Debian's ~80MB. The `node:22-alpine` image is ~130MB versus `node:22` at ~900MB.

| Image            | Size   | Use Case                          |
| ---------------- | ------ | --------------------------------- |
| `node:22`        | ~900MB | Full Debian, full build toolchain |
| `node:22-alpine` | ~130MB | Minimal, production, most apps    |
| `node:22-slim`   | ~200MB | Smaller than full, has glibc      |

Always default to `-alpine` unless you need native extensions that require compilation.

### Step 2: Set the Working Directory

```dockerfile
WORKDIR /app
```

Every subsequent instruction — `COPY`, `RUN`, `CMD` — runs relative to this directory. Docker creates it if it doesn't exist.

Think of `WORKDIR` like `cd`, but better: it works even if the directory doesn't exist yet, and it carries forward for all future instructions.

### Step 3: Copy `package.json` First (Layer Caching Trick)

```dockerfile
COPY package.json package-lock.json ./
```

This is the single most important optimization in any Dockerfile.

**Why does the order matter?** Docker builds images in layers. Each instruction creates a new layer. Docker caches each layer and only rebuilds it if the input changed.

```
COPY package.json → Cached (unless package.json changed)
RUN npm install   → Cached (unless package.json changed)
COPY .            → Rebuilt (code changes every time)
```

By copying `package.json` before the rest of your code, `npm install` only re-runs when your dependencies change — not when you change a single line of `index.js`.

> **Rule of thumb:** Order instructions from least-frequently-changing to most-frequently-changing. Base image → system dependencies → package.json → application code.

### Step 4: Install Dependencies

```dockerfile
RUN npm ci --omit=dev
```

Why `npm ci` instead of `npm install`?

| Command       | Behavior                                                            |
| ------------- | ------------------------------------------------------------------- |
| `npm install` | Writes to `package-lock.json`, different behavior per environment   |
| `npm ci`      | Uses `package-lock.json` exactly, fails if they don't match, faster |

`npm ci` is designed for CI and production. It:

- Deletes `node_modules` and reinstalls from scratch
- Respects `package-lock.json` exactly — no surprises
- Is 2-3x faster than `npm install`
- Fails immediately if `package-lock.json` doesn't match `package.json`

`--omit=dev` skips dev dependencies (TypeScript, ESLint, test frameworks). Smaller `node_modules`, smaller image, fewer vulnerabilities to patch.

### Step 5: Copy Application Code

```dockerfile
COPY . .
```

This runs every time your code changes. That's fine — it's the last step before the build, so only the application code layer gets invalidated.

### Step 6: Build the Application

```dockerfile
RUN npm run build
```

Compiles TypeScript to JavaScript, bundles assets, whatever your build step does. The output goes to `dist/` (or whatever `outDir` your `tsconfig.json` specifies).

### Step 7: The Production Stage (Multi-Stage Build)

```dockerfile
FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

USER node

CMD ["node", "dist/server.js"]
```

This is what makes Docker images small and secure:

- **Multi-stage build**: The `builder` stage has TypeScript, dev dependencies, and source code. The `runner` stage only copies the compiled output — no TypeScript, no source, no dev dependencies.
- **`USER node`**: Runs the application as a non-root user. The `node` user is built into the official Node.js images. Without this, your container runs as root — if an attacker exploits a vulnerability, they have full access.
- **`EXPOSE 3000`**: Documentation — tells Docker that the app listens on port 3000. Remember from the first article: this doesn't actually publish the port.

---

## The Complete Dockerfile

```dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

USER node

CMD ["node", "dist/server.js"]
```

Build it:

```bash
docker build -t my-api .
```

Run it:

```bash
docker run -d -p 3000:3000 --name my-api my-api
```

---

## `node dist/server.js` vs `npm start`

This looks trivial but it matters in production.

```dockerfile
CMD ["node", "dist/server.js"]    # ✅ Right
CMD ["npm", "start"]              # ❌ Wrong
```

Here's why:

|                     | `npm start`                                   | `node dist/server.js`          |
| ------------------- | --------------------------------------------- | ------------------------------ |
| **Node version**    | Uses system `node`                            | Uses image `node`              |
| **Signal handling** | npm doesn't forward SIGTERM properly          | Node handles signals correctly |
| **Process ID**      | npm is PID 1, not your app                    | Your app is PID 1              |
| **Startup time**    | npm adds 200-300ms overhead                   | Direct — no overhead           |
| **Shutdown**        | `docker stop` may hang, forcing `docker kill` | Graceful shutdown works        |

When you run `npm start`, npm becomes PID 1 inside the container. When Docker sends a SIGTERM to stop the container, npm doesn't forward it to your Node.js process. Your app keeps running, Docker waits 10 seconds, then sends SIGKILL. That means dropped connections, unprocessed requests, and corrupted state.

With `node dist/server.js`, your app receives the SIGTERM directly, handles it gracefully, and shuts down cleanly.

**Exception:** If you need environment variable substitution or a process manager, use `node dist/server.js` with `dotenv` and handle signals yourself. Don't rely on npm.

---

## The `.dockerignore` File

Create `.dockerignore` in your project root:

```
node_modules
.git
.env
.env.local
.env.production
*.md
.gitignore
Dockerfile
.dockerignore
dist
.next
coverage
.DS_Store
```

Without this, the `COPY . .` instruction copies your entire project directory into the Docker image, including `node_modules` (which can be gigabytes) and secret files.

Docker sends the entire build context to the Docker daemon. `.dockerignore` tells Docker what to exclude. Think of it like `.gitignore` but for Docker builds.

---

## Common Dockerfile Patterns

### Express API with TypeScript

```dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

USER node

CMD ["node", "dist/server.js"]
```

### Next.js Application

```dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

USER node

CMD ["node", "server.js"]
```

Note the `output: "standalone"` configuration in `next.config.js`:

```js
// next.config.js
module.exports = {
    output: "standalone",
}
```

This tells Next.js to build a standalone output that includes everything needed to run without `node_modules`.

---

## What's Next?

With a production-grade Dockerfile in hand, the next challenge is image size. The multi-stage build above gets your Node.js app to ~180MB. But for a TypeScript + Prisma backend, that can balloon to ~900MB if you're not careful.

In the next article, we'll use multi-stage builds to shrink a full-stack TypeScript + Prisma application from 900MB to under 200MB — and understand exactly what each stage contributes.

---

_This article is part of the **DevOps from Zero** series._

| Article                                                              | Topic          |
| -------------------------------------------------------------------- | -------------- |
| 1. [What is Docker and Why Should You Care?](/blogs/what-is-docker)  |                |
| **2. Writing Your First Dockerfile — The Right Way**                 | ← You are here |
| 3. Multi-Stage Docker Builds — Shrink Your Image from 900MB to 180MB | Coming soon    |
| 4. Docker Compose — Stop Running 10 `docker run` Commands            | Coming soon    |
| 5. Docker Compose for Production                                     | Coming soon    |
| 6. Linux Survival Guide for Developers Coming from macOS             | Coming soon    |
| 7. GitHub Actions From Zero — Build Your First Pipeline              | Coming soon    |
| 8. Docker + GitHub Actions — Build, Push & Deploy Automatically      | Coming soon    |
