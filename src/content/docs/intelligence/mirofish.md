---
title: MiroFish Discourse
description: Multi-agent discourse engine with YAML workflow definitions
---

MiroFish is a multi-agent discourse system where AI agents debate, challenge claims, and reach consensus on research questions. Workflows are defined in YAML, version-controlled, and support A/B testing.

Inspired by the [MiroFish](https://github.com/666ghj/MiroFish) swarm intelligence engine, but built for MARC27 with RLM capabilities and knowledge graph integration.

## YAML Workflow Format

```yaml
name: alloy-design-debate
version: 1.0.0
description: Multi-agent debate on nickel-based alloy properties

agents:
  - id: metallurgist
    role: "Materials scientist specializing in alloys"
    model: claude-sonnet          # any of 519 available models
    temperature: 0.7
    tools: [graph_search]         # enables RLM for this agent
  - id: theorist
    role: "DFT simulation expert"
    model: default
  - id: experimentalist
    role: "Physical testing expert"
    model: claude-haiku

discourse_tree:
  - round: 1
    type: open_discussion
    agents: [metallurgist, theorist, experimentalist]
    prompt: "What are the key properties of $params.alloy?"
  - round: 2
    type: claim_challenge
    agents: [theorist, experimentalist]
    base_claim: "$previous.metallurgist"
    challenge_mode: evidence_required
  - round: 3
    type: consensus
    agents: [metallurgist]
    threshold: 0.8
  - round: 4
    type: ab_test
    variants:
      - name: dft_approach
        prompt: "Analyze using DFT predictions"
        agents: [theorist]
      - name: experimental
        prompt: "Analyze using experimental data"
        agents: [experimentalist]
    winner_metric: claim_strength

parameters:
  - name: alloy
    description: "The alloy to discuss"
    required: true

gates:
  - round: 3
    metric: consensus_confidence
    op: greater_than
    threshold: 0.75
    on_fail: abort
```

## Round Types

| Type | Description |
|------|-------------|
| `open_discussion` | All agents respond to the prompt independently |
| `claim_challenge` | Agents challenge a previous claim with evidence |
| `consensus` | Synthesize agreement, rate confidence 0-1 |
| `ab_test` | Run two agent strategies in parallel, compare outcomes |
| `synthesis` | Final synthesis of all contributions |

## RLM-Powered Agents

Agents with `tools: [graph_search]` (or `vector_search`, `web_search`, `rlm`) get routed through the RLM research engine. They can query the knowledge graph during discourse — grounding their claims in real data.

## API

```
POST   /api/v1/discourse/specs              — Create YAML spec
GET    /api/v1/discourse/specs              — List specs
GET    /api/v1/discourse/specs/{id}         — Spec detail
POST   /api/v1/discourse/run/{spec_id}      — Run discourse (SSE)
GET    /api/v1/discourse/{instance_id}       — Instance status
GET    /api/v1/discourse/{instance_id}/turns — All agent turns
```

## Versioning

Specs are auto-versioned per slug. Creating a spec with slug `alloy-debate` generates v1. Updating it generates v2. Each version is immutable — execution pins to a specific version.

## SSE Events

| Event | Description |
|-------|-------------|
| `started` | Instance ID, spec name, total rounds |
| `round_started` | Round number, type, participating agents |
| `agent_turn` | Agent ID, content, turn number |
| `round_complete` | Round result with all turns |
| `gate_check` | Metric, value, passed/failed |
| `complete` | Total turns, cost |

## PRISM CLI

```bash
prism discourse create workflow.yaml
prism discourse list
prism discourse run <spec-id> --params alloy="Inconel 718"
prism discourse status <instance-id>
prism discourse turns <instance-id>
```
