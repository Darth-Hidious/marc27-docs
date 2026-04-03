---
title: LLM Service
description: 11 models from 5 providers — BYOK or use platform keys
---

## Available Models

| Model | Provider | Input $/M | Output $/M | Context |
|-------|----------|-----------|------------|---------|
| Claude Haiku 4.5 | Anthropic | $0.80 | $4.00 | 200K |
| Claude Sonnet 4 | Anthropic | $3.00 | $15.00 | 200K |
| Claude Opus 4 | Anthropic | $15.00 | $75.00 | 200K |
| GPT-4o | OpenAI | $2.50 | $10.00 | 128K |
| GPT-4o Mini | OpenAI | $0.15 | $0.60 | 128K |
| O3 Mini | OpenAI | $1.10 | $4.40 | 200K |
| Gemini 2.5 Pro | Google | $1.25 | $10.00 | 1049K |
| DeepSeek V3 | OpenRouter | $0.14 | $0.28 | 64K |
| GLM-4.5 Air | OpenRouter | **Free** | **Free** | 128K |
| Mistral Large | Mistral | $2.00 | $6.00 | 128K |
| Qwen 2.5 72B | OpenRouter | $0.35 | $0.40 | 131K |

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
