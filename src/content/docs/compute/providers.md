---
title: GPU Providers
description: RunPod, Lambda, AWS, and PRISM nodes
---

## Available GPUs

| GPU | Provider | Price/hr |
|-----|----------|----------|
| RTX-4090 (24GB) | RunPod | $0.44 |
| A100-80GB | RunPod | $1.10 |
| A100-80GB | Lambda | $1.10 |
| H100-80GB | Lambda | $2.49 |
| H100-80GB | RunPod | $3.29 |

## Endpoint

```
GET /api/v1/compute/gpus
GET /api/v1/compute/providers
```

## PRISM Nodes (BYOC)

Bring your own compute. Run `prism node up` on any machine with a GPU:

```bash
prism node up --gpu a100
```

Your node registers with the platform and accepts jobs. You set the price, platform takes a margin.
