---
title: "Docker + GitHub Actions — Build, Push & Deploy Automatically"
description: "A complete CI/CD pipeline that builds a Docker image in CI, pushes it to GitHub Container Registry, and deploys to a production server on every merge to main."
date: "2026-07-21"
tags: ["GitHub Actions", "Docker", "DevOps", "CI/CD", "Deployment"]
category: "DevOps"
readTime: "12 min read"
featured: false
---

This is where everything comes together.

From the first article, you understand containers and images. You can write a production-grade Dockerfile with multi-stage builds. You have a Compose setup with migration patterns and healthchecks. You set up a Linux server and know enough SSH to survive.

The last piece is automation: **when you push to main, GitHub Actions builds the Docker image, pushes it to a registry, and deploys it to your server.** No SSH, no manual commands, no forgotten steps.

---

## The Pipeline

Here's what the complete pipeline looks like:

```
You push to main
      │
      ▼
GitHub Actions triggers
      │
      ├── 1. Checkout code
      ├── 2. Log in to GitHub Container Registry
      ├── 3. Build Docker image
      ├── 4. Push image to GHCR
      ├── 5. SSH into server
      └── 6. Pull image and restart containers
```

Everything after the push is automatic. A green checkmark on your commit means the new version is live.

---

## Step 1: GitHub Container Registry (GHCR)

GitHub Container Registry is a Docker registry built into GitHub. It's free for public repositories and gives you 500MB of private storage for free.

**Why GHCR instead of Docker Hub?**

| | Docker Hub | GitHub Container Registry |
|---|---|---|
| **Free private repos** | 1 | Unlimited (500MB) |
| **Rate limits** | 100 pulls/6hr (anonymous) | No per-IP rate limits |
| **Permissions** | Separate from GitHub | Inherits from GitHub repo |
| **CI integration** | Manual auth setup | Automatic with `GITHUB_TOKEN` |

For most teams, GHCR is the simpler choice because it uses the same authentication as your repository.

### Image Naming Convention

GHCR images follow this pattern:

```
ghcr.io/<owner>/<repository>:<tag>
```

For example:

```
ghcr.io/mustafatawab/my-api:latest
ghcr.io/mustafatawab/my-api:v1.2.3
ghcr.io/mustafatawab/my-api:sha-abc1234
```

---

## Step 2: The Deployment Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: ./api
          file: ./api/Dockerfile
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}

      - name: Deploy to production
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /app
            docker compose pull
            docker compose up -d --remove-orphans
            docker image prune -f
```

### What This Does

1. **Checkout** — Pulls the code
2. **Login** — Authenticates with GHCR using the built-in `GITHUB_TOKEN` (no manual secret setup)
3. **Build & Push** — Builds the Docker image and pushes it with two tags:
   - `latest` — always points to the current production version
   - `${{ github.sha }}` — the commit hash, for rollback
4. **Deploy** — SSHes into the server, pulls the new image, and restarts containers

---

## Step 3: Multiple Services

For a multi-service application, build and push each image separately:

```yaml
name: Deploy

on:
  push:
    branches: [main]

env:
  REGISTRY: ghcr.io

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    strategy:
      matrix:
        service:
          - name: api
            context: ./api
            dockerfile: ./api/Dockerfile
          - name: web
            context: ./web
            dockerfile: ./web/Dockerfile

    steps:
      - uses: actions/checkout@v4

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push ${{ matrix.service.name }}
        uses: docker/build-push-action@v6
        with:
          context: ${{ matrix.service.context }}
          file: ${{ matrix.service.dockerfile }}
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ github.repository }}/${{ matrix.service.name }}:latest
            ${{ env.REGISTRY }}/${{ github.repository }}/${{ matrix.service.name }}:${{ github.sha }}

  deploy:
    needs: [build]
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /app
            docker compose pull
            docker compose up -d --remove-orphans
            docker image prune -f
```

The `matrix` strategy builds both images in parallel, then deploys once.

---

## Step 4: Server-Side Configuration

The deployment commands need a `compose.yaml` on the server that uses GHCR images:

```yaml
services:
  api:
    image: ghcr.io/mustafatawab/my-repo/api:latest
    container_name: prod-api
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    env_file:
      - .env.production
    depends_on:
      migrations:
        condition: service_completed_successfully

  web:
    image: ghcr.io/mustafatawab/my-repo/web:latest
    container_name: prod-web
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:3000"

  migrations:
    image: ghcr.io/mustafatawab/my-repo/api:latest
    container_name: prod-migrations
    env_file:
      - .env.production
    command: npx prisma migrate deploy
    depends_on:
      postgres:
        condition: service_healthy
```

Note that `build:` is absent. The images come from GHCR, not from local builds. `docker compose pull` fetches the latest versions.

### Authenticating the Server

Your server needs to authenticate with GHCR to pull private images:

```bash
# On the server
echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u mustafatawab --password-stdin
```

But a personal access token (PAT) is more reliable for servers:

1. Create a PAT at `github.com/settings/tokens` with `read:packages` scope
2. Add it as `GHCR_PAT` in the repository secrets
3. Log in on the server:

```bash
echo "$GHCR_PAT" | docker login ghcr.io -u mustafatawab --password-stdin
```

The token is stored in `~/.docker/config.json` and persists across sessions.

---

## Step 5: Rollback

When a deployment goes wrong, you need to go back fast. The commit hash tags make this possible:

```bash
# Roll back to a specific commit
ssh prod
cd /app

# Edit compose.yaml to pin the previous version
# ghcr.io/mustafatawab/my-api:abc1234

docker compose pull
docker compose up -d
```

Or automate it with a rollback workflow:

```yaml
# .github/workflows/rollback.yml
name: Rollback

on:
  workflow_dispatch:
    inputs:
      commit:
        description: "Commit SHA to roll back to"
        required: true

jobs:
  rollback:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy previous version
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /app
            sed -i "s/:latest/:${{ github.event.inputs.commit }}/g" compose.yaml
            docker compose pull
            docker compose up -d
```

Run it from **Actions → Rollback → Run workflow → Enter commit SHA**.

---

## Step 6: Status Notifications

Get notified when deployments succeed or fail:

```yaml
# Add as the last step in your deploy job
- name: Notify on failure
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "❌ Deployment failed: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}

- name: Notify on success
  if: success()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "✅ Deployed ${{ github.sha }} to production"
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

Same pattern works for Discord, email, or any webhook.

---

## Step 7: Complete CI/CD Pipeline

Here's the full pipeline combining tests, builds, and deployment:

```yaml
name: CI/CD

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

env:
  REGISTRY: ghcr.io

jobs:
  test:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test

  build:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    strategy:
      matrix:
        service:
          - name: api
            context: ./api
            dockerfile: ./api/Dockerfile
          - name: web
            context: ./web
            dockerfile: ./web/Dockerfile

    steps:
      - uses: actions/checkout@v4

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push ${{ matrix.service.name }}
        uses: docker/build-push-action@v6
        with:
          context: ${{ matrix.service.context }}
          file: ${{ matrix.service.dockerfile }}
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ github.repository }}/${{ matrix.service.name }}:latest
            ${{ env.REGISTRY }}/${{ github.repository }}/${{ matrix.service.name }}:${{ github.sha }}

  deploy:
    needs: [build]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /app
            docker compose pull
            docker compose up -d --remove-orphans
            docker image prune -f

      - name: Verify deployment
        run: |
          sleep 10
          curl -f https://yourapp.com/api/health || exit 1
```

The flow:

```
Pull Request (to main)
  └── test (lint, typecheck, test)

Push to main (merge)
  ├── build (Docker images → GHCR)
  └── deploy (SSH → pull → restart → verify)
```

---

## Prerequisites Checklist

Before this workflow runs successfully, verify:

**On GitHub:**
- [ ] Repository secrets configured: `SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY`
- [ ] `GITHUB_TOKEN` has `packages: write` permission (default, but verify in repo settings)

**On the server:**
- [ ] Docker and Docker Compose installed
- [ ] User has `docker` group membership (or uses `sudo`)
- [ ] `compose.yaml` exists at `/app/compose.yaml` with `image:` references
- [ ] `.env.production` exists at `/app/.env.production`
- [ ] Server is logged in to GHCR: `docker login ghcr.io`

**In the repository:**
- [ ] `Dockerfile` at `./api/Dockerfile` (and `./web/Dockerfile`)
- [ ] `.github/workflows/deploy.yml` exists

---

## What You've Built

Eight articles ago, you started with "What is Docker?" You built containerized applications, learned layer caching and multi-stage builds, orchestrated multi-service setups with Compose, hardened them for production, set up a Linux server, and automated the entire deployment pipeline.

You can now:

- **Build** production-grade Docker images
- **Ship** them to a container registry
- **Run** multi-service applications with healthchecks and migration patterns
- **Deploy** to a Linux server with zero manual SSH commands

That's not "knowing Docker." That's being able to take an application from your laptop to production, fully automated, with clean rollbacks and confidence that tests passed before anything shipped.

---

*This article is part of the **DevOps from Zero** series.*

| Article | Topic |
|---------|-------|
| 1. [What is Docker and Why Should You Care?](/blogs/what-is-docker) | |
| 2. [Writing Your First Dockerfile — The Right Way](/blogs/writing-your-first-dockerfile) | |
| 3. [Multi-Stage Docker Builds — Shrink Your Image from 900MB to 180MB](/blogs/multi-stage-docker-builds) | |
| 4. [Docker Compose — Stop Running 10 docker run Commands](/blogs/docker-compose-intro) | |
| 5. [Docker Compose for Production — depends_on, Healthchecks & Migration Patterns](/blogs/docker-compose-production) | |
| 6. [Linux Survival Guide for Developers Coming from macOS](/blogs/linux-survival-guide) | |
| 7. [GitHub Actions From Zero — Build Your First Pipeline](/blogs/github-actions-from-zero) | |
| **8. Docker + GitHub Actions — Build, Push & Deploy Automatically** | ← You are here |
