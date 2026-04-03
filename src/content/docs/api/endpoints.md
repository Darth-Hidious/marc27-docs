---
title: API Endpoints
description: All 45 endpoints across 15 services
---

## Base URL

```
https://api.marc27.com/api/v1
```

## Authentication

```
X-API-Key: m27_your_key_here
```

Or:

```
Authorization: Bearer <jwt>
```

## Discovery

Get the full API map (no auth required):

```bash
curl https://api.marc27.com/api/v1/agent/capabilities
```

## Services

| Service | Endpoints | Description |
|---------|-----------|-------------|
| Knowledge | 6 | Graph search, semantic search, embed, catalog |
| Research | 1 | RLM research engine (SSE stream) |
| LLM | 2 | Model listing, streaming completion |
| Compute | 6 | GPU listing, job submit/status/cancel, cost estimate |
| Nodes | 6 | Register, heartbeat, delete, key exchange, list |
| Workflows | 6 | Start, list, status, cancel, specs |
| Marketplace | 3 | List, search, publish resources |
| Support | 3 | Create, list, update tickets |
| Policy | 1 | Evaluate access control |
| Auth | 3 | Token exchange, refresh, device flow |
| Users | 2 | Profile, update |
| Projects | 2 | List, create |
| API Keys | 2 | List, create |
| Usage | 1 | Usage metrics |
| GraphQL | 1 | Query multiple services in one request |
