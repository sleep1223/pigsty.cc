---
title: Advanced
description: Production deployment, HA, hardening, templates and customization
---

# Advanced

After finishing [Getting Started](/en/guide/), this chapter covers everything needed to run Pigsty at **production grade**.

## Path

- **[Production deployment](/en/advanced/deploy)** — multi-node planning, resource prep, cutover
- **[HA architecture](/en/advanced/ha)** — Patroni / etcd / VIP / failure drills
- **[Security hardening](/en/advanced/security)** — TLS, certificates, privileges, audit
- **[Config templates](/en/advanced/templates)** — pick from 40+ ready-made templates
- **[Extension management](/en/advanced/extensions)** — install, package, customize extensions

## Playbook cheat sheet

| Playbook           | Purpose                           |
| ------------------ | --------------------------------- |
| `install.yml`      | Fresh deployment                  |
| `pgsql.yml`        | Install the PGSQL module alone    |
| `pgsql-rm.yml`     | Decommission a PG cluster         |
| `pgsql-user.yml`   | User management                   |
| `pgsql-db.yml`     | Database management               |
| `pgsql-config.yml` | Re-render `postgresql.conf`       |
| `pgsql-pitr.yml`   | PITR recovery                     |
| `node.yml`         | Host initialization               |
| `etcd.yml`         | DCS deployment                    |
| `minio.yml`        | MinIO deployment                  |
| `redis.yml`        | Redis deployment                  |

Full list: [/docs/pgsql/playbook](/docs/pgsql/playbook)
