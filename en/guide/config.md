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
      - { name: dbuser_app, password: 'PleaseChangeMe', roles: [ dbrole_readwrite ] }
      - { name: dbuser_ro,  password: 'PleaseChangeMe', roles: [ dbrole_readonly  ] }
```

Built-in roles (recommended):

| Role                | Privileges                                           |
| ------------------- | ---------------------------------------------------- |
| `dbrole_readonly`   | Read only                                            |
| `dbrole_readwrite`  | Read / write                                         |
| `dbrole_admin`      | DDL + read / write                                   |
| `dbrole_offline`    | Analytics / reporting; usually routed to replicas    |

Apply the change:

```bash
# Create the newly added users
./pgsql-user.yml -l pg-meta
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

Apply:

```bash
./pgsql-db.yml -l pg-meta
```

---

## Tune instance parameters

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
```

---

## Going deeper

- Full PGSQL configuration variables: [/docs/pgsql/config](/docs/pgsql/config)
- Day-to-day DBA operations: [/docs/pgsql/admin](/docs/pgsql/admin)
- All available playbooks: [/docs/pgsql/playbook](/docs/pgsql/playbook)
- 40+ config templates: [/docs/conf/](/docs/conf/)

Next up: [Connect](/en/guide/connect) — learn the various ways to reach the database.
