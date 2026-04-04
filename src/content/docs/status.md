---
title: System Status
description: Live status of MARC27 services
---

## Service Status

Check live status at any time:

```bash
curl https://api.marc27.com/health/ready
```

Response when healthy:
```json
{"db": "ok", "status": "ready"}
```

## Services

| Service | URL | What it does |
|---------|-----|-------------|
| API Gateway | `api.marc27.com` | All 45 endpoints |
| Knowledge Service | Internal | Neo4j graph + pgvector |
| LLM Service | Internal | Auto-discovered models, streaming |
| Runtime | Internal | PDF extraction, models |

## Uptime

Services run on Railway with automatic restarts. The API processes requests within 50ms median latency for graph queries and 200ms for semantic search.

## Incident Reporting

Report issues via PRISM CLI:

```bash
prism report "description of the issue" --log-file error.log
```

Or file a support ticket via the dashboard at [platform.marc27.com/dashboard/support](https://platform.marc27.com/dashboard/support).
