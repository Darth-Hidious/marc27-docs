---
title: Knowledge Plane
description: 211K+ entities, 6.5M+ edges — the materials science knowledge graph
---

The Knowledge Plane is the core of MARC27. It stores structured materials science data in a Neo4j graph database with semantic search via pgvector embeddings.

## Current Stats

| Metric | Value |
|--------|-------|
| Graph nodes | 211,491 |
| Graph edges | 6,520,581 |
| Entity types | 15 |
| Embeddings | 208,133 (3072-dim Gemini) |
| Corpora | 44 (NASA, MatKG, QMOF, EuroPMC) |

## Entity Types

| Code | Type | Examples |
|------|------|---------|
| MAT | Material | Inconel 718, Ti-6Al-4V, Carbon-Carbon |
| PRO | Property | Yield Strength, Fatigue Life, Band Gap |
| ELM | Element | Titanium, Nickel, Aluminum |
| SMT | Synthesis Method | Additive Manufacturing, WAAM |
| CMT | Characterization | SEM, CALPHAD, FEA |
| APL | Application | Rocket Nozzle, Turbine Blade |
| PUB | Publication | DOI-identified papers |
| AUT | Author | NASA, research groups |
| TOP | Topic | Thermal Barrier Coating, Superalloy |

## Services

- **[Graph Search](/docs/knowledge/graph-search)** — fulltext search across entity names
- **[Semantic Search](/docs/knowledge/semantic-search)** — natural language vector search
- **[Research Mode](/docs/knowledge/research-mode)** — AI agent that explores the graph recursively
- **[Ingestion](/docs/knowledge/ingestion)** — add papers, datasets, entities to the graph
