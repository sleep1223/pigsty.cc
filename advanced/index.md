---
title: 高级
description: 生产部署、高可用、安全加固、模板与定制
---

# 高级

走完 [入门](/guide/) 后，本章覆盖把 Pigsty 用到 **生产级** 的所有关键话题。

## 路径

- **[生产部署](/advanced/deploy)** —— 多节点规划、资源准备、正式上线
- **[高可用架构](/advanced/ha)** —— Patroni / etcd / VIP / 故障演练
- **[安全加固](/advanced/security)** —— TLS、证书、权限、审计
- **[配置模板](/advanced/templates)** —— 40+ 现成模板按场景挑选
- **[扩展开发](/advanced/extensions)** —— 扩展安装、打包、自定义

## 常用剧本一览

| 剧本 | 用途 |
| --- | --- |
| `install.yml` | 全新部署 |
| `pgsql.yml` | 单独安装 PGSQL 模块 |
| `pgsql-rm.yml` | 下线一个 PG 集群 |
| `pgsql-user.yml` | 用户管理 |
| `pgsql-db.yml` | 数据库管理 |
| `pgsql-config.yml` | 重新渲染 postgresql.conf |
| `pgsql-pitr.yml` | PITR 恢复 |
| `node.yml` | 主机初始化 |
| `etcd.yml` | DCS 部署 |
| `minio.yml` | MinIO 部署 |
| `redis.yml` | Redis 部署 |

完整剧本列表：[/docs/pgsql/playbook](/docs/pgsql/playbook)
