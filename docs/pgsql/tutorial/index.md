---
title: 任务教程
weight: 1800
description: 如何去完成单个任务。每个任务页面通常通过若干步骤展示如何完成某件具体的事。
icon: fas fa-tasks
module: [PIGSTY]
categories: [任务，参考]
---

# 任务教程

> 围绕 Pigsty PostgreSQL 的一组面向具体场景的端到端教程。
> 每篇文档聚焦一个任务，给出可复制的步骤和命令，可作为应急预案与日常实操参考。

---

## 故障应急

| 教程 | 场景 |
| --- | --- |
| [3 坏 2 应急处理](/docs/pgsql/tutorial/drill) | 三节点集群两节点失联，高可用失效后的恢复流程 |
| [故障排查](/docs/pgsql/tutorial/failure) | 常见故障与排查思路 |
| [误删处理](/docs/pgsql/tutorial/drop) | 误删数据 / 表 / 数据库后的处理 |
| [手工恢复 (PITR)](/docs/pgsql/tutorial/pitr) | 直接调用 pgBackRest 原语完成时间点恢复 |

---

## 集群与拓扑

| 教程 | 场景 |
| --- | --- |
| [Fork 实例](/docs/pgsql/tutorial/pg-fork) | 借助 XFS 在同机克隆实例并执行 PITR |
| [配置 PG VIP](/docs/pgsql/tutorial/pg-vip) | 用 vip-manager 为集群提供二层 VIP |
| [Citus 集群部署](/docs/pgsql/tutorial/citus) | 部署 Citus 高可用分布式集群 |

---

## 性能与调优

| 教程 | 场景 |
| --- | --- |
| [启用大页支持](/docs/pgsql/tutorial/hugepage) | 为大内存实例启用 HugePage，降低页表开销 |

---

需要更系统的运维操作（创建集群、扩缩容、备份、HBA、连接池等），请看 [日常管理](/docs/pgsql/admin)。
