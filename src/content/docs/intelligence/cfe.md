---
title: CFE Kernel
description: Compatibility Field Estimation — interpretable scoring engine for knowledge search
---

CFE (Compatibility Field Estimation) is an interpretable, domain-agnostic scoring engine that generates calibrated probability scores for compatibility between entities. It powers the relevance ranking behind knowledge search results.

## How It Works

```
Raw features x → Soft Compatibility Functions → c ∈ [0,1]
                         ↓
            Attention-Weighted Scoring (with Interaction Matrix A)
                         ↓
                    Score S ∈ (0,1)
```

Unlike black-box neural networks, every CFE parameter is interpretable:
- **340 parameters** for the materials science schema (d=17 features)
- **O(d^2) inference** — fast enough for real-time ranking
- **Calibrated probabilities** — output S is a valid probability by construction

## Three Compatibility Functions

Each feature maps raw values to a compatibility score c ∈ [0,1]:

| Function | Semantics | Example Features |
|----------|-----------|-----------------|
| **Sigmoid** | Threshold — "minimum required" | Material identity match, source authority |
| **Gaussian** | Ideal range — "closer is better" | Temperature distance, compositional overlap |
| **Affine** | Linear scaling | Recency, data completeness |

## Attention-Weighted Scoring

The final score combines all compatibility values using learned attention:

```
z_j = log(w_j) + Σ_k A_jk · c_k
α_j = softmax(z)_j
S = Σ_j α_j · c_j
```

The **interaction matrix A** enables cross-feature compensation:
- "If materials are similar, boost property match even if names don't match"
- "High authority suppresses age penalty"

## Integration

CFE runs as an internal service (`marc27-cfe`). The Knowledge Service calls it when ranking search results. Users never see CFE parameters — only opaque relevance scores.

```
POST /score   — Score a batch of feature vectors
POST /rank    — Score and return top-k ranked
POST /reload  — Hot-reload after retraining
```

## Status

- Kernel: verified (20 tests pass, 340 parameters, 17% loss reduction in 20 steps)
- Service wrapper: built (FastAPI + R2 model loading)
- Training pipeline: Phase 2 (synthetic queries + LLM-as-judge labels)
- Deployment: pending (needs trained models per corpus)
