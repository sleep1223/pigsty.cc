---
title: 管理预案
weight: 3100
description: 基础设施组件与 Infra 集群管理 SOP：创建，销毁，扩容，缩容，证书，仓库……
icon: fa-solid fa-building-columns
categories: [任务，参考]
---

# 管理预案

> Pigsty 基础设施（INFRA）日常管理任务的标准操作指南。
> 涵盖 INFRA 模块自身的生命周期，以及它承载的几类组件：CA / 证书、Web 门户、本地软件仓库、域名、Grafana 后端等。

---

## 任务列表

| 任务 | 说明 |
| --- | --- |
| [模块管理](/docs/infra/admin/sop) | INFRA 模块自身的定义、创建、销毁、扩缩容 |
| [CA 与证书](/docs/infra/admin/cert) | 自签 CA、签发服务证书、替换为公网 HTTPS 证书 |
| [Nginx 管理](/docs/infra/admin/portal) | Web 门户与 Nginx 配置，暴露上游服务 |
| [软件仓库](/docs/infra/admin/repo) | 本地 APT / YUM 仓库的管理与更新 |
| [域名管理](/docs/infra/admin/domain) | 配置本地或公网域名访问 Pigsty 服务 |
| [Grafana 高可用](/docs/infra/admin/grafana) | 用 PostgreSQL 替换 SQLite 作为 Grafana 后端 |
