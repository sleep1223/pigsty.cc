---
title: Modules
description: Pigsty's modular components at a glance
---

# Module Overview

Pigsty is modular — compose core + extension modules as needed.

## Core database modules

| Module           | Purpose                                                | Link                          |
| ---------------- | ------------------------------------------------------ | ----------------------------- |
| **PGSQL**        | PostgreSQL itself (bundles Patroni / pgBouncer / HAProxy) | [/docs/pgsql/](/docs/pgsql/) |
| **Patroni**      | HA supervisor                                          | [/docs/patroni/](/docs/patroni/) |
| **pgBouncer**    | Connection pool                                        | [/docs/pgbouncer/](/docs/pgbouncer/) |
| **pgBackRest**   | Backup / PITR                                          | [/docs/pgbackrest/](/docs/pgbackrest/) |
| **pg_exporter**  | Metric collection                                      | [/docs/pg_exporter/](/docs/pg_exporter/) |

## Infrastructure modules

| Module     | Purpose                                                  | Link                          |
| ---------- | -------------------------------------------------------- | ----------------------------- |
| **INFRA**  | Prometheus / Grafana / Loki / DNS / NTP                  | [/docs/infra/](/docs/infra/)  |
| **NODE**   | Host init / VIP / HAProxy                                | [/docs/node/](/docs/node/)    |
| **ETCD**   | Distributed config store / DCS                           | [/docs/etcd/](/docs/etcd/)    |
| **MINIO**  | S3-compatible object storage                             | [/docs/minio/](/docs/minio/)  |
| **DOCKER** | Container runtime                                        | [/docs/docker/](/docs/docker/) |

## Extension data-service modules

| Module      | Purpose                                       | Link                            |
| ----------- | --------------------------------------------- | ------------------------------- |
| **REDIS**   | KV / cache (master-replica / sentinel / cluster) | [/docs/redis/](/docs/redis/)  |
| **FERRET**  | MongoDB protocol on PostgreSQL                 | [/docs/ferret/](/docs/ferret/) |
| **JUICE**   | JuiceFS distributed filesystem                 | [/docs/juice/](/docs/juice/)   |

## Tooling modules

| Module       | Purpose                                                   | Link                            |
| ------------ | --------------------------------------------------------- | ------------------------------- |
| **pig**      | Pigsty package manager (Go CLI)                           | [/docs/pig/](/docs/pig/)        |
| **piglet**   | Lightweight runtime                                       | [/docs/piglet/](/docs/piglet/)  |
| **vibe**     | AI development sandbox (Code-Server / JupyterLab)         | [/docs/vibe/](/docs/vibe/)      |
| **pilot**    | Experimental modules                                      | [/docs/pilot/](/docs/pilot/)    |

## Application templates

[28+ application templates](/docs/app/) cover common data-intensive apps — Compose up and go.
