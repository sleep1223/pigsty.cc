---
layout: home

hero:
  name: "Pigsty"
  text: "A batteries-included PostgreSQL distribution"
  tagline: Local-first · Open-source · Production-grade alternative to managed RDS
  image:
    src: /logo.svg
    alt: Pigsty
  actions:
    - theme: brand
      text: Quick Start
      link: /en/guide/install
    - theme: alt
      text: Use Cases
      link: /en/intro/scenarios
    - theme: alt
      text: GitHub
      link: https://github.com/pgsty/pigsty

features:
  - icon: 🐘
    title: PostgreSQL at the Core
    details: A complete distribution built on PostgreSQL 17 with 340+ extensions — OLTP, OLAP, time-series, geo, vector, graph, document workloads all on one engine.
    link: /en/modules/
    linkText: Module catalog
  - icon: 🔋
    title: Self-healing HA
    details: Automatic failover with Patroni + etcd; seamless read/write routing via HAProxy and VIP; point-in-time recovery with pgBackRest.
    link: /en/advanced/ha
    linkText: HA architecture
  - icon: 📈
    title: Observability Built-in
    details: Full-stack monitoring with Prometheus, Grafana, VictoriaMetrics and Loki — 30+ preconfigured dashboards and 600+ metrics.
    link: /en/guide/monitor
    linkText: Monitoring guide
  - icon: 🧩
    title: Modular Ecosystem
    details: PGSQL, REDIS, MINIO, ETCD, FERRET, DOCKER, VIBE, JUICE — mix and match modules; one infrastructure hosts many data services.
    link: /en/modules/
    linkText: Modules
  - icon: 🛡️
    title: Security & Compliance
    details: TLS, certificate authority, password policy, audit logging, least-privilege model on by default; offline install for air-gapped and compliance environments.
    link: /en/advanced/security
    linkText: Security hardening
  - icon: ⚡
    title: IaC & Bulk Operations
    details: One declarative YAML describes the entire database infrastructure; Ansible playbooks cover install, scale, failover, backup and restore.
    link: /en/advanced/deploy
    linkText: Production deployment
---

## Why Pigsty

Pigsty (**P**ostgres **I**n **G**reat **STY**le) is an open-source, free, production-ready PostgreSQL distribution.
It bundles the database, monitoring, high availability, backup, connection pooling and extension ecosystem into an infrastructure stack that runs entirely on your own machines — delivering an RDS-grade experience locally, without vendor lock-in.

A single command bootstraps the whole stack on a 1C/2G Linux box:

```bash
curl -fsSL https://repo.pigsty.cc/get | bash -s v4.2.2
```

## Learning Path

- **[Introduction](/en/intro/)** — what Pigsty is, what it does, who it's for
- **[Getting Started](/en/guide/)** — install, configure, connect, back up, monitor
- **[Advanced](/en/advanced/)** — multi-node deployment, HA, security, templates
- **[Modules](/en/modules/)** — deep dives into PGSQL, INFRA, REDIS, MINIO, …
- **[Reference](/en/reference/)** — parameters, metrics, extensions, FAQ

## Common Scenarios

Pigsty is widely used in — [see the scenario index →](/en/intro/scenarios)
