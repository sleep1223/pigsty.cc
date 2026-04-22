---
title: Monitor
description: Grafana dashboards, Prometheus metrics, alerts and logs
---

# Monitor

Pigsty ships with a complete observability stack — it's all there once installed. Default endpoints in single-node mode:

| Component      | URL                             | Default account    |
| -------------- | ------------------------------- | ------------------ |
| Grafana        | `http://<IP>:3000`              | `admin / pigsty`   |
| Prometheus     | `http://<IP>:9090`              | —                  |
| AlertManager   | `http://<IP>:9093`              | —                  |
| Loki (logs)    | Embedded as a Grafana data source | —                |

---

## Grafana dashboards

Log in and go to **Home → Dashboards**, organised by prefix:

- **PGSQL** — Cluster / Instance / Database / Query / Session / Replication
- **PGCAT** — table / index / extension details via the system catalog
- **PGLOG** — slow-query log analysis
- **INFRA** — Prometheus, Grafana, Loki themselves
- **NODE** — CPU / memory / disk / network
- **REDIS / MINIO / ETCD** — dashboards for each module

Dashboards to start with:

- `PGSQL Overview` — whole-cluster health at a glance
- `PGSQL Cluster` — replica lag, TPS, connection count
- `PGSQL Instance` — deep per-instance metrics
- `PGSQL Query` — slow queries via `pg_stat_statements`
- `PGSQL Alert` — currently active alerts

---

## Metric sources

| Source               | Description                    |
| -------------------- | ------------------------------ |
| `pg_exporter`        | 600+ PostgreSQL metrics (custom queries included) |
| `node_exporter`      | Host metrics                   |
| `patroni`            | HA state                       |
| `haproxy`            | Routing / health / connections |
| `pgbouncer_exporter` | Pool metrics                   |

See [pg_exporter module](/docs/pg_exporter/).

---

## Alerts

Alert rules are preshipped in Prometheus, living at `/etc/prometheus/rules/*.yml` on each node.

Common default alerts:

- PostgreSQL primary unreachable
- Replication lag exceeds threshold
- Connection count nearing the limit
- Disk usage > 85%
- pgBouncer connection backlog

Wire them to webhooks / DingTalk / WeCom by editing the `receivers` section of `alertmanager.yml`.

---

## Logs

- **PostgreSQL logs** are shipped by `promtail` into Loki
- Grafana → Explore → pick the Loki data source → query `{cluster="pg-meta"}`
- Structured / slow-query analysis dashboard: `PGLOG Analysis`

---

## Going deeper

- INFRA module: [/docs/infra/](/docs/infra/)
- pg_exporter: [/docs/pg_exporter/](/docs/pg_exporter/)
- Monitoring concept: [/docs/concept/monitor](/docs/concept/monitor)
