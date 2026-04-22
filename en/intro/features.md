---
title: Features
description: Pigsty's core capabilities at a glance
---

# Features

## 🐘 Database engine

- **PostgreSQL 17** as the default major version; 13 / 14 / 15 / 16 also supported
- **340+ precompiled extensions** covering OLTP, OLAP, time-series, geo, vector, full-text, graph, audit
- Multiple kernels available: native PostgreSQL, Citus (distributed), PolarDB, Greenplum, MSSQL-compatibility mode

## 🔋 High availability

- **Patroni + etcd** — automatic failover, typically completed within seconds
- **HAProxy** — routes read/write traffic; read replicas join the pool automatically
- **L2 VIP / DNS** — multiple ways to expose the service address
- See [HA architecture](/en/advanced/ha)

## 💾 Backup & recovery

- **pgBackRest** — full / differential / incremental backups
- **PITR** — point-in-time recovery accurate to the transaction
- Cold backups to local disk, [MinIO](/docs/minio/) or any S3-compatible store
- See [backup guide](/en/guide/backup)

## 📊 Observability

- **Prometheus + VictoriaMetrics** — metrics collection
- **Grafana** — 30+ preconfigured dashboards
- **Loki** — log aggregation
- **pg_exporter** — exposes 600+ PostgreSQL metrics
- See [monitoring guide](/en/guide/monitor)

## 🧩 Modular architecture

Mix and match:

- [PGSQL](/docs/pgsql/) — PostgreSQL core
- [INFRA](/docs/infra/) — monitoring / DNS / NTP / package repository
- [NODE](/docs/node/) — host initialization, VIP, HAProxy
- [ETCD](/docs/etcd/) — DCS
- [MINIO](/docs/minio/) — S3-compatible object storage
- [REDIS](/docs/redis/) — standalone / sentinel / cluster
- [FERRET](/docs/ferret/) — MongoDB wire-protocol compatibility
- [DOCKER](/docs/docker/) — container runtime
- More: [JUICE](/docs/juice/), [VIBE](/docs/vibe/), [PILOT](/docs/pilot/)

## 🛡️ Security

- Self-signed certificate authority and TLS
- Enforced password complexity
- Row-level security and audit logging
- Least-privilege model
- See [security hardening](/en/advanced/security)

## ⚡ IaC and bulk operations

- A single declarative YAML file describes the whole infrastructure
- Ansible playbooks cover install, scale-out, switchover, backup, restore — the full lifecycle
- See [IaC concept](/docs/concept/iac)

## 🌐 Deployment coverage

- EL 7/8/9, Debian 12, Ubuntu 22/24, openEuler, Kylin, UOS, …
- Offline-capable
- Single-node to thousands of nodes
- On-prem, public cloud, hybrid, edge
