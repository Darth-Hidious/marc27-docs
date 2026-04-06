---
title: Model Deployments
description: Deploy models as persistent inference services on any compute target
---

Deploy models from HuggingFace Hub, R2, or any URL as persistent services. The platform handles weight pulling, process management, health checking, and cost metering.

## Deployment Targets

| Target | Description | Cost |
|--------|-------------|------|
| `prism_node` | Your machine via `prism node up` | Free (your hardware) |
| `runpod` | RunPod cloud GPU | Per-hour GPU pricing |
| `lambda` | Lambda cloud GPU | Per-hour GPU pricing |

## Create a Deployment

```
POST /api/v1/compute/deployments
```

```json
{
  "name": "mace-mp-0",
  "image": "marc27/mace:latest",
  "target": "prism_node",
  "gpu_type": "A100-80GB",
  "deploy_config": {
    "port": 8080,
    "health_path": "/health"
  },
  "budget_max_usd": 50.0
}
```

Or deploy from a marketplace resource:

```json
{
  "name": "mace-prod",
  "resource_slug": "mace-mp-0",
  "target": "prism_node"
}
```

## Generic Model Deploy (Runtime)

The runtime has a universal model deployment endpoint that pulls weights from any source:

```
POST /deploy
```

```json
{
  "deployment_id": "my-model",
  "weights_source": "hf://sentence-transformers/paraphrase-MiniLM-L3-v2",
  "framework": "auto",
  "port": 9000,
  "gpu": false,
  "command": ["python", "serve.py", "--port", "9000"]
}
```

**Weight sources:**
- `hf://org/model` — HuggingFace Hub (supports `@revision`)
- `r2://path/to/weights` — R2/S3 object storage
- `https://url/to/model.bin` — Direct URL
- `/local/path` — Local filesystem

## Lifecycle

```
provisioning → pulling → starting → running → stopping → stopped
                                  ↘ unhealthy (3 consecutive failures)
                                  ↘ failed (crash/budget exceeded)
```

## Cost Metering

A background tick runs every 60 seconds:
1. Increments `cost_accrued_usd` for all running deployments
2. Deployments exceeding `budget_max_usd` are auto-stopped

## WebSocket Protocol (Nodes)

When a PRISM node receives a `DeployModel` message:

```json
{"type": "deploy_model", "deployment_id": "...", "image": "...", "env_vars": {...}, "deploy_config": {...}}
```

It should:
1. Pull the image/weights
2. Start the container with GPU passthrough
3. Send `DeploymentReady` with endpoint URL
4. Periodically send `DeploymentHealthUpdate`
5. Send `DeploymentStopped` on shutdown

## API Endpoints

```
POST   /api/v1/compute/deployments          — Create
GET    /api/v1/compute/deployments          — List (with ?status= filter)
GET    /api/v1/compute/deployments/{id}     — Detail
DELETE /api/v1/compute/deployments/{id}     — Stop
GET    /api/v1/compute/deployments/{id}/health — Force health check
```

## PRISM CLI

```bash
prism deploy create --name mace --image marc27/mace:latest --gpu A100-80GB
prism deploy create --name my-model --weights hf://org/model --target local
prism deploy list
prism deploy status <id>
prism deploy stop <id>
```
