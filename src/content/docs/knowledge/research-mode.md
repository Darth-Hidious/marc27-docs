---
title: Research Mode (RLM)
description: AI agent that recursively explores the knowledge graph and synthesizes cited answers
---

The RLM Research Engine is an AI agent that autonomously explores the knowledge graph, searches academic databases, ingests papers, and synthesizes a cited answer.

## Endpoint

```
POST /api/v1/knowledge/research/query
```

Returns a **Server-Sent Events (SSE)** stream of steps.

## Usage

```bash
curl -N -X POST -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  "https://api.marc27.com/api/v1/knowledge/research/query" \
  -d '{"question": "What materials resist erosion in rocket nozzles?", "depth": 1}'
```

## Depth Pricing

| Depth | Cost | What it does |
|-------|------|-------------|
| 0 | **Free** | Local graph + vector search only |
| 1 | $0.01 | + Web search (Semantic Scholar, arXiv, PubMed) |
| 2 | $0.05 | + Deep search, follows new entities |
| 3 | $0.10 | + Cross-referencing and validation |

## Tools Available to the Agent

| Tool | What it does |
|------|-------------|
| `graph_search` | Fulltext search on entity names |
| `get_neighbors` | 1-hop graph traversal |
| `vector_search` | Semantic similarity search |
| `property_search` | Find materials by property (e.g., yield strength) |
| `web_search` | Semantic Scholar + arXiv + PubMed (depth >= 1) |
| `ingest_paper` | Extract entities from a paper into the graph (depth >= 1) |
| `compute_run` | Submit DFT/ML job (MACE, QE, LAMMPS) |
| `synthesize` | Generate final answer with citations |

## SSE Event Format

```
data: {"step": "reasoning", "data": {"turn": 0, "text": "I'll start with vector search..."}}
data: {"step": "tool_call", "data": {"tool": "vector_search", "query": "nozzle erosion"}}
data: {"step": "tool_result", "data": {"count": 5, "tool": "vector_search"}}
data: {"step": "answer", "data": {"text": "Based on the analysis..."}}
data: {"step": "complete", "data": {"metrics": {"graph_queries": 5, "cost_usd": 0.01}}}
```

## Via PRISM CLI

```bash
prism query --platform --semantic "What materials resist nozzle erosion?"
```
