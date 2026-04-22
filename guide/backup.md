---
title: 备份恢复
description: 用 pgBackRest 完成全量 / 增量备份与 PITR 时间点恢复
---

# 备份与恢复

Pigsty 使用 **pgBackRest** 作为默认备份工具 —— 工业级方案，支持并行、压缩、加密、增量。

## 备份仓库

Pigsty 默认支持三种仓库位置：

| 仓库 | 说明 | 适用 |
| --- | --- | --- |
| `local` | 主库本地磁盘 | 开发 / 测试 / 单机 |
| `minio` | 内置 MinIO 对象存储 | 推荐生产场景 |
| `s3` | 外部 S3 兼容服务 | 异地冷备 |

在 `pigsty.yml` 中切换：

```yaml
vars:
  pgbackrest_method: minio    # local | minio | s3
```

---

## 手工触发备份

```bash
# 全量
pg-backup --full

# 增量
pg-backup

# 查看历史
pg-backup --list
```

底层对应：

```bash
sudo -iu postgres pgbackrest --stanza=<cluster> backup --type=full
```

---

## 自动备份策略

Pigsty 默认配置了定时备份 —— 每周一次全量、每天一次增量。策略由 `pg_backup_crontab` 控制，默认：

```yaml
pg_backup_crontab:
  - '00 01 * * 0  postgres pg-backup --full'  # 每周日 1 点全量
  - '00 01 * * 1-6 postgres pg-backup'        # 其他日增量
```

保留策略：

```yaml
pgbackrest_repo:
  local:
    path: /pg/backup
    retention_full: 2      # 保留 2 次全量
    retention_diff: 3      # 保留 3 次差量
```

---

## PITR 时间点恢复

假设误删了数据，要恢复到 `2026-04-22 14:30:00`：

```bash
# 停止服务
pg-pitr --time='2026-04-22 14:30:00'
```

Pigsty 会：

1. 停止 Patroni
2. 清空数据目录
3. 从最近一次全量还原
4. 重放 WAL 到目标时间点
5. 重建 Patroni 集群

完整剧本：[`pgsql-pitr.yml`](/docs/pgbackrest/)

---

## 从备份克隆一个新集群

`pigsty.yml` 中定义一个新集群，在 `vars` 设 `pg_cluster_readonly: true` 并指定 `pgbackrest_cluster`，然后：

```bash
./pgsql.yml -l pg-new
```

即完成"生产库数据拉起到分析环境"的常用操作。

---

## 更深入

- pgBackRest 官方理念与命令：[/docs/pgbackrest/](/docs/pgbackrest/)
- MinIO 做备份仓库：[/docs/minio/](/docs/minio/)
- PITR 原理：[/docs/concept/pitr](/docs/concept/pitr)
