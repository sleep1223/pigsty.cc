---
title: 同类对比
description: Pigsty 与 RDS、CloudNativePG、原生 PostgreSQL 的对比
---

# 同类对比

## Pigsty vs 云厂商 RDS

| 维度 | 云厂商 RDS | Pigsty |
| --- | --- | --- |
| 成本 | 按时计费，长期昂贵 | 一次部署，仅硬件成本 |
| PostgreSQL 版本 | 通常滞后主线 6-18 月 | 跟随主线，17 默认 |
| 扩展数量 | 数十个 | 340+ |
| 数据主权 | 受云厂商管辖 | 完全在你手中 |
| 定制能力 | 受限 | 无限制 |
| 锁定风险 | 高 | 零 |

## Pigsty vs Kubernetes Operator (CloudNativePG 等)

| 维度 | K8s Operator | Pigsty |
| --- | --- | --- |
| 基础设施假设 | 已有 K8s 集群 | 裸机 / 虚拟机 |
| 运维心智 | 云原生 / 容器调度 | 传统"宠物式"节点 |
| 监控栈 | 需自行搭建 | 默认完整交付 |
| 扩展生态 | 需自行打包镜像 | 预编译一站式 |
| 适合场景 | 短生命周期、弹性伸缩 | 长期稳定的数据库服务 |

## Pigsty vs 原生 PostgreSQL

原生 PostgreSQL 只是一个数据库进程。生产环境还需要：

- 高可用方案（Patroni + etcd）
- 连接池（pgBouncer）
- 负载均衡（HAProxy）
- 备份工具（pgBackRest）
- 监控（Prometheus / Grafana / exporter）
- 日志、告警、配置管理……

**Pigsty = PostgreSQL + 以上全部 + 最佳实践组装**，而不是让你从零拼装。
