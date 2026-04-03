---
title: Docker Compose
description: Self-contained deployment on your own infrastructure
---

## Quick Start

```bash
git clone https://github.com/Darth-Hidious/marc27-core.git
cd marc27-core
docker compose -f docker/docker-compose.enterprise.yml up -d
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| Runtime | 8090 | PDF extraction, model execution, embeddings |
| Neo4j | 7474, 7687 | Knowledge graph |
| pgvector | 5432 | Semantic search vectors |
| MinIO | 9000, 9001 | S3-compatible storage |
| Redpanda | 9092, 8082 | Kafka-compatible event streaming |

## Your Data Never Leaves

Everything runs on your infrastructure. No cloud dependency. No data egress.

## GPU Support

Uncomment the GPU section in the Docker Compose file:

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```
