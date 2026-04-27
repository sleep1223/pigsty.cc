---
title: 个性化配置
description: 新建用户、新建数据库、修改实例参数
---

# 个性化配置

安装完成后，你通常要做三件事：**创建业务用户、创建业务数据库、调整 PostgreSQL 参数**。
Pigsty 的思路是 —— 所有这些都通过声明式 YAML 配置 + 剧本完成，而不是登进数据库手工 DDL。

配置文件位置：`~/pigsty/pigsty.yml`

---

## 新建业务用户

在 `pigsty.yml` 里找到你的 PG 集群段，例如 `pg-meta`。在 `pg_users` 下追加：

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

内置角色（推荐使用）：

| 角色 | 权限 |
| --- | --- |
| `dbrole_readonly` | 只读 |
| `dbrole_readwrite` | 读写 |
| `dbrole_admin` | DDL + 读写 |
| `dbrole_offline` | 分析 / 报表专用，通常导到只读副本 |

`pgbouncer: true` 表示把该用户加入 PgBouncer 连接池的认证名单，业务即可通过 6432 端口走连接池接入。

执行变更，通过 `-e username=` 指定要创建的用户名：

```bash
# 创建新增加的用户（Docker 部署时集群名为 pgsql）
./pgsql-user.yml -l pg-meta -e username=dbuser_fas
```

---

## 新建业务数据库

类似地，在集群的 `pg_databases` 下添加：

```yaml [pigsty.yml]
    pg_databases:
      - name: app_main
        owner: dbuser_app
        extensions: [ { name: pg_stat_statements }, { name: pgvector } ]
        comment: 主业务库
```

执行，通过 `-e dbname=` 指定要创建的数据库名：

```bash
# 创建新增加的数据库（Docker 部署时集群名为 pgsql）
./pgsql-db.yml -l pg-meta -e dbname=db_fas
```

---

## 修改实例参数

入门最快的方式 —— 使用 Patroni 的命令行直接编辑集群参数：

```bash
# 打开编辑器修改集群参数，保存后会自动下发到所有成员，必要时滚动重启
pg edit-config pg-meta     # Docker 部署集群名为 pgsql：pg edit-config pgsql
```

它适合临时调整、试验性改参；保存后改动只存在于 Patroni DCS 中，不会回写 `pigsty.yml`。
如果想让配置长期可复现，仍建议通过下面的声明式方式管理。

PostgreSQL 参数通过 `pg_conf` 模板 + `pg_parameters` 覆盖层控制。

**临时改几个参数** —— 在集群 `vars` 下加：

```yaml [pigsty.yml]
    pg_parameters:
      shared_buffers: 8GB
      max_connections: 500
      log_min_duration_statement: 1000  # ms
```

**选用不同调优模板**：

```yaml [pigsty.yml]
    pg_conf: olap.yml   # 默认 oltp.yml，可选 olap.yml / crit.yml / tiny.yml
```

执行：

```bash
# 重新生成 postgresql.conf
./pgsql-config.yml -l pg-meta

# 热加载（部分参数需重启）
./pgsql-reload.yml -l pg-meta

# 重启使需要重启的参数生效（滚动重启，先从库后主库）
pg restart pg-meta --pending      # 只重启被标记为 pending restart 的实例
# 或全量重启：pg restart pg-meta
```

---

## 更深入

- 完整的 PGSQL 配置变量：[/docs/pgsql/config](/docs/pgsql/config)
- 日常 DBA 操作：[/docs/pgsql/admin](/docs/pgsql/admin)
- 所有可用剧本：[/docs/pgsql/playbook](/docs/pgsql/playbook)
- 配置模板库（40+）：[/docs/conf/](/docs/conf/)

完成后，去 [连接数据库](/guide/connect) 学习各种接入方式。
