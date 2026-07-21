---
title: "What is Docker and Why Should You Care?"
description: "A beginner-friendly introduction to Docker covering containers vs VMs, images, layers, Docker Hub, and the core concepts you need before writing your first Dockerfile."
date: "2026-07-21"
tags: ["Docker", "DevOps", "Containers", "Infrastructure"]
category: "DevOps"
readTime: "10 min read"
featured: true
---

If you've been in software development for any length of time, you've almost certainly heard someone say:

> *"It works on my machine."*

This single phrase has caused more production incidents, delayed more deployments, and frustrated more developers than almost anything else in software engineering. Docker exists to eliminate it entirely.

In this article, we'll cover what Docker is, why it matters, and the core concepts you need to understand before writing your first `Dockerfile`.

---

## The Problem Docker Solves

Imagine you build a Node.js API on your MacBook. It works perfectly. You push the code to your teammate — they're on Windows, running a different version of Node.js. It crashes.

You deploy to a Linux production server. Different OS, different environment, different behavior. It crashes again.

The root cause is always the same: **your application is tightly coupled to the environment it runs in.** Different machines have different:

- Operating systems
- Runtime versions (Node 18 vs Node 22)
- System libraries and dependencies
- Environment variables and configuration

Docker solves this by bundling your application **together with everything it needs to run** into a single portable unit called a **container**. That container runs identically on your Mac, your teammate's Windows machine, and your Linux production server.

---

## What Exactly is Docker?

Docker is a platform for building, shipping, and running applications in containers.

Think of a container like a **shipping container** in the real world. The content is always sealed, standardized, and behaves the same way regardless of which ship, truck, or port handles it. The shipping industry was transformed by this standardization — Docker did the same for software.

---

## Core Concepts

### Images

A **Docker image** is a blueprint for a container. It contains everything needed to run your application:

- A base operating system (usually a minimal Linux distribution)
- Your runtime (Node.js, Python, Go, etc.)
- Your application's dependencies
- Your compiled application code

If you're familiar with object-oriented programming, the analogy maps perfectly:

```
Image     →  Class / Blueprint
Container →  Instance / Object
```

One image can produce many containers. Each container is an isolated, running instance of that image.

### Containers

A **container** is a running instance of an image. It is:

- **Isolated** — has its own filesystem, network, and processes
- **Lightweight** — shares the host OS kernel (unlike a full virtual machine)
- **Ephemeral** — can be started, stopped, and destroyed in seconds

Unlike a virtual machine which boots a full operating system (taking minutes), a container starts in milliseconds because it shares the host kernel and only runs what your application needs.

```
Virtual Machine                     Container
┌──────────────────────┐            ┌──────────────────────┐
│  Your App            │            │  Your App            │
│  Dependencies        │            │  Dependencies        │
│  Full Guest OS       │            │  Container Runtime   │
│  Hypervisor          │            │  Host OS Kernel      │
│  Host Hardware       │            │  Host Hardware       │
└──────────────────────┘            └──────────────────────┘
   ~GBs, boots in minutes              ~MBs, starts in seconds
```

### Docker Hub

**Docker Hub** is the public registry where Docker images are stored and shared. Think of it as the npm registry, but for Docker images.

When you need a database, you don't build a PostgreSQL image from scratch. You pull the official one:

```bash
docker pull postgres:16-alpine
```

Docker first checks your local image cache. If the image isn't there, it downloads it from Docker Hub.

---

## Image Layers — How Docker Stays Fast

Every Docker image is composed of **layers**. Each layer represents one instruction in the Dockerfile:

```
Layer 1  →  Base OS (Alpine Linux ~5MB)
Layer 2  →  Install Node.js runtime
Layer 3  →  Install npm dependencies
Layer 4  →  Copy application code
```

This layered architecture is what makes Docker efficient. Docker **caches every layer**. When you rebuild an image after changing your application code:

```
Layer 1  →  ✅ Cached (base OS unchanged)
Layer 2  →  ✅ Cached (Node.js unchanged)
Layer 3  →  ✅ Cached (dependencies unchanged)
Layer 4  →  ❌ Rebuilt (code changed)
```

Only the changed layer and everything below it gets rebuilt. This makes iterative builds extremely fast.

> **Key principle:** Order your Dockerfile instructions from least-frequently-changed to most-frequently-changed to maximize cache hits.

---

## A Critical Concept: `localhost` Inside a Container

This is one of the most common sources of confusion when starting with Docker, so it's worth addressing early.

When your application runs inside a container and refers to `localhost`, it does **not** mean your host machine. It means the container itself.

```
Your Mac (host)
└── Container A (backend)
    └── localhost → Container A itself, not your Mac
└── Container B (database)
    └── localhost → Container B itself, not your Mac
```

This means if your backend container tries to connect to a database at `localhost:5432`, it will fail — because there is no database running inside the backend container.

For containers to communicate with each other, they need to be on the same **Docker network** and reference each other by **container name**, not `localhost`. We'll cover this in depth in the Docker Compose article.

---

## EXPOSE: Documentation, Not Configuration

This is another point that trips up many beginners.

The `EXPOSE` instruction in a Dockerfile does **not** actually open any ports or make your application accessible from outside the container. It is purely documentation — a hint to other developers about which port the application listens on.

```dockerfile
EXPOSE 3000   # This does NOT open port 3000
```

To actually make a port accessible from your host machine, you use the `-p` flag when running the container:

```bash
docker run -p 3000:3000 my-app
#              ↑       ↑
#         host port   container port
```

The format is always `host:container`. This maps port `3000` on your machine to port `3000` inside the container.

---

## Essential Docker Commands

Here are the commands you'll use every day:

### Working with Images

```bash
# Pull an image from Docker Hub
docker pull node:22-alpine

# List all local images
docker images

# Remove an image
docker rmi my-image:latest

# Remove all unused images
docker image prune -a
```

### Working with Containers

```bash
# Run a container in the background
docker run -d --name my-api -p 3000:3000 my-image

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# View container logs
docker logs my-api

# Follow logs in real-time
docker logs -f my-api

# Open a terminal inside a running container
docker exec -it my-api sh

# Stop a container gracefully
docker stop my-api

# Remove a container
docker rm my-api
```

### Understanding the `-d`, `-it`, and `--rm` Flags

| Flag | Meaning | Use When |
|------|---------|----------|
| `-d` | Detached (background) | Running services |
| `-it` | Interactive terminal | Debugging, exploring |
| `--rm` | Auto-remove on exit | One-off commands |
| `--name` | Custom container name | Always — easier to reference |

---

## Alpine: Why Image Size Matters

When you see images tagged with `-alpine`, they use **Alpine Linux** — a minimal Linux distribution that is only ~5MB in size compared to Ubuntu's ~80MB.

```
node:22          →  ~900MB  (full Debian + Node.js)
node:22-alpine   →  ~130MB  (tiny Alpine + Node.js)
```

Why does image size matter?

- **Faster CI/CD pipelines** — smaller images pull and push faster
- **Lower storage costs** — especially relevant in cloud environments
- **Reduced attack surface** — fewer packages means fewer potential vulnerabilities
- **Faster container startup** — less to load

Unless you specifically need packages that Alpine doesn't include, always prefer the `-alpine` or `-slim` variants for production images.

---

## Putting It All Together

Here's the mental model to carry forward:

```
Docker Hub (registry)
     ↓ docker pull
Local Image Cache
     ↓ docker run
Running Container
     ↓ your app is running, isolated, reproducible
```

An image is pulled once and cached. Containers are created from images and can be started, stopped, and destroyed without affecting the image. Multiple containers can run from the same image simultaneously.

---

## What's Next?

Now that you understand what Docker is and the core concepts behind it, the next step is writing your first `Dockerfile` — the recipe that tells Docker exactly how to build your image.

In the next article, we'll write a production-ready `Dockerfile` for a Node.js/Express API, understand every instruction, and learn the layer caching optimization that makes rebuilds 10x faster.

---

*This article is part of the **DevOps from Zero** series — a hands-on journey from Docker fundamentals to Kubernetes and cloud platforms.*

| Article | Topic |
|---------|-------|
| **1. What is Docker and Why Should You Care?** | ← You are here |
| 2. Writing Your First Dockerfile — The Right Way | Coming soon |
| 3. Multi-Stage Docker Builds — Shrink Your Image from 900MB to 180MB | Coming soon |
| 4. Docker Compose — Stop Running 10 `docker run` Commands | Coming soon |
| 5. Docker Compose for Production | Coming soon |
| 6. Linux Survival Guide for Developers Coming from macOS | Coming soon |
| 7. GitHub Actions From Zero — Build Your First Pipeline | Coming soon |
| 8. Docker + GitHub Actions — Build, Push & Deploy Automatically | Coming soon |
