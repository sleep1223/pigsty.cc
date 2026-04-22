---
title: Getting Started
description: The shortest path to a working Pigsty and the day-one operations
---

# Getting Started

For everyone running Pigsty for the first time. Follow the pages below in order — about an hour from start to finish — and you'll be comfortable with the day-to-day operations.

## Learning path

1. **[Install](/en/guide/install)** — bring up Pigsty on a Linux host
2. **[Configure](/en/guide/config)** — create users, create databases, tweak instance parameters
3. **[Connect](/en/guide/connect)** — reach the database from `psql` and applications
4. **[Backup & restore](/en/guide/backup)** — full backups and PITR
5. **[Monitor](/en/guide/monitor)** — explore Grafana dashboards and set up alerts

## Prerequisites

- A Linux machine (VM or physical), at least 1 vCPU and 2 GB RAM
- A supported OS: EL 7/8/9, Debian 12, Ubuntu 22.04 / 24.04, etc. (full list in [OS compatibility](/docs/ref/linux))
- `root` or `sudo` access
- Internet access to download packages (for air-gapped, see [offline mode](/docs/setup/offline))

## Who it's for

- Ops engineers installing a production PostgreSQL for the first time
- Teams migrating PostgreSQL **off managed RDS** back to their own data center
- Developers who want a full observable PG environment on their laptop

Ready? Begin with [install](/en/guide/install).
