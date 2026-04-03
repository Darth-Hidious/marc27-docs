---
title: Agent Interface
description: How AI agents use PRISM — bash + grep, not protocols
---

## Philosophy

Agents connect via CLI commands + grep. No MCP, no gRPC, no protocol overhead. An agent has bash. PRISM is already authenticated. Just shell out.

## Setup

```bash
export MARC27_API_KEY=m27_your_key_here
```

## Commands

```bash
# Search
prism query --platform --semantic "your question" --json

# Grep for materials only
prism query --platform "fatigue" | grep MAT

# Pipe to Python
prism query --platform --json "Ti-6Al-4V" | python3 -c "..."

# Get the full guide
prism agent
```

## Output Formats

- **Default**: human-readable, one result per line (grep-friendly)
- **--json**: JSON array (pipe to jq/python)
- **--platform**: route through MARC27 API (211K nodes, 6.5M edges)
