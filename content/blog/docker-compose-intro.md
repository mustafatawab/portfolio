---
title: "Docker Compose — Stop Running 10 docker run Commands"
description: "A practical guide to Docker Compose covering services, networks, volumes, environment configuration, restart policies, and a real multi-service example with Next.js, Express, and PostgreSQL."
date: "2026-07-21"
tags: ["Docker", "DevOps", "Docker Compose", "PostgreSQL"]
category: "DevOps"
readTime: "12 min read"
featured: false
---

By now you know how to build and run a single container. But real applications don't run in isolation. You need:

- A database (PostgreSQL)
- A backend API (Express/Fastify)
- A frontend (Next.js)
- Maybe Redis for caching
- A migration service for database schema changes

Running all of these with `docker run` commands is a nightmare:

```bash
# Don't do this
docker network create my-app

docker run -d --name postgres \
  --network my-app \
  -e POSTGRES_PASSWORD=secret \
  -v pgdata:/var/lib/postgresql/data \
  postgres:16-alpine

docker run -d --name api \
  --network my-app \
  -e DATABASE_URL=postgres://postgres:secret@postgres:5432/myapp \
  -p 3000:3000 \
  my-api

docker run -d --name web \
  --network my-app \
  -e API_URL=http://api:3000 \
  -p 8080:3000 \
  my-web

docker run --rm \
  --network my-app \
  -e DATABASE_URL=postgres://postgres:secret@postgres:5432/myapp \
  my-api npx prisma migrate deploy
```

Ten flags, three terminals, and if you get one port wrong everything breaks. **Docker Compose fixes this.**

---

## What is Docker Compose?

Docker Compose lets you define your entire multi-service application in a single `compose.yaml` file. One command starts everything:

```bash
docker compose up -d
```

Everything is on the same network. Volumes are configured. Environment variables are set. Dependencies are ordered. All from one file.

---

## Your First `compose.yaml`

Let's build a real example: a Next.js frontend + Express API + PostgreSQL database.

```yaml
# compose.yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: my-app-db
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: app_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: my_app
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app_user -d my_app"]
      interval: 5s
      timeout: 5s
      retries: 5

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    container_name: my-app-api
    restart: unless-stopped
    ports:
      - "3000:3000"
    env_file:
      - ./api/.env.production
    environment:
      DATABASE_URL: postgres://app_user:${DB_PASSWORD}@postgres:5432/my_app
      NODE_ENV: production
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - api-logs:/app/logs

  web:
    build:
      context: ./web
      dockerfile: Dockerfile
    container_name: my-app-web
    restart: unless-stopped
    ports:
      - "8080:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://api:3000
    depends_on:
      - api

volumes:
  pgdata:
  api-logs:
```

Run it:

```bash
docker compose up -d
```

All three services start. The API waits for PostgreSQL to be healthy. The web app waits for the API. One command, everything connected.

---

## Services

Each block under `services:` is a container. Compose handles:

- **Building**: If you specify `build:`, Compose runs `docker build` for you. If you specify `image:`, it pulls from Docker Hub.
- **Naming**: `container_name` sets a predictable name. Without it, Compose generates names like `my-app-api-1`.
- **Restart**: `restart: unless-stopped` means the container auto-restarts on crash but stays stopped if you manually stop it.

---

## Networks

Compose automatically creates a default network for all services in the file. Every service can reach every other service by its service name.

```
Containers on the default network
┌─────────────────────────────────────┐
│  web (service name)                 │
│  api (service name)                 │
│  postgres (service name)            │
│                                     │
│  web → http://api:3000              │
│  api → postgres:5432                │
└─────────────────────────────────────┘
```

The magic: containers communicate by **service name**, not IP address. Compose handles DNS resolution. From the API container, `postgres:5432` resolves to the PostgreSQL container's IP.

You don't need to create or join networks manually. Compose does it for you.

---

## Volumes

Volumes persist data across container restarts. Without volumes, database data is lost when the container stops.

```yaml
services:
  postgres:
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

This creates a named volume `pgdata` managed by Docker. It persists even after `docker compose down`. To destroy it:

```bash
docker compose down -v
```

**Bind mounts** are another option — they map a host directory instead of a Docker volume:

```yaml
services:
  api:
    volumes:
      - ./api:/app # Development: use local source code
      - /app/node_modules # Don't override node_modules
```

Bind mounts are useful in development where you want live code reloading. In production, use named volumes.

---

## Environment Variables: `env_file` vs `environment`

This is a common source of confusion. Here's the difference:

### `environment`

Inline key-value pairs:

```yaml
environment:
  NODE_ENV: production
  DATABASE_URL: postgres://app_user:password@postgres:5432/my_app
```

For secrets, use variable references from a `.env` file in the project root:

```yaml
environment:
  DB_PASSWORD: ${DB_PASSWORD}
```

### `env_file`

Reference a file containing environment variables:

```yaml
env_file:
  - ./api/.env.production
```

### When to Use Which

| Approach                   | Use Case                                              |
| -------------------------- | ----------------------------------------------------- |
| `environment`              | Non-sensitive, short values, or referencing variables |
| `env_file`                 | Many variables, environment-specific configs          |
| `.env` file (project root) | Shared variables used across multiple services        |

Compose automatically loads a `.env` file from the project root. Variables from `.env` can be referenced with `${VAR_NAME}` syntax in the compose file.

**Security note:** Never commit `.env` or `.env.production` to git. Add them to `.gitignore`. Use `.env.example` as a template.

---

## Restart Policies

| Policy           | Behavior                                           |
| ---------------- | -------------------------------------------------- |
| `no`             | Never restart (default)                            |
| `always`         | Always restart, even if stopped manually           |
| `unless-stopped` | Restart unless manually stopped (recommended)      |
| `on-failure`     | Restart only if container exits with non-zero code |

For production services:

```yaml
restart: unless-stopped
```

This is the safest default. Containers restart on crash or system reboot. Manual stops are respected.

---

## Healthchecks

A `docker run` doesn't tell you if your application is actually _working_. It only tells you the process started. Healthchecks solve this:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 10s
  timeout: 5s
  retries: 3
  start_period: 15s
```

For PostgreSQL, use `pg_isready`:

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U app_user -d my_app"]
  interval: 5s
  timeout: 5s
  retries: 5
```

Healthchecks are how `depends_on` with conditions works:

```yaml
depends_on:
  postgres:
    condition: service_healthy
```

Without the healthcheck, `depends_on` only waits for the container to start — not for PostgreSQL to be ready to accept connections. PostgreSQL starts in ~1 second but takes 3-5 seconds to be ready for queries. Without a healthcheck condition, your API connects and fails immediately.

---

## Useful Compose Commands

```bash
# Start all services
docker compose up -d

# View logs from all services
docker compose logs -f

# View logs from a specific service
docker compose logs -f api

# Rebuild and start
docker compose up -d --build

# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v

# Run a one-off command in a service
docker compose run --rm api npx prisma migrate deploy

# List running services
docker compose ps

# Restart a single service
docker compose restart api

# Scale a service (Compose v2+)
docker compose up -d --scale api=3
```

---

## Development vs Production: Separate Compose Files

Compose supports merging multiple files. The convention:

```yaml
# compose.yaml (base — shared config)
services:
  api:
    image: my-api
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
```

```yaml
# compose.dev.yaml (development overrides)
services:
  api:
    build:
      context: ./api
      dockerfile: Dockerfile.dev
    volumes:
      - ./api/src:/app/src
    environment:
      NODE_ENV: development
```

Use them together:

```bash
# Development
docker compose -f compose.yaml -f compose.dev.yaml up -d

# Production
docker compose -f compose.yaml -f compose.prod.yaml up -d
```

The override pattern keeps production config clean while enabling hot-reload and debug ports in development.

---

## The `.env` File

Create `.env` in your project root (next to `compose.yaml`):

```
DB_PASSWORD=supersecret
API_KEY=abc123
```

Compose loads this automatically. Reference variables in `compose.yaml`:

```yaml
environment:
  DB_PASSWORD: ${DB_PASSWORD}
```

Add `.env` to `.gitignore`. Create `.env.example` with placeholder values:

```
DB_PASSWORD=change-me
API_KEY=change-me
```

---

## Putting It All Together

Here's what happens when you run `docker compose up -d`:

1. Compose reads `compose.yaml` and `.env`
2. It creates the default network if it doesn't exist
3. It creates named volumes if they don't exist
4. It builds images for services with `build:` defined
5. It pulls images for services with `image:` defined
6. It starts services respecting `depends_on` order and healthcheck conditions
7. It attaches DNS resolution so services find each other by name

All of this from one file. No shell scripts, no network setup, no manual volume creation.

---

## What's Next?

Compose works great for local development and simple deployments. But production has stricter requirements: zero-downtime migrations, proper dependency ordering, and health-aware service coordination.

In the next article, we'll take this Compose setup and harden it for production — covering migration patterns, all three `depends_on` conditions, and production-ready healthcheck strategies.

---

_This article is part of the **DevOps from Zero** series._

| Article                                                                                                  | Topic          |
| -------------------------------------------------------------------------------------------------------- | -------------- |
| 1. [What is Docker and Why Should You Care?](/blogs/what-is-docker)                                      |                |
| 2. [Writing Your First Dockerfile — The Right Way](/blogs/writing-your-first-dockerfile)                 |                |
| 3. [Multi-Stage Docker Builds — Shrink Your Image from 900MB to 180MB](/blogs/multi-stage-docker-builds) |                |
| **4. Docker Compose — Stop Running 10 docker run Commands**                                              | ← You are here |
| 5. Docker Compose for Production                                                                         | Coming soon    |
| 6. Linux Survival Guide for Developers Coming from macOS                                                 | Coming soon    |
| 7. GitHub Actions From Zero — Build Your First Pipeline                                                  | Coming soon    |
| 8. Docker + GitHub Actions — Build, Push & Deploy Automatically                                          | Coming soon    |
