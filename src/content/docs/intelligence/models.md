---
title: LLM Model Discovery
description: 519 models auto-discovered from 4 providers
---

MARC27 auto-discovers LLM models from all configured providers on startup. Currently **519 models** across 4 providers.

## Providers

| Provider | Models | Auth |
|----------|--------|------|
| Anthropic | Claude 4.5, Claude Haiku 4.5, etc. | Platform API key |
| OpenAI | GPT-4o, GPT-4o-mini, o1, o3, etc. | Platform API key |
| Google | Gemini 2.5 Pro/Flash, Gemini 3.x, etc. | Platform API key |
| OpenRouter | 400+ models from all providers | Platform API key |

## API

```
GET /api/v1/projects/{project_id}/llm/models
```

**Response:**
```json
[
  {
    "model_id": "claude-haiku-4-5-20251001",
    "display_name": "Claude Haiku 4.5",
    "provider": "anthropic",
    "tier": "free",
    "context_window": 200000,
    "input_price": 0.8,
    "output_price": 4.0,
    "status": "active"
  }
]
```

## BYOK (Bring Your Own Key)

Users can add their own API keys per provider to use models not covered by the platform's keys:

```
POST /api/v1/projects/{project_id}/llm-keys
```

```json
{
  "provider": "anthropic",
  "api_key": "sk-ant-...",
  "name": "My Anthropic Key"
}
```

## Using Models

All models are available through the unified LLM endpoint:

```
POST /api/v1/projects/{project_id}/llm/stream
```

```json
{
  "model": "claude-sonnet-4-20250514",
  "messages": [
    {"role": "user", "content": "Explain creep resistance"}
  ],
  "temperature": 0.7,
  "max_tokens": 4000
}
```

The platform routes to the correct provider automatically. BYOK keys are used when available, otherwise the platform's shared keys.

## Default Model

Research and discourse systems use `INGEST_DEFAULT_MODEL` env var. Currently set to the most cost-effective option for the use case.
