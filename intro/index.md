---
title: 介绍
description: 认识 Pigsty —— 开箱即用的 PostgreSQL 发行版
---

# 认识 Pigsty

**Pigsty**（**P**ostgres **I**n **G**reat **STY**le）是一个 **开源、免费、本地优先** 的 PostgreSQL 发行版，定位是 **RDS 替代方案**。

它把 PostgreSQL 本身、高可用、监控、备份、连接池、扩展生态，打包成一套可以完全跑在你自己机器上的数据库基础设施。

## 它解决什么

- **不想被云厂商锁定** —— 自建 RDS，数据与能力全部在手
- **想用好 PostgreSQL 生态** —— 预装 340+ 扩展，覆盖 OLTP / 时序 / 地理 / 向量 / 全文
- **需要生产级可靠性** —— 自动故障切换、PITR、监控告警默认就绪
- **需要私有化 / 离线 / 信创** —— 支持国产 OS，完整离线安装

## 技术全景

| 能力 | 默认组件 |
| --- | --- |
| 数据库内核 | PostgreSQL 17 + 340+ 扩展 |
| 高可用 | Patroni + etcd |
| 连接池 | pgBouncer |
| 负载均衡 | HAProxy + VIP |
| 备份 / PITR | pgBackRest + MinIO |
| 监控 | Prometheus + Grafana + VictoriaMetrics |
| 日志 | Loki |
| 配置管理 | Ansible (IaC) |

## 下一步

- 继续阅读：[功能特性](/intro/features)、[业务场景](/intro/scenarios)、[同类对比](/intro/compare)
- 直接上手：[入门指南 → 安装](/guide/install)
