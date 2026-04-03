---
title: Ingestion
description: Add papers, datasets, and entities to the knowledge graph
---

## Embed Text

Store text with a vector embedding for semantic search:

```bash
curl -X POST -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  "https://api.marc27.com/api/v1/knowledge/embed" \
  -d '{"doc_id": "my-paper-1", "content": "Abstract of my paper..."}'
```

## Corpora Catalog

List all available corpora:

```bash
curl -H "X-API-Key: $KEY" \
  "https://api.marc27.com/api/v1/knowledge/catalog"
```

Currently 44 corpora including NASA propulsion, MatKG, QMOF, and EuroPMC data.

## Paper Ingestion via Research Engine

The RLM agent can ingest papers during research queries. At depth >= 1, it searches Semantic Scholar/arXiv/PubMed, downloads abstracts, extracts entities, and stores them permanently.

Every paper ingested adds to the knowledge graph — the system grows smarter with use.

## Via PRISM CLI

```bash
# Ingest a CSV/Parquet file
prism ingest data.csv

# Ingest a PDF
prism ingest paper.pdf
```
