---
title: Connect
description: Reach Pigsty via psql, pgBouncer, VIP or DNS
---

# Connect

Pigsty exposes **five service endpoints** by default, each with a different purpose:

| Service     | Port | Purpose                                   |
| ----------- | ---- | ----------------------------------------- |
| `primary`   | 5433 | Read/write; automatically routed to the primary |
| `replica`   | 5434 | Read-only traffic spread across all replicas |
| `default`   | 5436 | Direct connection to primary (bypassing pgBouncer) |
| `offline`   | 5438 | Dedicated analytics endpoint              |
| `pgbouncer` | 6432 | Connection-pool entry point               |

HAProxy keeps backend health checks up to date, so primary failover is transparent to clients.

---

## psql command line

```bash
# Local Unix socket (fastest)
psql postgres

# TCP with password
psql "postgres://dbuser_app:password@10.10.10.10:5433/app_main"

# Read-only replica
psql "postgres://dbuser_ro:password@10.10.10.10:5434/app_main"
```

## Application connection strings

**Java / HikariCP**:

```properties [hikari.properties]
jdbc.url=jdbc:postgresql://pg-meta:5433/app_main
db.user=dbuser_app
db.password=********
```

**Go / pgx**:

```go
dsn := "postgres://dbuser_app:***@pg-meta:5433/app_main?sslmode=require"
```

**Node.js / node-postgres**:

```js
new Pool({ host: 'pg-meta', port: 5433, user: 'dbuser_app', database: 'app_main' })
```

For connection reuse, point applications at `pgBouncer` on port **6432**:

```text
postgres://dbuser_app:***@pg-meta:6432/app_main
```

## DNS / VIP access

By default Pigsty registers cluster names (e.g. `pg-meta`) into its internal DNS and points them at a VIP. Applications only need to know the cluster name — no awareness of node IPs required.

- **L2 VIP** — requires nodes sharing a L2 network / switch
- **DNS-based** — fits L3 cross-network deployments
- See [NODE / VIP](/docs/node/)

## Passwords and `.pgpass`

To avoid exposing passwords on the command line, populate `~/.pgpass`:

```text [~/.pgpass]
10.10.10.10:5433:app_main:dbuser_app:password
```

```bash
chmod 600 ~/.pgpass
```

## Going deeper

- Service access architecture: [/docs/pgsql/misc/svc](/docs/pgsql/misc/svc)
- pgBouncer pool modes: [/docs/pgbouncer/](/docs/pgbouncer/)
- HAProxy routing: [/docs/node/](/docs/node/)
