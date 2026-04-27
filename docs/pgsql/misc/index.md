---
title: 其他说明
weight: 2300
description: PGSQL 模块的概念性补充：用户 / 数据库 / 服务 / HBA / 访问控制
icon: fa-solid fa-lock
module: [PGSQL]
categories: [参考]
---

# 其他说明

> PGSQL 模块的概念性补充文档：解释 Pigsty 抽象之下的 PostgreSQL 原生对象与机制。
> 实操类内容（如何创建、如何修改）请看 [日常管理](/docs/pgsql/admin) 与 [集群配置](/docs/pgsql/config)。

---

## 文档列表

| 文档 | 说明 |
| --- | --- |
| [用户 / 角色](/docs/pgsql/misc/user) | `CREATE USER/ROLE` 创建的集簇内逻辑对象，及 Pigsty 默认角色体系 |
| [数据库](/docs/pgsql/misc/db) | `CREATE DATABASE` 创建的逻辑对象，模板、属性与默认配置 |
| [服务 / 接入](/docs/pgsql/misc/svc) | 如何分离读写、路由流量，对外稳定交付集群能力 |
| [认证 / HBA](/docs/pgsql/misc/hba) | 基于主机的身份认证（Host-Based Authentication）详解 |
| [访问控制](/docs/pgsql/misc/acl) | Pigsty 默认的角色系统与权限模型 |
