---
title: LLM Service
description: Multiple providers, auto-discovered models, BYOK support
---

## Available Models

Models are **automatically discovered** from each provider's API weekly. The list below is a snapshot — use the API for the current catalog:

```bash
curl -H "X-API-Key: $KEY" \
  "https://api.marc27.com/api/v1/projects/00000000-0000-4000-c000-000000000001/llm/models"
```

## Providers

| Provider | Auth Style | Free Tier |
|----------|-----------|-----------|
| Anthropic | x-api-key | No |
| OpenAI | Bearer | No |
| Google | query key | No |
| Mistral | Bearer | No |
| OpenRouter | Bearer | GLM-4.5 Air ($0) |

Models are auto-discovered weekly from each provider's models API. New models from trusted providers are auto-approved — no admin intervention needed.

## Endpoint

```
POST /api/v1/projects/{project_id}/llm/stream
```

Returns SSE stream of tokens.

## Usage

```bash
curl -N -X POST -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  "https://api.marc27.com/api/v1/projects/00000000-0000-4000-c000-000000000001/llm/stream" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "messages": [{"role": "user", "content": "Explain creep in Ni-based superalloys"}],
    "temperature": 0.7,
    "max_tokens": 1024
  }'
```

## BYOK (Bring Your Own Key)

Add your own API keys for any provider. Your key, your quota — the platform only routes the request.
