---
title: 扩展管理
description: Pigsty 340+ 扩展的安装、启用、打包
---

# 扩展管理

Pigsty 的一大亮点是 **340+ 预编译 PostgreSQL 扩展** —— 覆盖你能想到的大多数场景。

## 按能力归类

| 能力 | 代表扩展 |
| --- | --- |
| 分布式 | Citus, pg_shard |
| 列存 / 分析 | Hydra, citus columnar, pg_mooncake |
| 时序 | TimescaleDB |
| 地理 | PostGIS, h3-pg, mobilitydb |
| 向量 / AI | pgvector, pgvectorscale, pg_vectorize |
| 全文检索 | pg_search, zhparser, pgroonga |
| 图 | AGE, pg_graph |
| 文档 | DocumentDB (FerretDB), jsonb_plperl |
| 审计 / 安全 | pgaudit, anon, set_user |
| 队列 | pgmq, pg_cron |
| 外部数据 | oracle_fdw, mysql_fdw, file_fdw |

完整列表见 [扩展目录](https://pigsty.cc/ext/)。

## 启用扩展

两种方式。

**在 `pigsty.yml` 声明**：

```yaml
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

**临时在 SQL 里 CREATE**：

```sql
CREATE EXTENSION pgvector;
```

## 安装缺失扩展

Pigsty 默认只装一部分"常用"扩展，其余按需通过 **pig**（Pigsty 自带的包管理器）拉取：

```bash
pig ext install timescaledb
pig ext install pg_cron
```

pig 会处理版本依赖、PG 主版本匹配、yum/apt 源切换。详见 [pig 工具](/docs/pig/).

## 自定义扩展

如果需要编译自己的扩展，参考：

- [repo 模块](/docs/repo/) —— 把扩展打进你的私有 YUM/APT 仓库
- pigsty-ext 源码：https://github.com/pgsty
