---
title: Backup & Restore
description: Full / incremental backups and PITR with pgBackRest
---

# Backup & Restore

Pigsty uses **pgBackRest** as the default backup tool — an industrial-grade solution with parallelism, compression, encryption and incremental support.

## Backup repositories

Pigsty supports three repository locations out of the box:

| Repository | Description                           | Best for                |
| ---------- | ------------------------------------- | ----------------------- |
| `local`    | Local disk on the primary             | Dev / test / single-node |
| `minio`    | The built-in MinIO object storage     | Recommended for prod    |
| `s3`       | External S3-compatible storage        | Off-site cold backup    |

Switch in `pigsty.yml`:

```yaml [pigsty.yml]
vars:
  pgbackrest_method: minio    # local | minio | s3
```

---

## Trigger a backup manually

```bash
# Full backup
pg-backup --full

# Incremental
pg-backup

# List history
pg-backup --list
```

Underneath:

```bash
sudo -iu postgres pgbackrest --stanza=<cluster> backup --type=full
```

---

## Automated schedule

By default Pigsty configures a weekly full + daily incremental schedule, controlled by `pg_backup_crontab`:

```yaml [pigsty.yml]
pg_backup_crontab:
  - '00 01 * * 0  postgres pg-backup --full'  # weekly full at 1 AM Sunday
  - '00 01 * * 1-6 postgres pg-backup'        # daily incremental
```

Retention policy:

```yaml [pigsty.yml]
pgbackrest_repo:
  local:
    path: /pg/backup
    retention_full: 2      # keep 2 full backups
    retention_diff: 3      # keep 3 differential backups
```

---

## PITR — point-in-time recovery

Say someone dropped the wrong table, and you want to recover to `2026-04-22 14:30:00`:

```bash
# Stop services first
pg-pitr --time='2026-04-22 14:30:00'
```

Pigsty will:

1. Stop Patroni
2. Clear the data directory
3. Restore from the latest full backup
4. Replay WAL up to the target timestamp
5. Rebuild the Patroni cluster

Playbook: [`pgsql-pitr.yml`](/docs/pgbackrest/)

---

## Clone a new cluster from a backup

Define a new cluster in `pigsty.yml`, set `pg_cluster_readonly: true` and point `pgbackrest_cluster` at the source, then:

```bash
./pgsql.yml -l pg-new
```

That's the canonical "restore production into analytics" pattern.

---

## Going deeper

- pgBackRest concepts and commands: [/docs/pgbackrest/](/docs/pgbackrest/)
- MinIO as backup repository: [/docs/minio/](/docs/minio/)
- PITR internals: [/docs/concept/pitr](/docs/concept/pitr)
