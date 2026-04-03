---
title: Semantic Search
description: Natural language search over 208K+ embedded documents
---

## Endpoint

```
POST /api/v1/knowledge/search
```

## Usage

Semantic search uses 3072-dimensional Gemini embeddings with cosine similarity. Use full sentences — it understands meaning, not just keywords.

```bash
curl -X POST -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  "https://api.marc27.com/api/v1/knowledge/search" \
  -d '{"query": "materials that resist creep at high temperature for turbine applications", "limit": 5}'
```

## Response

```json
[
  {
    "doc_id": "Ni-based Superalloy",
    "content": "Topic: Ni-based Superalloy. Type: TOP",
    "similarity": 0.752,
    "metadata": {
      "entity_type": "TOP",
      "source": "embed-graph"
    }
  }
]
```

## When to Use

| Use Case | Method |
|----------|--------|
| Exact entity name | Graph Search (`?q=Inconel+718`) |
| Natural language question | **Semantic Search** |
| Multi-concept exploration | [Research Mode](/docs/knowledge/research-mode) |
| Specific property lookup | Property Search |

## Embedding

Store your own text in the vector database:

```bash
curl -X POST -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  "https://api.marc27.com/api/v1/knowledge/embed" \
  -d '{"doc_id": "my-paper-1", "content": "Abstract text here..."}'
```
