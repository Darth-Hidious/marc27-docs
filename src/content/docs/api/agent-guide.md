---
title: Agent Guide
description: How AI agents connect to MARC27
---

## One Endpoint

```bash
curl https://api.marc27.com/api/v1/agent/capabilities
```

Returns a full map of all services, endpoints, auth methods, and examples. An agent reads this once and knows everything.

## Auth for Agents

```bash
export MARC27_API_KEY=m27_your_key_here
```

That's it. Every API call uses this key. No OAuth, no token refresh, no login.

## Via PRISM CLI

```bash
prism agent  # prints all available commands
prism query --platform --semantic "your question" --json  # search
prism query --platform "Inconel 718" | grep MAT  # grep-friendly
```

## Smart 404

If an agent calls the wrong endpoint, the API suggests the right one:

```json
{
  "error": {"code": "not_found", "message": "GET /api/v1/knowlege/serch is not valid"},
  "hint": "Did you mean: GET /api/v1/knowledge/graph/search?",
  "suggestions": [...]
}
```
