---
title: Research Mode (RLM)
description: AI agent that recursively explores the knowledge graph and synthesizes cited answers
---

The RLM Research Engine is an AI agent that **recursively decomposes** complex research questions, explores the knowledge graph, searches academic databases, ingests papers, and synthesizes cited answers. Based on the Recursive Language Models paper ([arxiv:2512.24601v2](https://arxiv.org/abs/2512.24601)).

Unlike flat retrieval (RAG), the RLM agent decides what to query, inspects results, and can spawn independent sub-sessions for different aspects of a complex question. Each sub-session has its own tools and context. Results are synthesized bottom-up.

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
  -d '{"question": "What materials resist erosion in rocket nozzles?", "depth": 2}'
```

## Depth Pricing

| Depth | Cost | What it does |
|-------|------|-------------|
| 0 | **Free** | Local graph + vector search only |
| 1 | $0.01 | + Web search (Semantic Scholar, arXiv, PubMed, OpenAlex) + DOI lookup + URL crawling |
| 2 | $0.05 | + Recursive decomposition into sub-sessions |
| 3 | $0.10 | + Deep recursion (sub-sessions can spawn sub-sessions) |

## Tools Available to the Agent

| Tool | Depth | What it does |
|------|-------|-------------|
| `graph_search` | 0+ | Fulltext search on entity names |
| `get_neighbors` | 0+ | 1-hop graph traversal |
| `vector_search` | 0+ | Semantic similarity search |
| `property_search` | 0+ | Find materials by property (e.g., yield strength) |
| `compute_run` | 0+ | Submit DFT/ML job (MACE, QE, LAMMPS) |
| `web_search` | 1+ | Semantic Scholar + arXiv + PubMed + OpenAlex |
| `doi_lookup` | 1+ | CrossRef DOI resolution (metadata, references, funding) |
| `crawl_url` | 1+ | Crawl any URL and extract clean text |
| `ingest_paper` | 1+ | Extract entities from a paper into the graph permanently |
| `sub_query` | 2+ | Recursively decompose into independent sub-sessions |
| `synthesize` | all | Generate final answer with citations |

## Recursive Decomposition (depth 2+)

At depth 2 and above, the agent can break complex questions into independent sub-questions. Each sub-question runs as a separate research session with its own agent loop.

```
Question: "Compare Ti-6Al-4V and Inconel 718 for turbine blade applications"
  -> sub_query: ["Tensile and creep properties of Ti-6Al-4V at high temperature",
                  "Oxidation resistance of Inconel 718 above 800C"]
  -> Sub-session 1: searches graph, finds papers, ingests data on Ti-6Al-4V
  -> Sub-session 2: searches graph, web, ingests papers on Inconel 718
  -> Parent synthesizes both sub-answers into comparative analysis
```

## Flywheel

Every web search result that gets ingested becomes permanent knowledge. The first query about a topic costs money (web search + LLM extraction). Every subsequent query finds it locally for free. The more the system is used, the smarter and cheaper it gets.

## SSE Event Format

```
data: {"step": "reasoning", "data": {"turn": 0, "text": "I'll start with vector search..."}}
data: {"step": "tool_call", "data": {"tool": "vector_search", "query": "nozzle erosion"}}
data: {"step": "tool_result", "data": {"count": 5, "tool": "vector_search"}}
data: {"step": "decompose", "data": {"sub_queries": ["...", "..."], "reasoning": "..."}}
data: {"step": "sub_session_start", "data": {"sub_query": "...", "depth": 2}}
data: {"step": "sub_session_complete", "data": {"sub_query": "...", "answer": "..."}}
data: {"step": "answer", "data": {"text": "Based on the analysis..."}}
data: {"step": "complete", "data": {"metrics": {"graph_queries": 12, "cost_usd": 0.05}}}
```

## Via PRISM CLI

```bash
prism query --platform --semantic "What materials resist nozzle erosion?"
```
