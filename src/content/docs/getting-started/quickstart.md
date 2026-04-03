---
title: Quick Start
description: Get running with MARC27 in 2 minutes
---

## Option 1: PRISM CLI (recommended)

```bash
# Install
pip install prism-platform

# Login
prism login

# Search the knowledge graph
prism query --platform --semantic "creep resistant superalloy" --json

# Run a research query
prism query --platform --semantic "what materials resist nozzle erosion"
```

## Option 2: Python SDK

```bash
pip install marc27
```

```python
from marc27 import PlatformClient

client = PlatformClient(api_key="m27_your_key_here")

# Search
results = client.knowledge.search("thermal barrier coating")

# LLM completion
response = client.llm.complete(
    model="claude-sonnet-4-20250514",
    messages=[{"role": "user", "content": "Explain creep in Ni-based superalloys"}]
)
```

## Option 3: Direct API

```bash
# No SDK needed — just curl
export MARC27_API_KEY=m27_your_key_here

# Search the knowledge graph
curl -H "X-API-Key: $MARC27_API_KEY" \
  "https://api.marc27.com/api/v1/knowledge/graph/search?q=titanium&limit=5"

# Semantic search
curl -X POST -H "X-API-Key: $MARC27_API_KEY" \
  -H "Content-Type: application/json" \
  "https://api.marc27.com/api/v1/knowledge/search" \
  -d '{"query": "high temperature creep resistant superalloy", "limit": 5}'
```

## For AI Agents

```bash
# One env var — that's it
export MARC27_API_KEY=m27_your_key_here

# Read the full API map
curl https://api.marc27.com/api/v1/agent/capabilities

# Or use PRISM
prism agent  # prints all commands
```
