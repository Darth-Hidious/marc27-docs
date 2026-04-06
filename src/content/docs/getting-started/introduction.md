---
title: Introduction
description: MARC27 — Infrastructure for materials science research and discovery
---

MARC27 is a platform for materials science research. It connects a curated knowledge graph, 519 LLM models, multi-agent discourse, compute brokerage, and a research engine into one system.

## What You Get

- **Knowledge Graph** — 69,000+ entities and 5.3M+ relationships curated from 5 million scientific papers, plus 9,000+ paper content embeddings for semantic search
- **Research Engine (RLM)** — Ask questions, get answers grounded in real graph data. The LLM writes code to explore the graph iteratively — no hallucination
- **519 LLM Models** — Anthropic, OpenAI, Google, and OpenRouter. Bring your own keys or use platform keys
- **Multi-Agent Discourse (MiroFish)** — Define agent debates in YAML. Agents challenge claims, reach consensus, run A/B tests
- **Compute** — Deploy models from HuggingFace to GPUs (RunPod, AWS, Lambda). Budget caps and auto-stop
- **PRISM Nodes** — Run compute on your own hardware. E2E encrypted data transfer between nodes

## Architecture

```
Layer 4: Spark     — Project orchestration (months, phase gates)
Layer 3: MiroFish  — Multi-agent discourse (YAML workflows)
Layer 2: RLM       — Research engine (iterative REPL)
Layer 1: CFE       — Scoring kernel (relevance ranking)
```

Everything routes through a single API gateway at `api.marc27.com`. GraphQL is the primary interface — 20 queries and 6 mutations covering every service.

## For Enterprise

- **Tenant isolation** — your data never mixes with others
- **On-premises** — run the full stack on your infrastructure with `prism node up`
- **E2E encryption** — X25519 + AES-256-GCM between nodes
- **Platform identity** — every user gets `username@id.marc27.com` as a verifiable signature

## Getting Started

1. [Quick Start](/getting-started/quickstart) — install PRISM and run your first query
2. [Authentication](/getting-started/auth) — API keys, device flow, JWT
3. [API Reference](/api/endpoints) — REST and GraphQL endpoints
