---
title: "Linux Survival Guide for Developers Coming from macOS"
description: "The essential Linux commands, package management, permissions, and system administration every macOS developer needs to deploy and run Dockerized applications on a Linux server."
date: "2026-07-21"
tags: ["Linux", "DevOps", "Server", "Infrastructure"]
category: "DevOps"
readTime: "11 min read"
featured: false
---

Every Docker container runs on Linux. Every cloud server runs on Linux. Every CI/CD pipeline runs on Linux.

If you're coming from macOS, the Linux terminal feels familiar but different. `brew` doesn't work. Files are in different places. Permissions are a real thing you have to care about. And Docker needs special configuration to work correctly.

This article covers exactly what you need to deploy and manage Dockerized applications on a Linux server. No desktop Linux, no distro-hopping — just the commands and concepts that matter for production.

---

## Package Management: `apt` vs `brew`

On macOS, you install software with Homebrew:

```bash
brew install nginx
brew update
brew upgrade
```

On Ubuntu or Debian (the most common server Linux), you use `apt`:

```bash
# Update package lists (run this first, always)
sudo apt update

# Install a package
sudo apt install -y nginx

# Upgrade all packages
sudo apt upgrade -y

# Remove a package
sudo apt remove nginx

# Search for a package
apt search nginx
```

### Key Differences

| | Homebrew | apt |
|---|---|---|
| **Install** | `brew install <pkg>` | `sudo apt install -y <pkg>` |
| **Update** | `brew update` | `sudo apt update` |
| **Upgrade** | `brew upgrade` | `sudo apt upgrade -y` |
| **Remove** | `brew uninstall` | `sudo apt remove` |
| **Search** | `brew search` | `apt search` |
| **Info** | `brew info` | `apt show` |
| **List installed** | `brew list` | `apt list --installed` |

### Why `sudo`?

macOS doesn't require `sudo` for Homebrew because it installs to `/usr/local` (owned by your user). Linux installs system packages to `/usr` (owned by root). You need `sudo` to write there.

### One-Time Server Setup

```bash
# First thing on a fresh server
sudo apt update && sudo apt upgrade -y

# Install essentials
sudo apt install -y \
  curl \
  wget \
  git \
  htop \
  ufw \
  fail2ban \
  nginx \
  certbot \
  python3-pip
```

---

## The `sudo` Command

`sudo` runs a command as root. On macOS you use it occasionally. On Linux you use it constantly.

```bash
# Run a single command as root
sudo apt update

# Open a root shell (be careful)
sudo -i

# Run a command as a different user
sudo -u postgres psql

# Edit a system file
sudo nano /etc/nginx/nginx.conf
```

### Adding Your User to `sudo`

On a fresh server, your user may not have sudo access. The initial setup is usually done as the `root` user:

```bash
# Logged in as root
adduser deploy
usermod -aG sudo deploy

# Now log out and log back in as deploy
```

### Running Commands Without Password

If you're tired of typing your password for every `sudo` command:

```bash
sudo visudo -f /etc/sudoers.d/deploy
```

Add this line:

```
deploy ALL=(ALL) NOPASSWD: ALL
```

Save and exit. Now `sudo` commands run without prompting.

---

## Environment Variables on Linux

On macOS, you set environment variables in `~/.zshrc` or `~/.bash_profile`. On Linux, the convention is different.

### System-Wide Variables

```bash
# /etc/environment — loaded by all processes
# Add variables in KEY=VALUE format, one per line
DB_HOST=localhost
DB_PORT=5432
```

### User-Level Variables

```bash
# ~/.bashrc — loaded for interactive shells (SSH sessions)
# ~/.profile — loaded for login shells

export DATABASE_URL="postgres://user:pass@localhost:5432/myapp"
export NODE_ENV="production"
```

### Application Variables

For Dockerized applications, environment variables go in `.env` files, not in shell config files:

```bash
# .env (next to compose.yaml)
DB_PASSWORD=supersecret
API_KEY=abc123
```

The golden rule: **never store secrets in shell config files.** Use `.env` with `docker compose` or a secrets manager.

---

## Docker Permissions and Groups

This is the most common issue macOS developers face on Linux.

### The Problem

On macOS, Docker Desktop runs as your user. Everything works out of the box. On Linux, Docker runs as root. If you try:

```bash
docker ps
# Got permission denied while trying to connect to the Docker daemon socket
```

### The Fix

Add your user to the `docker` group:

```bash
sudo usermod -aG docker $USER

# Log out and log back in (or run:)
newgrp docker
```

Now `docker` commands work without `sudo`.

### Security Note

Adding a user to the `docker` group gives them root-equivalent access. Anyone in the `docker` group can:

```bash
# Run a container that mounts the host filesystem as root
docker run -v /:/host -it alpine sh

# Now they have full root access to the host
```

Only add users you trust completely to the `docker` group. For production servers, consider using `sudo` for Docker commands instead.

---

## Essential Linux Commands

### File System

```bash
# List files (like ls -la in terminal)
ls -la

# Print working directory
pwd

# Change directory
cd /var/log

# Create directory
mkdir -p /app/data/logs

# Copy files
cp source.txt dest.txt
cp -r source-dir dest-dir

# Move/rename
mv old.txt new.txt

# Remove
rm file.txt
rm -rf directory     # Force remove directory and contents

# View file contents
cat file.txt
less file.txt         # Scroll with arrow keys, q to quit
tail -f file.txt      # Follow log output
```

### File Permissions

```bash
# View permissions
ls -la
# drwxr-xr-x  2 deploy deploy  4096 Jul 21 10:00 app

# Change ownership
sudo chown deploy:deploy /app

# Change permissions
chmod 755 script.sh   # rwxr-xr-x (executable)
chmod 644 config.yml  # rw-r--r-- (readable)

# Make a script executable
chmod +x deploy.sh
```

### Processes

```bash
# List running processes
ps aux

# Show process tree
top             # Interactive process viewer
htop            # Better top (install with apt)

# Find a process by name
pgrep node      # Returns PID
ps aux | grep node

# Kill a process
kill 1234        # Graceful termination
kill -9 1234     # Force kill

# Run a process in the background
nohup node server.js > server.log 2>&1 &
```

### System Info

```bash
# Disk usage
df -h                 # Disk free
du -sh /app           # Directory size

# Memory
free -h               # RAM usage

# Network
ip addr               # Network interfaces
ss -tlnp              # Listening ports (like netstat)
curl -I https://example.com  # HTTP headers

# System logs
journalctl -u docker       # Docker service logs
journalctl -u nginx        # Nginx logs
journalctl -f              # Follow all logs
```

---

## SSH: Your Primary Interface

You'll spend most of your time on a Linux server through SSH.

```bash
# Connect to a server
ssh deploy@192.168.1.100

# Connect with a key (if key is in ~/.ssh)
ssh -i ~/.ssh/production-key deploy@192.168.1.100

# Copy files to a server
scp ./compose.yaml deploy@192.168.1.100:/app/

# Copy files from a server
scp deploy@192.168.1.100:/app/logs/app.log ./app.log

# SSH config (~/.ssh/config) — saves typing
Host prod
  HostName 192.168.1.100
  User deploy
  IdentityFile ~/.ssh/production-key

# Now just:
ssh prod
scp ./compose.yaml prod:/app/
```

---

## Firewall: UFW

A fresh Linux server has all ports open. UFW (Uncomplicated Firewall) fixes that:

```bash
# Allow SSH first (or you'll lock yourself out!)
sudo ufw allow 22

# Allow HTTP and HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Allow application port (if needed externally)
sudo ufw allow 3000

# Enable the firewall
sudo ufw enable

# Check status
sudo ufw status verbose
```

For Docker deployments, you usually only need port 80 and 443 open. Everything else runs behind the reverse proxy.

---

## File Locations: macOS vs Linux

| What | macOS | Linux (Ubuntu) |
|------|-------|----------------|
| Home directory | `/Users/you` | `/home/deploy` |
| Config files | `~/.zshrc` | `~/.bashrc` |
| Logs | `~/Library/Logs` | `/var/log` |
| Application data | `/usr/local/var` | `/var/lib` |
| System config | `/etc` | `/etc` |
| Temp files | `/tmp` | `/tmp` |
| Docker data | `~/Library/Containers/com.docker.docker` | `/var/lib/docker` |

---

## One Command to Docker Everything on a Fresh Server

Here's the complete server setup for a Docker deployment:

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Docker
curl -fsSL https://get.docker.com | sh

# 3. Install Docker Compose plugin
sudo apt install -y docker-compose-plugin

# 4. Add your user to docker group
sudo usermod -aG docker $USER

# 5. Log out and back in, then deploy
newgrp docker
git clone https://github.com/you/your-app.git
cd your-app
docker compose up -d
```

That's it. Six commands, and a containerized application is running in production on a Linux server.

---

## What's Next?

Your application is Dockerized and running on a Linux server. But deployment is still manual — you SSH in, pull the latest code, and rebuild. That works for personal projects but doesn't scale.

The next article automates this with GitHub Actions: test on every PR, build the Docker image, push it to a registry, and deploy on merge to main.

---

*This article is part of the **DevOps from Zero** series.*

| Article | Topic |
|---------|-------|
| 1. [What is Docker and Why Should You Care?](/blogs/what-is-docker) | |
| 2. [Writing Your First Dockerfile — The Right Way](/blogs/writing-your-first-dockerfile) | |
| 3. [Multi-Stage Docker Builds — Shrink Your Image from 900MB to 180MB](/blogs/multi-stage-docker-builds) | |
| 4. [Docker Compose — Stop Running 10 docker run Commands](/blogs/docker-compose-intro) | |
| 5. [Docker Compose for Production — depends_on, Healthchecks & Migration Patterns](/blogs/docker-compose-production) | |
| **6. Linux Survival Guide for Developers Coming from macOS** | ← You are here |
| 7. GitHub Actions From Zero — Build Your First Pipeline | Coming soon |
| 8. Docker + GitHub Actions — Build, Push & Deploy Automatically | Coming soon |
