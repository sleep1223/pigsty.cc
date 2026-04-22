---
title: 安装
description: 一条命令在 Linux 上部署 Pigsty
---

# 安装

## 单机快速安装

在一台 Linux 机器上执行：

```bash
curl -fsSL https://repo.pigsty.cc/get | bash -s v4.2.2
cd ~/pigsty
./bootstrap   # 安装 Ansible 依赖
./configure   # 生成配置
./install.yml # 执行安装剧本
```

大约 5-10 分钟后，Pigsty 启动完成。默认组件：

- PostgreSQL 17 监听 `5432`
- Grafana 监控 UI：`http://<IP>:3000`（默认账号 `admin / pigsty`）
- Prometheus：`http://<IP>:9090`
- MinIO 控制台：`http://<IP>:9001`

## 常见安装模式

| 模式 | 适用场景 | 进一步阅读 |
| --- | --- | --- |
| **标准安装** | 单机 / 沙箱 / 小规模生产 | [单机安装](/docs/setup/install) |
| **离线安装** | 无公网环境、国产化 | [离线模式](/docs/setup/offline) |
| **精简安装** | 只要 PostgreSQL，不要完整监控栈 | [精简模式](/docs/setup/slim) |
| **多节点部署** | 生产级 HA 集群 | [高级 → 生产部署](/advanced/deploy) |

## 通过 Vagrant / Terraform 准备机器

Pigsty 提供开箱即用的基础设施模板：

- [Vagrant 沙箱](/docs/deploy/vagrant) —— 本地一键拉起多节点虚拟机
- [Terraform 模板](/docs/deploy/terraform) —— 在 AWS / 阿里云等一键置备

## 验证安装

```bash
# 查看服务
systemctl status patroni pgbouncer
# 连接数据库
psql -h /var/run/postgresql -U dbuser_dba postgres -c '\l'
# 或用 TCP
psql "postgres://dbuser_dba@127.0.0.1/postgres"
```

## 下一步

安装完成后，继续 [个性化配置](/guide/config) 创建你的第一个业务用户和数据库。
