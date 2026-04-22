---
layout: home

hero:
  name: "Pigsty"
  text: "开箱即用的 PostgreSQL 发行版"
  tagline: 本地优先 · 开源免费 · 生产就绪的 RDS 替代方案
  image:
    src: /logo.svg
    alt: Pigsty
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/install
    - theme: alt
      text: 业务场景
      link: /intro/scenarios
    - theme: alt
      text: GitHub
      link: https://github.com/pgsty/pigsty

features:
  - icon: 🐘
    title: PostgreSQL 为核心
    details: 基于 PostgreSQL 17 与 340+ 扩展打造的完整数据库发行版，覆盖 OLTP、OLAP、时序、地理、向量、图、文档等全场景。
    link: /modules/
    linkText: 模块总览
  - icon: 🔋
    title: 自愈高可用
    details: 基于 Patroni + etcd 的自动故障切换，结合 HAProxy 与 VIP 提供无缝读写分流；pgBackRest 实现 PITR 时间点恢复。
    link: /advanced/ha
    linkText: 高可用架构
  - icon: 📈
    title: 开箱即用可观测
    details: Prometheus + Grafana + Victoria + Loki 全栈监控；预置 30+ Dashboard 与 600+ 指标覆盖数据库、主机、中间件。
    link: /guide/monitor
    linkText: 监测指南
  - icon: 🧩
    title: 丰富模块生态
    details: PGSQL、REDIS、MINIO、ETCD、FERRET、DOCKER、VIBE、JUICE 等模块按需组合，一套基础设施承载多种数据服务。
    link: /modules/
    linkText: 模块目录
  - icon: 🛡️
    title: 安全与合规
    details: 默认启用 TLS、证书体系、密码复杂度、审计日志、最小权限模型；支持离线部署与国产化环境。
    link: /advanced/security
    linkText: 安全加固
  - icon: ⚡
    title: IaC 与批量运维
    details: 一份声明式 YAML 配置描述整套数据库基础设施；Ansible 剧本覆盖安装、扩缩容、切换、备份恢复全生命周期。
    link: /advanced/deploy
    linkText: 生产部署
---

## 为什么选择 Pigsty

Pigsty（**P**ostgres **I**n **G**reat **STY**le）是一个开源、免费、生产就绪的 PostgreSQL 发行版。
它把数据库、监控、高可用、备份、连接池、扩展生态打包成一套可以本地部署的基础设施 —— 让你在自己的机器上获得与 RDS 媲美、甚至更强的 PostgreSQL 使用体验。

一条命令即可在一台 1C/2G 的 Linux 机器上拉起完整环境：

```bash
curl -fsSL https://repo.pigsty.cc/get | bash -s v4.2.2
```

## 学习路径

- **[介绍](/intro/)** — 了解 Pigsty 是什么、能做什么、适合谁
- **[入门](/guide/)** — 安装 / 配置 / 连接 / 备份 / 监测，一小时上手
- **[高级](/advanced/)** — 多节点部署、高可用、安全、模板
- **[模块](/modules/)** — PGSQL、INFRA、REDIS、MINIO 等逐个深入
- **[参考](/reference/)** — 参数、指标、扩展、FAQ 速查

## 常见业务场景

Pigsty 被广泛用于以下场景 —— [查看场景索引 →](/intro/scenarios)

- **自建 RDS**：在自有机房 / VPC / 边缘节点替代 AWS RDS、阿里云 RDS，节省成本且无锁定。
- **开发/数据沙箱**：笔记本或单机快速拉起完整可观测的 PG 环境用于本地开发与数据分析。
- **AI / 向量应用**：pgvector + 340+ 扩展打造 LLM 记忆层与 RAG 向量检索后端。
- **多模数据中台**：以 PG 为底座，同时承载 OLTP、时序（TimescaleDB）、地理（PostGIS）、文档（FerretDB）、KV（Redis）、对象（MinIO）。
- **合规与信创**：支持离线环境、国产操作系统、等保/审计需求下的私有化交付。
