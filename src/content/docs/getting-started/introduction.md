---
title: Introduction
description: MARC27 — Infrastructure for materials science research
---

MARC27 is a platform for materials science research. It provides a knowledge graph, LLM service, compute brokerage, and research engine that work together.

## Four Planes

| Plane | What it does |
|-------|-------------|
| **Knowledge** | 211K+ entities, 6.5M+ edges in a Neo4j graph. Semantic search over 208K embeddings. 44 corpora from NASA, MatKG, QMOF, EuroPMC. |
| **Intelligence** | 11 LLM models from 5 providers. MACE-MH-1, CHGNet, Quantum Espresso as compute tools. RLM Research Engine. |
| **Orchestration** | 45 API endpoints. Auth (JWT, API keys, OAuth). Workflows. Support tickets. Policy enforcement. |
| **Compute** | GPU brokerage across RunPod, Lambda, AWS. PRISM nodes for BYOC. $50 safety cap per job. |

## Quick Links

- [Quick Start](/docs/getting-started/quickstart) — get running in 2 minutes
- [API Reference](/docs/api/endpoints) — all 45 endpoints
- [PRISM CLI](/docs/prism/install) — command-line agent
- [Self-Hosting](/docs/self-hosting/docker) — Docker Compose for on-prem

## Who is this for?

Aerospace engineers, materials researchers, HPC users from institutions like ESA primes, national labs, and universities. If you work with materials data, simulations, or models — this is your infrastructure.
