---
title: Enterprise
description: On-premise deployment for classified environments
---

## For ArianeGroup, ESA, National Labs

MARC27 deploys behind your firewall. The Docker Compose includes everything:

- **Runtime**: PDF extraction, MACE-MH-1, CHGNet, Quantum Espresso
- **Neo4j**: Same schema as MARC27 cloud
- **pgvector**: 3072-dim Gemini-compatible embeddings
- **Redpanda**: Kafka-compatible event streaming for PRISM mesh
- **MinIO**: S3-compatible storage (replaces R2)

## Data Classification

Policy enforcement supports:

- `public` — open access
- `internal` — org-only
- `confidential` — same-org required
- `itar` — approved organizations only (ArianeGroup, ESA, NASA, DLR)

## E2EE Between Nodes

PRISM nodes use x25519 key exchange + ChaCha20-Poly1305 for encrypted data transfer. Keys exchanged via:

```
POST /api/v1/nodes/{id}/exchange-key
```

## Contact

For enterprise deployment support: research@marc27.com
