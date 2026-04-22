---
title: 业务场景
description: Pigsty 在不同业务场景下的典型用法：自建 RDS、AI 向量检索、数据中台、合规私有化、开发沙箱等
---

# 业务场景

Pigsty 围绕 PostgreSQL 构建，但能力远超一个"数据库安装器"。下面的场景分类能帮你快速判断：**Pigsty 适合我吗？**

## 🏢 场景一：自建开源 RDS

**痛点**：云厂商托管数据库价格高昂、版本滞后、扩展受限、数据出境受约束。

**Pigsty 方案**：
- 在自有 IDC / 混合云 / VPC 内用 3 台起步的节点，部署生产级 PostgreSQL 高可用集群
- 基于 Patroni + etcd 自动故障切换，HAProxy 负责读写分流与连接路由
- pgBackRest 提供 PITR 时间点恢复，搭配 MinIO 实现异地冷备
- 完整 Grafana 面板与 Prometheus 告警开箱即用

**推荐阅读**：[部署指南](/docs/deploy/) → [架构规划](/docs/deploy/planning) → [三节点 HA 模板](/docs/conf/)

---

## 🤖 场景二：AI / 向量检索后端

**痛点**：LLM 应用需要向量检索、语义缓存、记忆存储，但额外引入 Milvus/Chroma 会增加运维负担。

**Pigsty 方案**：
- 预装 `pgvector`、`pgvectorscale`、`pg_search`、`pg_trgm` 等扩展，单库完成向量 + 全文 + JSON 检索
- [VIBE 模块](/docs/vibe/) 提供 Code-Server、JupyterLab、Claude Code 等 AI 研发沙箱
- 通过 [FERRET](/docs/ferret/) 让 PostgreSQL 兼容 MongoDB 协议，方便对接 LangChain、LlamaIndex

**推荐阅读**：[PGSQL 扩展列表](/docs/ref/) → [VIBE 模块](/docs/vibe/)

---

## 🧪 场景三：本地开发 / 数据沙箱

**痛点**：开发者希望在本地快速复现生产数据库环境、体验完整的监控栈、尝试各类扩展。

**Pigsty 方案**：
- 一条命令在 1C/2G 的 Linux 虚拟机 / WSL 拉起完整 Pigsty，包含 PostgreSQL、Grafana、Prometheus
- 提供 Vagrant / Terraform 模板，一键置备多节点沙箱
- 内置 40+ 配置模板（meta、rich、fat、slim、infra、vibe），按需取用

**推荐阅读**：[单机安装](/docs/setup/) → [沙箱环境](/docs/deploy/sandbox) → [配置模板](/docs/conf/)

---

## 📊 场景四：多模数据中台

**痛点**：业务同时需要 OLTP、时序、地理、文档、KV、对象存储 —— 不想为每一类数据引入一套独立中间件。

**Pigsty 方案**：以 PostgreSQL 为核心，同一套基础设施承载：

| 数据类型   | 方案                                       |
| ---------- | ------------------------------------------ |
| OLTP       | PostgreSQL 17 + Patroni HA                 |
| OLAP       | Citus / DuckDB FDW / pg_mooncake           |
| 时序       | TimescaleDB                                |
| 地理       | PostGIS                                    |
| 向量       | pgvector / pgvectorscale                   |
| 文档       | [FerretDB](/docs/ferret/) (MongoDB 协议)   |
| KV / 缓存  | [Redis](/docs/redis/) 集群 / 哨兵 / 主从    |
| 对象存储   | [MinIO](/docs/minio/) 单机 / 多节点        |
| 分布式 FS  | [JuiceFS](/docs/juice/)                    |

**推荐阅读**：[模块总览](/docs/ref/module) → [Redis](/docs/redis/) → [MinIO](/docs/minio/)

---

## 🔒 场景五：合规 / 私有化 / 信创

**痛点**：金融、政企客户要求离线部署、国产化操作系统、等保合规、审计留痕。

**Pigsty 方案**：
- 支持 RockyLinux、AlmaLinux、openEuler、UOS、Kylin 等国产操作系统（见[操作系统兼容](/docs/ref/linux)）
- 完整离线安装包，无需公网即可交付（见[离线安装](/docs/setup/)）
- TLS 证书体系、密码复杂度、行级安全、审计日志默认启用（见[安全加固](/docs/concept/sec)）
- 开源协议友好（AGPL 3.0），支持商业订阅服务

**推荐阅读**：[离线安装](/docs/setup/) → [安全加固](/docs/concept/sec) → [操作系统兼容](/docs/ref/linux)

---

## 🚀 场景六：SaaS / 应用模板

**痛点**：交付应用时希望数据库层"自带电池"，不用重复造轮子。

**Pigsty 方案**：提供 [28+ 应用模板](/docs/app/) 覆盖常见数据应用，Docker Compose 一键启动：

- **BI / 看板**：Supabase、Metabase、Superset
- **低代码 / 业务**：Odoo、NocoDB、Directus
- **AI / LLM**：Dify、Langfuse、Mastra
- **开发工具**：Gitea、Harbor、Keycloak

**推荐阅读**：[应用模板](/docs/app/) → [Docker 模块](/docs/docker/)

---

## 不适合的场景

为避免踩坑，Pigsty **不是**：

- 一个云数据库 SaaS —— 它运行在你的机器上，不提供托管服务
- 一个 Kubernetes Operator —— Pigsty 面向"宠物式"长寿命节点，不是"牲口式"容器调度
- 一个单纯的 PostgreSQL 安装脚本 —— 它的价值在完整基础设施而不是数据库本身

如果你的需求是"K8s 里跑 PG"，可以关注 [CloudNativePG](https://cloudnative-pg.io/) 等项目。
