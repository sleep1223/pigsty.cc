---
title: 模块：PILOT
weight: 5000
description: 试点开发的额外功能模组
icon: fas fa-flask-vial
module: [PILOT]
categories: [参考]
---

# 模块：PILOT

> PILOT 收纳了一组「试点 / 实验性」模块，用 Pigsty 的统一编排方式安装、配置、纳管这些组件。
> 这些模块尚未达到核心模块（PGSQL / NODE / INFRA / REDIS / ETCD …）的成熟度，但已可在测试与试点环境使用。

---

## 模块列表

| 模块 | 说明 |
| --- | --- |
| [Code](/docs/pilot/code/) | 部署 Code-Server，把 VS Code 跑在浏览器里 |
| [Consul](/docs/pilot/consul/) | 安装 Consul，作为 etcd 的替代 DCS |
| [DuckDB](/docs/pilot/duckdb/) | 嵌入式高性能分析数据库 |
| [Kafka](/docs/pilot/kafka/) | 拉起 Kafka KRaft 集群，分布式流处理平台 |
| [Kubernetes](/docs/pilot/kube/) | 生产级容器调度编排私有云平台 |
| [MySQL](/docs/pilot/mysql/) | 部署 MySQL 集群，用于测试、迁移、性能评估 |
| [TigerBeetle](/docs/pilot/tigerbeetle/) | 金融级会计事务专用数据库 |
