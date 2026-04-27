---
title: 日常管理
weight: 1500
description: 数据库日常管理任务标准操作指南（SOP）
icon: fa-solid fa-building-columns
sidebar_expanded: true
module: [PGSQL]
categories: [任务]
---

# 日常管理

> Pigsty 中 PostgreSQL 集群日常运维任务的标准操作指南（SOP）。
> 所有变更均通过声明式配置 + [幂等剧本](/docs/pgsql/playbook) 完成；本节给出每类任务对应的页面与典型命令。

---

## 任务总览

| 任务 | 说明 |
| --- | --- |
| [集群管理](/docs/pgsql/admin/cluster) | 创建 / 销毁集群，扩缩容，克隆集群 |
| [用户管理](/docs/pgsql/admin/user) | 创建、修改、删除用户；角色成员关系；连接池用户配置 |
| [数据库管理](/docs/pgsql/admin/db) | 创建、修改、删除、重建数据库；模板克隆 |
| [高可用管理](/docs/pgsql/admin/patroni) | Patroni 状态、参数、主从切换、重做从库 |
| [HBA 管理](/docs/pgsql/admin/hba) | 刷新规则、验证配置、Pgbouncer HBA |
| [连接池管理](/docs/pgsql/admin/pgbouncer) | Pgbouncer 暂停 / 恢复 / 重载 / 终止连接 |
| [备份管理](/docs/pgsql/admin/pgbackrest) | pgBackRest 备份、恢复、校验、清理 |
| [监控管理](/docs/pgsql/admin/monitor) | Exporter、日志收集组件管理 |
| [组件管理](/docs/pgsql/admin/component) | 用 systemctl 启停 PG / Patroni / Pgbouncer / Exporter |
| [定时任务](/docs/pgsql/admin/crontab) | Cron 调度备份、Vacuum Freeze / Analyze、表膨胀处理 |
| [扩展管理](/docs/pgsql/admin/ext) | 下载、安装、启用、更新、卸载扩展 |
| [版本升级](/docs/pgsql/admin/upgrade) | 小版本滚动升级、大版本迁移、扩展升级 |

---

## 命令速查

最常用的几个剧本入口：

```bash
./pgsql.yml          -l <cls>                       # 部署 / 扩容集群
./pgsql-rm.yml       -l <cls>                       # 销毁集群或下线实例
./pgsql-user.yml     -l <cls> -e username=<name>    # 创建 / 更新用户
./pgsql-db.yml       -l <cls> -e dbname=<name>      # 创建 / 更新数据库
./pgsql-config.yml   -l <cls>                       # 重新生成 postgresql.conf
./pgsql-reload.yml   -l <cls>                       # 热加载 PG / Pgbouncer 配置
./pgsql-monitor.yml  -l <cls>                       # 接管远程实例监控
./pgsql-migration.yml -l <cls>                      # 生成集群迁移手册
```

完整的剧本与子任务清单见 [PGSQL 剧本](/docs/pgsql/playbook)。
