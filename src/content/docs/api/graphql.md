---
title: GraphQL
description: Query multiple services in a single request
---

## Endpoint

```
POST /api/v1/graphql
```

## Example

```bash
curl -X POST -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  "https://api.marc27.com/api/v1/graphql" \
  -d '{"query": "{ graphStats { nodes edges entityTypes } embeddingStats { count } }"}'
```

## Response

```json
{
  "data": {
    "graphStats": {
      "nodes": 211491,
      "edges": 6520581,
      "entityTypes": 15
    },
    "embeddingStats": {
      "count": 208133
    }
  }
}
```
