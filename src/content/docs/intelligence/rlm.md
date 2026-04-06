---
title: RLM Research Engine
description: Recursive Language Model research engine — REPL-based exploration of the knowledge graph
---

The RLM (Recursive Language Model) research engine lets you ask questions about materials science and get answers grounded in real knowledge graph data. Based on [arxiv:2512.24601v2](https://arxiv.org/abs/2512.24601v2) by Zhang, Kraska, and Khattab.

## How It Works

Unlike traditional RAG (retrieve then generate), RLM uses a **REPL loop**:

1. Your question goes to an LLM
2. The LLM writes Python code to explore the knowledge graph
3. The code executes on the runtime with injected tools
4. Real results come back as stdout
5. The LLM sees the data and writes more code or calls `FINAL(answer)`

**Key difference:** The LLM iterates. It writes one code block, observes the output, adapts its strategy, and repeats until it has enough data to answer.

## API

```
POST /api/v1/knowledge/research/query
```

**Request:**
```json
{
  "query": "Find materials containing nickel",
  "depth": 0
}
```

**Depth controls cost:**
- `depth: 0` — free, uses local knowledge graph only
- `depth: 1+` — costs money, enables web search (Semantic Scholar, arXiv, PubMed)

**Response:** Server-Sent Events (SSE) stream:

| Event | Description |
|-------|-------------|
| `started` | Session ID, mode, max_depth |
| `reasoning` | LLM's thought process + code blocks |
| `repl_exec` | Code block being executed |
| `repl_result` | stdout/stderr from execution |
| `answer` | Final answer (from `FINAL()` call) |
| `complete` | Metrics: cost, graph_queries, llm_calls |

## Available Tools in REPL

```python
# Search entities by name (substring match)
results = graph_search("nickel", limit=10)
# → [{"name": "Nickel Carbonyl", "entity_type": "CHM", ...}, ...]

# Get connected entities (1-hop traversal)
neighbors = get_neighbors("Ti-6Al-4V", limit=15)
# → {"nodes": [...], "edges": [...]}

# Semantic similarity search
docs = vector_search("creep resistance of superalloys", limit=5)
# → [{"content": "...", "similarity": 0.87}, ...]

# Web search (depth >= 1 only)
papers = web_search("NASA thermal protection materials", limit=5)
# → [{"title": "...", "abstract": "...", "doi": "..."}, ...]

# Query a sub-LLM
answer = llm_query("Summarize: {data}")
# → string response

# Mark final answer
FINAL("Your answer here")
```

## PRISM CLI

```bash
prism research "Find materials containing nickel" --depth 0 --json
```

## Example Output

A query for "nickel compounds" returns real data from the knowledge graph:

```
Found 20 entities containing 'nickel'
  Nickel Carbonyl [CHM]
  Nickel Hexacyanoferrate [CHM]
  Nickel Phosphide [CHM]
  Nickel Sulfide [CHM]
  ...
```

The LLM then explores deeper — searching for Ni-prefix entities, getting neighbors, running semantic searches — building up a comprehensive answer from actual graph data. Zero hallucination.
