---
title: Installation
description: Install the PRISM CLI agent
---

## Install

```bash
pip install prism-platform
```

## Login

```bash
prism login
```

Opens your browser for OAuth. Tokens stored at `~/.prism/credentials.json`.

## Verify

```bash
prism status
prism --version
```

## For Agents (no login)

```bash
export MARC27_API_KEY=m27_your_key_here
prism query --platform --semantic "your question"
```
