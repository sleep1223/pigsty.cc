---
title: 模块
description: Pigsty 的模块化组件一览
---

# 模块总览

Pigsty 采用模块化设计，核心模块 + 扩展模块按需组合。

## 核心数据库模块

| 模块 | 作用 | 链接 |
| --- | --- | --- |
| **PGSQL** | PostgreSQL 主体（含 Patroni / pgBouncer / HAProxy） | [/docs/pgsql/](/docs/pgsql/) |
| **Patroni** | HA 守护 | [/docs/patroni/](/docs/patroni/) |
| **pgBouncer** | 连接池 | [/docs/pgbouncer/](/docs/pgbouncer/) |
| **pgBackRest** | 备份 / PITR | [/docs/pgbackrest/](/docs/pgbackrest/) |
| **pg_exporter** | 指标采集 | [/docs/pg_exporter/](/docs/pg_exporter/) |

## 基础设施模块

| 模块 | 作用 | 链接 |
| --- | --- | --- |
| **INFRA** | Prometheus / Grafana / Loki / DNS / NTP | [/docs/infra/](/docs/infra/) |
| **NODE** | 主机初始化 / VIP / HAProxy | [/docs/node/](/docs/node/) |
| **ETCD** | 分布式配置存储 / DCS | [/docs/etcd/](/docs/etcd/) |
| **MINIO** | S3 兼容对象存储 | [/docs/minio/](/docs/minio/) |
| **DOCKER** | 容器运行时 | [/docs/docker/](/docs/docker/) |

## 扩展数据服务模块

| 模块 | 作用 | 链接 |
| --- | --- | --- |
| **REDIS** | KV / 缓存（主从 / 哨兵 / 集群） | [/docs/redis/](/docs/redis/) |
| **FERRET** | MongoDB 协议 on PG | [/docs/ferret/](/docs/ferret/) |
| **JUICE** | JuiceFS 分布式文件系统 | [/docs/juice/](/docs/juice/) |

## 工具模块

| 模块 | 作用 | 链接 |
| --- | --- | --- |
| **pig** | Pigsty 包管理器（Go CLI） | [/docs/pig/](/docs/pig/) |
| **piglet** | 轻量运行时 | [/docs/piglet/](/docs/piglet/) |
| **vibe** | AI 开发沙箱（Code-Server / JupyterLab） | [/docs/vibe/](/docs/vibe/) |
| **pilot** | 实验性模块 | [/docs/pilot/](/docs/pilot/) |

## 应用模板

[28+ 应用模板](/docs/app/) 覆盖常见数据应用，Compose 一键启动。
