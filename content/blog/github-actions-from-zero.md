---
title: "GitHub Actions From Zero — Build Your First Pipeline"
description: "A practical introduction to GitHub Actions covering workflows, jobs, steps, triggers, and a real CI pipeline that runs tests on every pull request and deploys on merge to main."
date: "2026-07-21"
tags: ["GitHub Actions", "DevOps", "CI/CD", "Automation"]
category: "DevOps"
readTime: "10 min read"
featured: false
---

You have Dockerized applications, a production `compose.yaml`, and a Linux server ready to run them. But you're still deploying manually:

```bash
ssh prod
git pull
docker compose up -d --build
```

This works until you forget to pull, or pull at the wrong time, or deploy broken code because you didn't run the tests. **CI/CD automates this.**

GitHub Actions is the most accessible CI/CD platform because it's built into GitHub — no separate service to configure, no webhooks to set up, no billing surprises for public repositories.

---

## Core Concepts

GitHub Actions has four building blocks:

```
Workflow → A single automation process (defined in a YAML file)
  └── Job → A set of steps that run on the same runner
       └── Step → A single task (run a command or use an action)
            └── Action → A reusable unit of code (like a function)
```

### Workflow

A YAML file in `.github/workflows/` that defines when automation runs and what it does. Each repository can have multiple workflows.

### Jobs

A workflow contains one or more jobs. Jobs run in parallel by default. You can make them run sequentially with `needs`.

### Steps

Each job contains steps. Steps run in order within a job. If one step fails, the remaining steps are skipped.

### Actions

Reusable building blocks from the GitHub Marketplace or the `actions/` namespace. Common ones:

- `actions/checkout@v4` — Pulls your repository code
- `actions/setup-node@v4` — Installs Node.js
- `docker/login-action@v3` — Logs into a container registry

---

## Your First Workflow: Test on Every PR

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run typecheck

      - name: Run tests
        run: npm test
```

### What Happens

1. **Trigger**: Any push to `main` or pull request targeting `main`
2. **Runner**: GitHub provisions an Ubuntu VM
3. **Checkout**: Pulls your code onto the VM
4. **Setup Node**: Installs Node 22, caches `node_modules`
5. **Install**: Runs `npm ci` (fast, deterministic)
6. **Lint**: Fails if there are lint errors
7. **Typecheck**: Fails if TypeScript doesn't compile
8. **Test**: Runs your test suite

If any step fails, the job fails. The PR shows a red ❌ status. You can't merge until it's green.

---

## The Trigger Matrix

The `on:` block defines when your workflow runs:

```yaml
on:
  # Run on push to specific branches
  push:
    branches: [main, develop]

  # Run on pull requests
  pull_request:
    branches: [main]

  # Run on a schedule (cron syntax)
  schedule:
    - cron: "0 6 * * 1"  # Every Monday at 6 AM UTC

  # Run manually from the GitHub UI
  workflow_dispatch:

  # Run when another workflow completes
  workflow_run:
    workflows: ["Build"]
    types: [completed]
```

### Common Trigger Patterns

| Scenario | Trigger |
|----------|---------|
| Test every PR | `pull_request: { branches: [main] }` |
| Deploy on merge | `push: { branches: [main] }` |
| Nightly builds | `schedule: [{ cron: "0 2 * * *" }]` |
| Manual deploy | `workflow_dispatch:` |
| Tagged releases | `push: { tags: ["v*"] }` |

---

## Multiple Jobs: Test, Build, Deploy

Real workflows have multiple jobs. Here's a pipeline that tests, builds, and deploys:

```yaml
name: CI/CD

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
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
    needs: [test]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: dist/

  deploy:
    needs: [build]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to server
        run: |
          echo "Deploying to production..."
          # SSH commands go here
```

The `needs:` keyword creates job dependencies:

```
test ──> build ──> deploy
```

If `test` fails, `build` and `deploy` never run. If the event is a PR (not a push to main), the `if` condition skips `build` and `deploy`.

---

## Matrix Builds: Test Multiple Versions

Run the same job across multiple environments:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

This creates 3 parallel jobs, one for each Node version. All three must pass for the workflow to succeed.

---

## Secrets

Never hardcode credentials in your workflow file. Use GitHub secrets:

```yaml
steps:
  - name: Deploy to server
    env:
      SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
      SERVER_HOST: ${{ secrets.SERVER_HOST }}
    run: |
      echo "$SSH_PRIVATE_KEY" > ssh_key
      chmod 600 ssh_key
      ssh -i ssh_key deploy@$SERVER_HOST "docker compose pull && docker compose up -d"
```

Set secrets in your repository: **Settings → Secrets and variables → Actions → New repository secret**.

Common secrets you'll need:

| Secret | Purpose |
|--------|---------|
| `SSH_PRIVATE_KEY` | SSH into your server |
| `SERVER_HOST` | Server IP or domain |
| `DOCKER_USERNAME` | Docker Hub / GHCR login |
| `DOCKER_PASSWORD` | Docker Hub / GHCR token |

---

## Conditional Steps

Control which steps run based on context:

```yaml
# Run only on push to main
if: github.ref == 'refs/heads/main'

# Run only on pull requests
if: github.event_name == 'pull_request'

# Run only on specific file changes
on:
  push:
    paths:
      - "api/**"
      - "compose.yaml"
      - "Dockerfile"

# Skip if PR is a draft
if: github.event.pull_request.draft == false

# Run only for specific event types
on:
  pull_request:
    types: [opened, synchronize, reopened]
```

---

## Caching Dependencies

Without caching, every workflow run downloads all dependencies from scratch. With caching, `npm ci` takes seconds instead of minutes.

The `setup-node` action handles npm caching automatically:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: "npm"
```

For other package managers:

```yaml
# Python (pip)
- uses: actions/setup-python@v5
  with:
    cache: "pip"

# Go
- uses: actions/setup-go@v5
  with:
    cache: true

# Generic cache
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

---

## Status Badges

Add a badge to your `README.md` that shows the workflow status:

```markdown
![CI](https://github.com/your-username/your-repo/actions/workflows/ci.yml/badge.svg)
```

This shows:

```
[CI ✅ Passing]  or  [CI ❌ Failing]
```

---

## Workflow File Structure

Reference for your `.github/workflows/` directory:

```
your-repo/
├── .github/
│   └── workflows/
│       ├── ci.yml           # Tests on every PR
│       ├── deploy.yml       # Deploy on merge to main
│       └── nightly.yml      # Scheduled maintenance tasks
├── src/
├── compose.yaml
└── Dockerfile
```

Each file is independent. You can have as many workflows as you need.

---

## Putting It All Together

Here's a complete CI workflow for a TypeScript project:

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20, 22]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - run: npm ci

      - run: npm run lint
        continue-on-error: true

      - run: npm run typecheck

      - run: npm test -- --coverage

      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: coverage-${{ matrix.node-version }}
          path: coverage/
```

What this does:

- Runs on every PR and push to main
- Tests on Node 20 and 22 in parallel
- `npm ci` is cached — runs in ~3 seconds on repeat runs
- Lint errors are informational (`continue-on-error: true`)
- Typechecking errors fail the build
- Test failures fail the build
- Coverage reports are saved as artifacts

---

## What's Next?

Running tests in CI is great, but the real power is automated Docker builds and deployments.

The next article connects everything: build a Docker image in CI, push it to GitHub Container Registry, and deploy it to your production server on every merge to main.

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
| **7. GitHub Actions From Zero — Build Your First Pipeline** | ← You are here |
| 8. Docker + GitHub Actions — Build, Push & Deploy Automatically | Coming soon |
