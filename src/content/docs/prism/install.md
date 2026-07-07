---
title: Installation
description: Install the PRISM CLI agent
---

## Install

```bash
curl -fsSL https://prism.marc27.com/install.sh | bash
```

This downloads the prebuilt PRISM binary to `~/.prism/bin` and adds that directory
to your `PATH` (via `~/.zshrc` or `~/.bashrc`). macOS (Apple Silicon and Intel) and
Linux are supported. Open a new terminal — or `source` your shell profile — afterward.

To pin a version or change the install location:

```bash
PRISM_VERSION=v0.1.0 PRISM_INSTALL_DIR=~/bin \
  curl -fsSL https://prism.marc27.com/install.sh | bash
```

## Login

```bash
prism login
```

Opens your browser for OAuth. Tokens are stored under `~/.prism/`.

## Verify

```bash
prism doctor      # diagnose local + platform health
prism --version
```

## For Agents (no login)

```bash
export MARC27_API_KEY=m27_your_key_here
prism query --platform --semantic "your question"
```
