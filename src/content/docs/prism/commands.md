---
title: Commands
description: PRISM CLI command reference
---

## Knowledge

```bash
prism query --platform "titanium alloy"                    # graph search
prism query --platform --semantic "creep resistant"         # semantic search
prism query --platform --json "Inconel" | grep MAT         # JSON + grep
```

## Compute

```bash
prism run <image> --backend local                          # run locally
prism run <image> --backend marc27                         # run on cloud GPU
prism job-status <job-id>                                  # check status
```

## Node

```bash
prism node up                                              # register as compute node
prism node status                                          # show capabilities
prism node down                                            # deregister
```

## Workflows

```bash
prism workflow list                                        # list available
prism workflow run <name> --set key=value                  # execute
```

## Support

```bash
prism report "bug description" --log-file error.log        # file a bug report
```

## Info

```bash
prism status                                               # auth, config, endpoints
prism agent                                                # command guide for AI agents
prism --version                                            # version
```
