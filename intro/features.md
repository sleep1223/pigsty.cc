---
title: 功能特性
description: Pigsty 的核心能力一览
---

# 功能特性

## 🐘 数据库内核

- **PostgreSQL 17** 作为默认主版本，同时支持 13 / 14 / 15 / 16
- **340+ 预编译扩展**，覆盖 OLTP、OLAP、时序、地理、向量、全文、图、审计
- 多内核可选：原生 PostgreSQL、Citus 分布式、PolarDB、Greenplum、MSSQL 兼容模式

## 🔋 高可用

- **Patroni + etcd** 实现自动故障切换，Failover 通常在秒级完成
- **HAProxy** 路由读写，支持只读副本自动接入
- **L2 VIP / DNS** 多种方式暴露服务
- 详见 [高可用架构](/advanced/ha)

## 💾 备份与恢复

- **pgBackRest** 全量 / 增量 / 差量备份
- **PITR** 时间点恢复（精度到事务）
- 冷备可落到本地磁盘、[MinIO](/docs/minio/) 或任何 S3 兼容存储
- 详见 [备份恢复指南](/guide/backup)

## 📊 可观测性

- **Prometheus + VictoriaMetrics** 指标采集
- **Grafana** 预置 30+ Dashboard
- **Loki** 日志聚合
- **pg_exporter** 暴露 600+ PostgreSQL 指标
- 详见 [监测指南](/guide/monitor)

## 🧩 模块化架构

按需组合：

- [PGSQL](/docs/pgsql/) — PostgreSQL 核心
- [INFRA](/docs/infra/) — 监控 / DNS / NTP / 软件源
- [NODE](/docs/node/) — 主机初始化、VIP、HAProxy
- [ETCD](/docs/etcd/) — DCS
- [MINIO](/docs/minio/) — S3 兼容对象存储
- [REDIS](/docs/redis/) — 主从 / 哨兵 / 集群
- [FERRET](/docs/ferret/) — MongoDB 协议兼容
- [DOCKER](/docs/docker/) — 容器运行时
- 其他：[JUICE](/docs/juice/)、[VIBE](/docs/vibe/)、[PILOT](/docs/pilot/)

## 🛡️ 安全

- TLS 证书体系（自签 CA）
- 强制密码复杂度
- 行级安全 / 审计日志
- 最小权限模型
- 详见 [安全加固](/advanced/security)

## ⚡ IaC 与批量运维

- 声明式 YAML 配置描述整套数据库基础设施
- Ansible 剧本覆盖安装、扩缩容、切换、备份恢复全生命周期
- 详见 [IaC 概念](/docs/concept/iac)

## 🌐 部署范围

- 支持 EL 7/8/9、Debian 12、Ubuntu 22/24、openEuler、Kylin、UOS 等
- 支持离线部署
- 单机到上千节点
- 本地 / 公有云 / 混合云 / 边缘
