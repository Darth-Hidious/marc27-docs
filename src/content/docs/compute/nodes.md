---
title: PRISM Nodes
description: Register and manage compute nodes
---

## Register a Node (REST)

```bash
curl -X POST -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  "https://api.marc27.com/api/v1/nodes/register" \
  -d '{"name": "my-gpu-node", "capabilities": {"compute": true}}'
```

## WebSocket Connection

For real-time job dispatch:

```
WS wss://api.marc27.com/api/v1/nodes/connect?token=<jwt>
```

## E2EE Key Exchange

Exchange public keys for encrypted data transfer between nodes:

```bash
curl -X POST -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  "https://api.marc27.com/api/v1/nodes/{node_id}/exchange-key" \
  -d '{"public_key": "base64-x25519-public-key"}'
```

## Via PRISM CLI

```bash
prism node up          # register and connect
prism node status      # show capabilities
prism node down        # deregister
```
