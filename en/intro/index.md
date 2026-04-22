---
title: Introduction
description: Meet Pigsty — the batteries-included PostgreSQL distribution
---

# Meet Pigsty

**Pigsty** (**P**ostgres **I**n **G**reat **STY**le) is an **open-source, free, local-first** PostgreSQL distribution positioned as an **alternative to managed RDS**.

It packages PostgreSQL itself, high availability, monitoring, backups, connection pooling and an enormous extension ecosystem into infrastructure that runs entirely on your own machines.

## What it solves

- **Avoid cloud lock-in** — self-host RDS; data and capability stay yours
- **Unlock the PostgreSQL ecosystem** — 340+ preinstalled extensions covering OLTP, time-series, geo, vector, full-text
- **Production-grade reliability** — automatic failover, PITR, monitoring and alerts ready out of the box
- **Private / offline / compliance** — runs on domestic OS distributions, fully air-gapped installs supported

## Technology overview

| Capability      | Default component                           |
| --------------- | ------------------------------------------- |
| Database engine | PostgreSQL 17 + 340+ extensions             |
| HA              | Patroni + etcd                              |
| Pooling         | pgBouncer                                   |
| Load balancing  | HAProxy + VIP                               |
| Backup / PITR   | pgBackRest + MinIO                          |
| Monitoring      | Prometheus + Grafana + VictoriaMetrics      |
| Logs            | Loki                                        |
| Config mgmt     | Ansible (IaC)                               |

## Next

- Read on: [Features](/en/intro/features), [Scenarios](/en/intro/scenarios), [Comparison](/en/intro/compare)
- Jump in: [Getting Started → Install](/en/guide/install)
