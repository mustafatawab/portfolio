---
title: "Docker Compose for Production — depends_on, Healthchecks & Migration Patterns"
description: "Production-hardening your Compose setup with all three depends_on conditions, zero-downtime migration patterns, and a battle-tested compose.yaml for Next.js, Express, and PostgreSQL."
date: "2026-07-21"
tags: ["Docker", "DevOps", "Docker Compose", "PostgreSQL", "Production"]
category: "DevOps"
readTime: "11 min read"
featured: false
---

In the [previous article](/blogs/docker-compose-intro), we built a working Compose setup. It starts services, connects them, and persists data. Good enough for development.

But production is a different animal:

- **Service startup order** — the API must wait for PostgreSQL to be *ready*, not just *running*
- **Database migrations** — must run exactly once, before the API starts, without race conditions
- **Failure recovery** — a crashed service should restart, but a misconfigured one should stay down
- **Zero-downtime deployments** — the old API must keep serving requests until the new one is healthy

Let's harden every piece.

---

## The Three `depends_on` Conditions

Most developers know `depends_on`. Few know it has three conditions:

```yaml
depends_on:
  <service>:
    condition: <service_started | service_healthy | service_completed_successfully>
```

### `condition: service_started` (Default)

This is what `depends_on` does without any condition. It waits for the container to start — not for the process inside to be ready.

```yaml
depends_on:
  - postgres
```

**Problem:** PostgreSQL container starts in ~1 second but takes 3-5 seconds to be ready for queries. Your API starts, tries to connect, fails, and exits. The restart policy restarts the API, and it retries. This works eventually but wastes time and generates noise in logs.

### `condition: service_healthy`

This is what you want for databases. It waits for the service to pass its healthcheck.

```yaml
depends_on:
  postgres:
    condition: service_healthy
```

With a proper healthcheck defined on the PostgreSQL service:

```yaml
postgres:
  image: postgres:16-alpine
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U app_user -d my_app"]
    interval: 3s
    timeout: 3s
    retries: 10
    start_period: 10s
```

Compose does not start the API until PostgreSQL passes its healthcheck. Zero connection errors, zero restarts.

### `condition: service_completed_successfully`

This waits for a service to run and exit with code 0. It's perfect for one-off tasks like database migrations.

```yaml
services:
  migrations:
    build:
      context: ./api
      dockerfile: Dockerfile
    command: npx prisma migrate deploy
    env_file:
      - ./api/.env.production
    depends_on:
      postgres:
        condition: service_healthy

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    depends_on:
      migrations:
        condition: service_completed_successfully
```

The flow:

1. PostgreSQL starts and becomes healthy
2. The migration service runs `prisma migrate deploy` and exits
3. Only after migrations complete successfully does the API start

This guarantees that your API never starts with a stale database schema.

---

## The Migration Service Pattern

Database migrations are the most dangerous operation in any deployment. They must:

- Run before the application starts
- Run exactly once per deployment
- Be idempotent (safe to re-run)
- Never run concurrently

Here's the production pattern:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: prod-db
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
      interval: 3s
      timeout: 3s
      retries: 10
      start_period: 10s

  migrations:
    build:
      context: ./api
      dockerfile: Dockerfile
    container_name: prod-migrations
    env_file:
      - ./api/.env.production
    environment:
      DATABASE_URL: postgres://app_user:${DB_PASSWORD}@postgres:5432/my_app
    depends_on:
      postgres:
        condition: service_healthy
    command: npx prisma migrate deploy

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    container_name: prod-api
    restart: unless-stopped
    ports:
      - "3000:3000"
    env_file:
      - ./api/.env.production
    environment:
      DATABASE_URL: postgres://app_user:${DB_PASSWORD}@postgres:5432/my_app
      NODE_ENV: production
    depends_on:
      migrations:
        condition: service_completed_successfully
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 15s
```

### Why This Pattern Works

- **Idempotent migrations**: `prisma migrate deploy` only applies migrations that haven't been applied yet. Running it multiple times is safe.
- **No race conditions**: Only one migration service runs per deployment because Compose starts it once and waits for it to finish.
- **Explicit ordering**: PostgreSQL → Migrations → API. Each waits for the previous step to fully complete.
- **Fail-fast**: If migrations fail, the API never starts. You learn about the failure immediately instead of discovering it when requests start erroring.

---

## Migration Rollback Strategy

What if a migration fails? The best defense is a three-step process:

### 1. Preview Before Apply

Add a preview service that runs migrations in dry-run mode:

```yaml
preview-migrations:
  build:
    context: ./api
    dockerfile: Dockerfile
  env_file:
    - ./api/.env.production
  environment:
    DATABASE_URL: postgres://app_user:${DB_PASSWORD}@postgres:5432/my_app
  depends_on:
    postgres:
      condition: service_healthy
  command: npx prisma migrate status

  profiles:
    - preview
```

Run it to check migration status before deploying:

```bash
docker compose --profile preview run --rm preview-migrations
```

### 2. Generate Rollback Scripts

For critical migrations, generate the SQL ahead of time:

```bash
npx prisma migrate diff \
  --from-schema-datamodel prisma/schema.prisma \
  --to-schema-datamodel prisma/schema.backup.prisma \
  --script > rollback.sql
```

Keep this file with the release. If the migration fails in production, run the rollback SQL against the database.

### 3. Blue-Green Deployments

Run two versions of the API simultaneously. Migrate the database to a backward-compatible state, then switch traffic:

```
Version 1 (old schema) → handles current traffic
Version 2 (new schema) → deploys with new migrations

Step 1: Deploy backward-compatible migration (add columns, don't remove old ones)
Step 2: Deploy new API version that works with old and new columns
Step 3: Switch traffic to new version
Step 4: Clean up old columns in a separate migration
```

This is overkill for most applications. Use it when zero downtime is a hard requirement.

---

## Production compose.yaml

Here's the complete production file for a Next.js + Express + PostgreSQL stack:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: prod-db
    restart: unless-stopped
    ports:
      - "127.0.0.1:5432:5432"
    environment:
      POSTGRES_USER: app_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: my_app
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app_user -d my_app"]
      interval: 3s
      timeout: 3s
      retries: 10
      start_period: 10s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  migrations:
    build:
      context: ./api
      dockerfile: Dockerfile
    container_name: prod-migrations
    env_file:
      - ./api/.env.production
    environment:
      DATABASE_URL: postgres://app_user:${DB_PASSWORD}@postgres:5432/my_app
    depends_on:
      postgres:
        condition: service_healthy
    command: npx prisma migrate deploy

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    container_name: prod-api
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    env_file:
      - ./api/.env.production
    environment:
      DATABASE_URL: postgres://app_user:${DB_PASSWORD}@postgres:5432/my_app
      NODE_ENV: production
    depends_on:
      migrations:
        condition: service_completed_successfully
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 15s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  web:
    build:
      context: ./web
      dockerfile: Dockerfile
    container_name: prod-web
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://api:3000
    depends_on:
      - api
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 15s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

volumes:
  pgdata:
```

### What Changed from the Dev Compose

| | Dev | Production |
|---|---|---|
| **Port binding** | `5432:5432` (all interfaces) | `127.0.0.1:5432:5432` (localhost only) |
| **Healthchecks** | None | Every service has one |
| **Logging** | Default | Rotating JSON logs |
| **Migration service** | None | Explicit migration step |
| **depends_on** | Simple | Conditional |
| **Restart** | Default | `unless-stopped` on everything |

---

## Why Bind to `127.0.0.1`

Production bindings should never expose ports to `0.0.0.0`:

```yaml
# ❌ Bad — accessible from any network interface
ports:
  - "5432:5432"

# ✅ Good — only accessible from the host machine
ports:
  - "127.0.0.1:5432:5432"
```

If your database is on the same machine as your API, the API can reach it through the Docker network (via the service name `postgres:5432`). The host binding is only for admin access, backups, and debugging tools. Binding to `127.0.0.1` prevents external access.

---

## Production Deployment Flow

A complete production deployment with this setup:

```bash
# 1. Pull latest code
git pull origin main

# 2. Build new images
docker compose build

# 3. Start the database (if not already running)
# If the database is already running, this is a no-op
docker compose up -d postgres

# 4. Wait for database to be healthy
docker compose run --rm migrations

# 5. Deploy the new API
docker compose up -d api

# 6. Verify the API is healthy
docker compose ps
docker compose logs api

# 7. Deploy the frontend
docker compose up -d web
```

Or as a single command that handles everything correctly:

```bash
docker compose up -d
```

The `depends_on` conditions handle the ordering. Compose starts PostgreSQL, waits for it to be healthy, runs migrations, waits for them to complete, and only then starts the API and web services.

---

## What's Next?

Compose handles local multi-service orchestration beautifully. But eventually your application needs to run on a server that isn't your laptop. That means Linux.

For developers coming from macOS, the Linux terminal feels foreign. Different package managers, different file paths, different permission models. Every Docker command runs on Linux under the hood — understanding it makes you a better Docker user.

The next article bridges that gap: a survival guide for macOS developers deploying to Linux.

---

*This article is part of the **DevOps from Zero** series.*

| Article | Topic |
|---------|-------|
| 1. [What is Docker and Why Should You Care?](/blogs/what-is-docker) | |
| 2. [Writing Your First Dockerfile — The Right Way](/blogs/writing-your-first-dockerfile) | |
| 3. [Multi-Stage Docker Builds — Shrink Your Image from 900MB to 180MB](/blogs/multi-stage-docker-builds) | |
| 4. [Docker Compose — Stop Running 10 docker run Commands](/blogs/docker-compose-intro) | |
| **5. Docker Compose for Production — depends_on, Healthchecks & Migration Patterns** | ← You are here |
| 6. Linux Survival Guide for Developers Coming from macOS | Coming soon |
| 7. GitHub Actions From Zero — Build Your First Pipeline | Coming soon |
| 8. Docker + GitHub Actions — Build, Push & Deploy Automatically | Coming soon |
