---
title: Use Cases
description: Typical scenarios where Pigsty fits — self-hosted RDS, AI vector search, data platform, compliance, dev sandbox
---

# Use Cases

Pigsty is built around PostgreSQL, but it's far more than a "database installer". The categories below help you decide quickly: **is Pigsty right for me?**

## 🏢 Scenario 1 — Self-hosted open-source RDS

**Pain**: managed RDS is expensive, versions lag, extensions are restricted, data residency is constrained.

**With Pigsty**:
- Deploy a production HA cluster on ≥3 nodes in your own IDC / hybrid cloud / VPC
- Automatic failover via Patroni + etcd; HAProxy handles read/write routing
- pgBackRest provides PITR; pair with MinIO for off-site cold backup
- Grafana dashboards and Prometheus alerts out of the box

**Further reading**: [Deployment guide](/docs/deploy/) → [Architecture planning](/docs/deploy/planning) → [Three-node HA template](/docs/conf/)

---

## 🤖 Scenario 2 — AI / vector retrieval backend

**Pain**: LLM apps need vector search, semantic cache and memory storage — adding Milvus / Chroma increases operational burden.

**With Pigsty**:
- Ships with `pgvector`, `pgvectorscale`, `pg_search`, `pg_trgm` etc. — one engine handles vector + full-text + JSON search
- The [VIBE module](/docs/vibe/) offers a Code-Server / JupyterLab / Claude Code sandbox for AI development
- [FERRET](/docs/ferret/) gives PostgreSQL a MongoDB-compatible wire protocol for LangChain / LlamaIndex integration

**Further reading**: [PGSQL extensions](/docs/ref/) → [VIBE module](/docs/vibe/)

---

## 🧪 Scenario 3 — Local development / data sandbox

**Pain**: developers want to reproduce a production-like PostgreSQL environment locally with the full monitoring stack and rich extensions.

**With Pigsty**:
- One command brings up Pigsty on a 1C/2G Linux VM or WSL — PostgreSQL, Grafana, Prometheus included
- Vagrant / Terraform templates provision multi-node sandboxes in minutes
- 40+ configuration templates (meta, rich, fat, slim, infra, vibe) ready to reuse

**Further reading**: [Single-node install](/docs/setup/) → [Sandbox](/docs/deploy/sandbox) → [Config templates](/docs/conf/)

---

## 📊 Scenario 4 — Multi-model data platform

**Pain**: the business needs OLTP, time-series, geo, document, KV and object storage simultaneously — you don't want to introduce a separate cluster for each.

**With Pigsty**: use PostgreSQL as the core; one infrastructure handles:

| Data type         | Stack                                              |
| ----------------- | -------------------------------------------------- |
| OLTP              | PostgreSQL 17 + Patroni HA                         |
| OLAP              | Citus / DuckDB FDW / pg_mooncake                   |
| Time-series       | TimescaleDB                                        |
| Geo               | PostGIS                                            |
| Vector            | pgvector / pgvectorscale                           |
| Document          | [FerretDB](/docs/ferret/) (MongoDB protocol)       |
| KV / cache        | [Redis](/docs/redis/) cluster / sentinel / master–replica |
| Object storage    | [MinIO](/docs/minio/) single / multi-node          |
| Distributed FS    | [JuiceFS](/docs/juice/)                            |

**Further reading**: [Module overview](/docs/ref/module) → [Redis](/docs/redis/) → [MinIO](/docs/minio/)

---

## 🔒 Scenario 5 — Compliance / private / domestic stack

**Pain**: regulated customers (finance, government) require offline deployment, domestic OS, security grading and audit trails.

**With Pigsty**:
- Supports RockyLinux, AlmaLinux, openEuler, UOS, Kylin and more ([OS compatibility](/docs/ref/linux))
- Complete offline installer — delivery without public internet ([offline install](/docs/setup/))
- TLS, password policy, row-level security and audit logging on by default ([security hardening](/docs/concept/sec))
- AGPL 3.0 license; commercial subscription available

**Further reading**: [Offline install](/docs/setup/) → [Security hardening](/docs/concept/sec) → [OS compatibility](/docs/ref/linux)

---

## 🚀 Scenario 6 — SaaS / application templates

**Pain**: when shipping an application, you want "batteries-included" data layer instead of reinventing the wheel.

**With Pigsty**: [28+ application templates](/docs/app/) cover common data apps; one-command Docker Compose:

- **BI / dashboards**: Supabase, Metabase, Superset
- **Low-code / business**: Odoo, NocoDB, Directus
- **AI / LLM**: Dify, Langfuse, Mastra
- **Dev tools**: Gitea, Harbor, Keycloak

**Further reading**: [Application templates](/docs/app/) → [Docker module](/docs/docker/)

---

## When Pigsty is **not** a fit

To save you from stepping on mines, Pigsty is **not**:

- A managed cloud database SaaS — it runs on your machines; there is no hosted service
- A Kubernetes operator — Pigsty targets long-lived "pet" nodes, not ephemeral container scheduling
- A thin PostgreSQL install script — its value is in the full infrastructure, not just the database

If you want "PostgreSQL on K8s", look at [CloudNativePG](https://cloudnative-pg.io/) and similar projects.
