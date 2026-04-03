---
title: Graph Search
description: Fulltext search across 211K+ materials science entities
---

## Endpoint

```
GET /api/v1/knowledge/graph/search?q={term}&limit={n}
```

## Usage

Search uses Neo4j fulltext indexing. Handles multi-word queries, partial matches, and fuzzy matching.

```bash
# Single term
curl -H "X-API-Key: $KEY" \
  "https://api.marc27.com/api/v1/knowledge/graph/search?q=titanium&limit=5"

# Multi-word (finds entities matching ANY word)
curl -H "X-API-Key: $KEY" \
  "https://api.marc27.com/api/v1/knowledge/graph/search?q=rocket+nozzle+erosion&limit=5"
```

## Response

```json
[
  {
    "name": "Nozzle",
    "entity_type": "APL",
    "label": "Application",
    "tenant": "public"
  },
  {
    "name": "erosion",
    "entity_type": "PRO",
    "label": "Property",
    "tenant": "public"
  }
]
```

## Tips

- Use **short, specific terms** — "Inconel", "fatigue", "nozzle"
- For natural language questions, use [Semantic Search](/docs/knowledge/semantic-search) instead
- Use `entity_type` filter in the query to narrow results

## Entity Neighbors

Get connected entities (1-hop traversal):

```
GET /api/v1/knowledge/graph/entity/{name}
```

```bash
curl -H "X-API-Key: $KEY" \
  "https://api.marc27.com/api/v1/knowledge/graph/entity/Inconel%20718"
```
