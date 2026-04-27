---
title: Configure
description: Create users, create databases, and tune instance parameters
---

# Configure

Once installed, you typically want to do three things: **create business users, create business databases, and adjust PostgreSQL parameters**.
Pigsty's philosophy is to drive all of this through a declarative YAML file plus playbooks — not by running DDL by hand.

The config file lives at `~/pigsty/pigsty.yml`.

---

## Create a business user

Find your PG cluster block in `pigsty.yml` (for example `pg-meta`) and append to `pg_users`:

```yaml [pigsty.yml] {7-9}
pg-meta:
  hosts:
    10.10.10.10: { pg_seq: 1, pg_role: primary }
  vars:
    pg_cluster: pg-meta
    pg_users:
      - { name: dbuser_app, password: 'PleaseChangeMe', roles: [ dbrole_readwrite ], pgbouncer: true }
      - { name: dbuser_ro,  password: 'PleaseChangeMe', roles: [ dbrole_readonly  ], pgbouncer: true }
```

Built-in roles (recommended):

| Role                | Privileges                                           |
| ------------------- | ---------------------------------------------------- |
| `dbrole_readonly`   | Read only                                            |
| `dbrole_readwrite`  | Read / write                                         |
| `dbrole_admin`      | DDL + read / write                                   |
| `dbrole_offline`    | Analytics / reporting; usually routed to replicas    |

`pgbouncer: true` adds the user to PgBouncer's auth list so apps can connect through the pooler on port 6432.

Apply the change — pass `-e username=` to target the user to create:

```bash
# Create the newly added user (use cluster name `pgsql` for Docker deployments)
./pgsql-user.yml -l pg-meta -e username=dbuser_fas
```

---

## Create a business database

Similarly, append to the cluster's `pg_databases`:

```yaml [pigsty.yml]
    pg_databases:
      - name: app_main
        owner: dbuser_app
        extensions:
          - { name: pg_stat_statements }
          - { name: pgvector }
        comment: Main business database
```

Apply — pass `-e dbname=` to target the database to create:

```bash
# Create the newly added database (use cluster name `pgsql` for Docker deployments)
./pgsql-db.yml -l pg-meta -e dbname=db_fas
```

---

## Tune instance parameters

The fastest way to get started — edit cluster parameters via Patroni's CLI:

```bash
# Open an editor on the cluster config; on save it propagates to all members and rolls restart if needed
pg edit-config pg-meta     # Docker deployment uses cluster name `pgsql`: pg edit-config pgsql
```

Good for ad-hoc tweaks and experiments; the change lives in Patroni's DCS only and is **not** written back to `pigsty.yml`.
For reproducible, long-term configuration, prefer the declarative approach below.

PostgreSQL parameters are governed by the `pg_conf` template plus the `pg_parameters` override layer.

**Override a few parameters** — add under the cluster's `vars`:

```yaml [pigsty.yml]
    pg_parameters:
      shared_buffers: 8GB
      max_connections: 500
      log_min_duration_statement: 1000   # ms
```

**Switch the tuning template**:

```yaml [pigsty.yml]
    pg_conf: olap.yml    # default is oltp.yml; also olap.yml / crit.yml / tiny.yml
```

Apply:

```bash
# Re-render postgresql.conf
./pgsql-config.yml -l pg-meta

# Hot-reload (some parameters still need a restart)
./pgsql-reload.yml -l pg-meta

# Restart to apply parameters that require it (rolling: replicas first, then primary)
pg restart pg-meta --pending      # only restart instances marked as pending-restart
# Or restart all members: pg restart pg-meta
```

---

## Going deeper

- Full PGSQL configuration variables: [/docs/pgsql/config](/docs/pgsql/config)
- Day-to-day DBA operations: [/docs/pgsql/admin](/docs/pgsql/admin)
- All available playbooks: [/docs/pgsql/playbook](/docs/pgsql/playbook)
- 40+ config templates: [/docs/conf/](/docs/conf/)

Next up: [Connect](/en/guide/connect) — learn the various ways to reach the database.
