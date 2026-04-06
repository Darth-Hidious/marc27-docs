---
title: Knowledge Pipeline
description: How the ontology engine builds and expands the knowledge graph
---

The knowledge pipeline is MARC27's ontology engine. It transforms raw data (papers, datasets, ontologies) into a structured knowledge graph with semantic search. This is the core product — customers can build their own ontologies on their own infrastructure.

## Architecture

```
Input sources (R2, HF, URLs, local files)
  ↓
Text extraction (PyMuPDF for PDFs, direct read for text)
  ↓
Chunking (~4K chars, respecting page boundaries)
  ↓
Embedding (Gemini text-embedding-004 or local BGE-M3)
  → stored in pgvector with corpus_id, doc_id, metadata
  ↓
Entity extraction (LLM: GLM-4.5-Air free, or any model)
  → entities + relationships stored in Neo4j
  ↓
Knowledge graph ready for search
```

## Data Sources

### Current Graph

| Source | Nodes | Edges | Description |
|--------|-------|-------|-------------|
| **MatKG** | 69,618 | 5.38M | Curated from 5M materials science papers (MatScholar) |
| **Materials Project** | 210K+ | merged | Crystal structures with typed properties |
| **NASA Propulsion** | — | — | 444 papers, text embedded in pgvector |

### Entity Types

| Code | Label | Examples |
|------|-------|---------|
| CHM | Chemical | Nickel, Silicon Carbide, Ti-6Al-4V |
| MAT | Material | With typed properties: band_gap, density, crystal_system |
| PRO | Property | Creep Resistance, Tensile Strength, Band Gap |
| CMT | Characterization Method | XRD, SEM, DFT |
| APL | Application | Turbine Blade, Heat Shield |
| PHS | Phase | Austenite, Martensite |
| DSC | Descriptor | Nanostructured, Amorphous |

## How Ontologies Are Built

### 1. Backbone Import (batch)

Pre-curated datasets imported directly into Neo4j:

```bash
# MatKG — curated graph from 5M papers
POST /graph/seed
  {"nodes_url": "<presigned R2 URL>", "edges_url": "<presigned R2 URL>"}

# Materials Project — structured properties
POST /graph/ingest
  {"entities": [{"name": "Si", "entity_type": "MAT", "properties": {"band_gap": 1.12}}]}
```

### 2. Paper Ingestion (batch or on-the-fly)

```bash
prism ingest ./papers/ --corpus my-project
```

For each file:
1. **Extract text**: PyMuPDF for PDFs (free, local)
2. **Chunk**: ~4K chars per chunk, page boundaries preserved
3. **Embed**: Gemini text-embedding-004 (cheap) or BGE-M3 (local, free)
4. **Extract entities**: Free LLM (GLM-4.5-Air) identifies chemicals, materials, properties
5. **Store**: entities → Neo4j, embeddings → pgvector

### 3. On-the-fly (RLM Research)

During a research query, the LLM can call:

```python
# In REPL: web search finds a paper
papers = web_search("ablative thermal protection", limit=5)

# Ingest it permanently into the knowledge graph
result = ingest_paper("https://arxiv.org/pdf/2401.12345")
# → downloads, extracts, embeds, returns {chunks: 15, pages: 8}

# Now search finds it
docs = vector_search("ablative heat shield PICA")
# → returns the paper content we just ingested
```

Every research query can expand the graph. The flywheel: more queries → more papers → richer graph → better answers.

## Tenant Isolation

Every entity and embedding is scoped by `tenant`:
- `public` — shared knowledge (MatKG, Materials Project)
- `org:{org_id}` — organization-private (e.g., ITER's data)
- `user:{user_id}` — user-private

Queries are filtered by tenant. A user sees: their private data + their org's data + public data.

## Corpus System

Each data source is a corpus with a UUID:
- `00000000-0000-4000-c000-000000000001` — default/public
- `00000000-0000-4000-c000-000000000002` — NASA propulsion
- Custom UUIDs for customer corpora

Embeddings carry `corpus_id` for filtering. Searches can be corpus-scoped.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/graph/search` | GET | Search entities by name |
| `/graph/entity/{name}` | GET | Get entity neighbors |
| `/graph/stats` | GET | Node/edge/type counts |
| `/graph/ingest` | POST | Add entities + relationships |
| `/graph/seed` | POST | Bulk import from CSV URLs |
| `/search` | POST | Semantic vector search |
| `/embed` | POST | Embed single document |
| `/embed/bulk` | POST | Embed batch of documents |
| `/research/query` | POST | RLM research (SSE stream) |
| `/ingest` | POST | Full pipeline: extract + embed + graph |

## For Enterprise Customers

1. `prism node up` — starts the runtime on their infrastructure
2. Upload data to their node's local storage
3. `prism ingest ./data/ --corpus my-project` — builds their ontology
4. Data never leaves their network (air-gapped mode uses BGE-M3 locally)
5. Their Neo4j + pgvector are theirs — full export available
