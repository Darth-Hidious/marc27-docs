---
title: GraphQL API
description: 20 queries and 6 mutations — the primary interface for MARC27
---

GraphQL is the preferred way to interact with MARC27. One endpoint, one request, get exactly what you need.

```
POST https://api.marc27.com/api/v1/graphql
Authorization: Bearer <token>  OR  X-API-Key: m27_xxx
Content-Type: application/json
```

## Queries

### Knowledge Graph

```graphql
# Search entities by name
{ search(term: "nickel", limit: 5) { name entityType label props } }

# Get entity with neighbors
{ entity(name: "Titanium") {
    name entityType props
    neighbors(limit: 5) { target { name entityType } relType count }
  }
}

# Find paths between entities
{ paths(from: "Nickel", to: "Creep Resistance", maxHops: 3) }

# Graph statistics
{ graphStats { nodes edges entityTypes } }

# Embedding count
{ embeddingStats { count } }
```

### Semantic Search

```graphql
# Search paper content (real text, not entity labels)
{ semanticSearch(query: "thermal barrier coating oxidation", limit: 3) {
    docId content similarity corpusId
  }
}
```

### LLM Models

```graphql
{ llmModels(provider: "anthropic", limit: 5) {
    modelId displayName inputPrice outputPrice contextWindow
  }
}
```

### Deployments

```graphql
{ deployments(status: "running", limit: 5) {
    id name status target gpuType costUsd endpointUrl
  }
}
```

### Discourse

```graphql
{ discourseSpecs(limit: 5) { id slug name version visibility } }
```

### Compute

```graphql
{ computeGpus { gpuType provider pricePerHourUsd vramGb } }
```

### Nodes

```graphql
{ nodes(limit: 5) { id name status visibility lastSeen pricePerHour } }
```

### Platform

```graphql
{ me { id displayName avatarUrl } }
{ marketplace(limit: 10) { name slug resourceType author contentMarkdown } }
{ resource(slug: "mace-mp-0") { name description contentMarkdown } }
{ corpora { name slug kind entryCount } }
```

## Mutations

```graphql
# Deploy a model
mutation { createDeployment(name: "mace", image: "marc27/mace:latest", gpuType: "A100-80GB") {
    id name status
  }
}

# Stop a deployment
mutation { stopDeployment(id: "...") }

# Create a discourse workflow
mutation { createDiscourseSpec(slug: "my-debate", yaml: "name: ...") {
    id slug version
  }
}

# Submit a compute job
mutation { submitComputeJob(input: { image: "marc27/lammps", inputs: "{}", gpuType: "A100-80GB" }) {
    id status
  }
}

# Cancel a compute job
mutation { cancelComputeJob(id: "...") }

# Submit an ingest job
mutation { submitIngestJob(input: { corpusId: "...", sourceUrl: "..." }) {
    id status
  }
}
```

## Error Handling

Invalid queries return structured errors with location info:

```json
{
  "errors": [{
    "message": "Unknown field \"x\" on type \"QueryRoot\".",
    "locations": [{"line": 1, "column": 3}]
  }]
}
```
