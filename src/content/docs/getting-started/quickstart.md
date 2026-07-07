---
title: Quick Start
description: Get running with MARC27 in 2 minutes
---

## 1. Install PRISM

```bash
curl -fsSL https://prism.marc27.com/install.sh | bash
```

This installs the `prism` CLI to `~/.prism/bin` (macOS and Linux). See
[Installation](/prism/install) for version pinning and details.

## 2. Authenticate

```bash
prism login
# Opens browser → enter the code → done
```

Or set an API key directly:

```bash
export MARC27_API_KEY=m27_your_key_here
```

## 3. Search the Knowledge Graph

```bash
prism research "Find materials with high creep resistance" --depth 0
```

`--depth 0` searches the local graph only (free). Higher depths enable web search (costs LLM calls).

## 4. Try GraphQL

```bash
curl -X POST https://api.marc27.com/api/v1/graphql \
  -H "X-API-Key: m27_your_key" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ search(term: \"titanium\", limit: 5) { name entityType label } }"}'
```

Response:

```json
{
  "data": {
    "search": [
      {"name": "Titanium", "entityType": "CHM", "label": "Chemical"},
      {"name": "α-Titanium", "entityType": "CHM", "label": "Chemical"},
      {"name": "β-Titanium", "entityType": "CHM", "label": "Chemical"}
    ]
  }
}
```

## 5. Explore Entity Relationships

```bash
curl -X POST https://api.marc27.com/api/v1/graphql \
  -H "X-API-Key: m27_your_key" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ entity(name: \"Nickel\") { name neighbors(limit: 3) { target { name entityType } relType count } } }"}'
```

This returns Nickel's neighbors — what it co-occurs with across 5 million papers:

```json
{
  "data": {
    "entity": {
      "name": "Nickel",
      "neighbors": [
        {"target": {"name": "Ni", "entityType": "CHM"}, "relType": "CHM-CHM", "count": 14664},
        {"target": {"name": "SEM", "entityType": "CMT"}, "relType": "CHM-CMT", "count": 6972},
        {"target": {"name": "Catalyst", "entityType": "APL"}, "relType": "CHM-APL", "count": 6571}
      ]
    }
  }
}
```

## Next Steps

- [GraphQL Reference](/api/graphql) — all 20 queries and 6 mutations
- [Research Mode](/knowledge/research-mode) — how the RLM engine works
- [Model Deployments](/compute/deployments) — deploy models from HuggingFace
