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
      - { name: dbuser_app, password: 'PleaseChangeMe', roles: [ dbrole_readwrite ] }
      - { name: dbuser_ro,  password: 'PleaseChangeMe', roles: [ dbrole_readonly  ] }
```

内置角色（推荐使用）：

| 角色 | 权限 |
| --- | --- |
| `dbrole_readonly` | 只读 |
| `dbrole_readwrite` | 读写 |
| `dbrole_admin` | DDL + 读写 |
| `dbrole_offline` | 分析 / 报表专用，通常导到只读副本 |

执行变更：

```bash
# 创建新增加的用户
./pgsql-user.yml -l pg-meta
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

执行：

```bash
./pgsql-db.yml -l pg-meta
```

---

## 修改实例参数

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
```

---

## 更深入

- 完整的 PGSQL 配置变量：[/docs/pgsql/config](/docs/pgsql/config)
- 日常 DBA 操作：[/docs/pgsql/admin](/docs/pgsql/admin)
- 所有可用剧本：[/docs/pgsql/playbook](/docs/pgsql/playbook)
- 配置模板库（40+）：[/docs/conf/](/docs/conf/)

完成后，去 [连接数据库](/guide/connect) 学习各种接入方式。
