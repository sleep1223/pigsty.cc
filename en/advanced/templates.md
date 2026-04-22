---
title: Config Templates
description: Pigsty ships 40+ ready-to-use configuration templates — pick one per scenario
---

# Config Templates

The `conf/` directory ships many ready-made templates — just `cp conf/<x>.yml pigsty.yml` and go.

## Single-node templates

| Template    | Resources   | Scenario                 |
| ----------- | ----------- | ------------------------ |
| `meta.yml`  | 1C / 2G     | Minimal sandbox          |
| `slim.yml`  | 1C / 2G     | PostgreSQL only, no monitoring |
| `rich.yml`  | 4C / 8G     | Single-node full feature |
| `fat.yml`   | 8C / 16G    | Single-node heavy load   |
| `infra.yml` | —           | INFRA components only    |
| `vibe.yml`  | —           | AI development sandbox   |

## HA templates

| Template   | Nodes      | Notes                          |
| ---------- | ---------- | ------------------------------ |
| `trio.yml` | 3          | Baseline HA                    |
| `dual.yml` | 2          | Primary + standby (no quorum)  |
| `full.yml` | 4+         | Full production                |
| `safe.yml` | Cross-DC   | Strong consistency / sync repl |
| `simu.yml` | Simulation | Failure drills                 |

## Kernel variants

| Template     | Kernel                |
| ------------ | --------------------- |
| `pgsql.yml`  | Native PostgreSQL     |
| `citus.yml`  | Citus distributed     |
| `mssql.yml`  | MSSQL compatibility   |
| `polar.yml`  | PolarDB               |
| `agens.yml`  | AgensGraph            |

## Application templates

`conf/app/` contains ready-to-run Compose files for common open-source apps:

- Supabase, Metabase, Superset
- Odoo, NocoDB, Directus
- Dify, Langfuse, Mastra
- Gitea, Harbor, Keycloak
- …

Full list: [/docs/app/](/docs/app/) and [/docs/conf/](/docs/conf/)

## How to choose

```text
How many hosts?
├── 1 → meta / rich / fat / slim
├── 2 → dual
├── 3 → trio  (recommended starting point)
└── 4+ → full / safe
```

Then decide whether to swap the kernel (citus / polar / mssql) or stack an application template (`app/*.yml`).
