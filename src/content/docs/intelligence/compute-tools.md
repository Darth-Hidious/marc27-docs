---
title: Compute Tools
description: DFT, MD, and ML as tool calls — MACE, Quantum Espresso, LAMMPS, CHGNet
---

## Available Compute Images

| Image | What it does | GPU needed |
|-------|-------------|-----------|
| `mace-mh-1` | Universal potential — 89 elements, 7 DFT heads (OMAT, OMOL, OC20) | Optional |
| `mace-mp-0` | Materials Project potential — energy, forces, stress | Optional |
| `chgnet` | Crystal Hamiltonian GNN — energies, forces, magmoms | Optional |
| `quantum-espresso` | Ab initio DFT (SCF, relax, bands, DOS) | Recommended |
| `lammps` | Classical MD (EAM, Tersoff, ReaxFF, SNAP) | Optional |

## MACE-MH-1 Heads

| Head | Level of Theory | Use Case |
|------|----------------|----------|
| `omat_pbe` | PBE/PBE+U | General inorganic materials (default) |
| `omol` | ωB97M-VV10 | Organic molecules |
| `oc20` | — | Surface chemistry |
| `spice` | — | Biomolecular |
| `matpes` | r2SCAN | High-accuracy solids |

## Submit a Job

```bash
curl -X POST -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  "https://api.marc27.com/api/v1/compute/submit" \
  -d '{
    "image": "mace-mh-1",
    "gpu_type": "A100-80GB",
    "inputs": {
      "atoms": {"symbols": ["Si","Si"], "positions": [[0,0,0],[1.36,1.36,1.36]], "cell": [[2.72,0,0],[0,2.72,0],[0,0,2.72]]},
      "task": "energy",
      "head": "omat_pbe"
    },
    "budget_max_usd": 5.0
  }'
```

## Safety

- $50 per-job global cap (configurable via `COMPUTE_MAX_JOB_USD`)
- Per-job user budget via `budget_max_usd`
- AWS instances auto-terminate after timeout
