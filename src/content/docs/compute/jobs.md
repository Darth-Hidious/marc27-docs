---
title: Submitting Jobs
description: Submit, monitor, and cancel compute jobs
---

## Submit

```bash
curl -X POST -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  "https://api.marc27.com/api/v1/compute/submit" \
  -d '{
    "image": "my-model",
    "gpu_type": "A100-80GB",
    "inputs": {"param1": "value1"},
    "budget_max_usd": 10.0,
    "timeout_seconds": 3600
  }'
```

## Check Status

```bash
curl -H "X-API-Key: $KEY" \
  "https://api.marc27.com/api/v1/compute/{job_id}"
```

## Cancel

```bash
curl -X POST -H "X-API-Key: $KEY" \
  "https://api.marc27.com/api/v1/compute/{job_id}/cancel"
```

## Cost Estimate

Check cost before submitting:

```bash
curl -X POST -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  "https://api.marc27.com/api/v1/compute/estimate" \
  -d '{"image": "mace-mh-1", "gpu_type": "A100-80GB", "inputs": {}}'
```
