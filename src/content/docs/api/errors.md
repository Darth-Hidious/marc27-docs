---
title: Error Handling
description: Error responses, status codes, and self-correction
---

## Error Format

Every error includes context for agents to self-correct:

```json
{
  "error": {
    "code": "validation_error",
    "message": "missing required field: model"
  },
  "help": {
    "api_guide": "GET /api/v1/agent/capabilities",
    "graphql": "POST /api/v1/graphql",
    "auth": "Use X-API-Key header or Authorization: Bearer"
  }
}
```

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | Deleted (no content) |
| 400 | Bad request |
| 401 | Unauthorized — check your API key |
| 403 | Forbidden — insufficient permissions |
| 404 | Not found — check the endpoint path |
| 422 | Validation error — check request body format |
| 429 | Rate limited — too many requests |
| 500 | Internal error — contact support |
| 502 | Bad gateway — upstream service unavailable |
