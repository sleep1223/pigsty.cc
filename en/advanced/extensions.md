---
title: Extension Management
description: Installing, enabling and packaging Pigsty's 340+ PostgreSQL extensions
---

# Extension Management

One of Pigsty's highlights is **340+ precompiled PostgreSQL extensions** — covering most scenarios you can think of.

## Grouped by capability

| Capability        | Examples                                     |
| ----------------- | -------------------------------------------- |
| Distributed       | Citus, pg_shard                              |
| Columnar / OLAP   | Hydra, citus columnar, pg_mooncake           |
| Time-series       | TimescaleDB                                  |
| Geo               | PostGIS, h3-pg, mobilitydb                   |
| Vector / AI       | pgvector, pgvectorscale, pg_vectorize        |
| Full-text         | pg_search, zhparser, pgroonga                |
| Graph             | AGE, pg_graph                                |
| Document          | DocumentDB (FerretDB), jsonb_plperl          |
| Audit / security  | pgaudit, anon, set_user                      |
| Queue / scheduler | pgmq, pg_cron                                |
| Foreign data      | oracle_fdw, mysql_fdw, file_fdw              |

Full list at the [extension catalog](https://pigsty.cc/ext/).

## Enable an extension

Two ways.

**Declare in `pigsty.yml`**:

```yaml [pigsty.yml]
pg_databases:
  - name: app_main
    extensions:
      - { name: pg_stat_statements }
      - { name: pgvector }
      - { name: postgis, schema: gis }
```

```bash
./pgsql-db.yml -l pg-meta
```

**Ad hoc SQL**:

```sql
CREATE EXTENSION pgvector;
```

## Install missing extensions

Pigsty only installs a subset of "common" extensions by default; use **pig** (Pigsty's built-in package manager) to pull the rest:

```bash
pig ext install timescaledb
pig ext install pg_cron
```

`pig` handles version dependencies, PG major-version matching, and yum / apt repo switching. See [pig](/docs/pig/).

## Custom extensions

If you need to compile your own extension, see:

- [repo module](/docs/repo/) — push extensions into your private YUM / APT repository
- pigsty-ext source: https://github.com/pgsty
