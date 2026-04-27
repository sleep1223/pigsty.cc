---
title: 入门
description: 用最短路径跑起一套 Pigsty，并完成最常见的日常操作
---

# 入门指南

面向初次使用 Pigsty 的你。按下面的顺序跟做一遍，大约一个小时就能掌握最常见的日常操作。

## 学习路径

1. **[安装](/guide/install)** —— 在一台 Linux 机器上跑起 Pigsty
2. **[个性化配置](/guide/config)** —— 新建用户、新建数据库、修改实例参数
3. **[连接数据库](/guide/connect)** —— 用 psql / 应用程序接入
4. **[备份与恢复](/guide/backup)** —— 全量备份、PITR 时间点恢复
5. **[监测](/guide/monitor)** —— 查看 Grafana 面板、设置告警

## 前置条件

- 一台 Linux 机器（虚拟机或物理机皆可），1C / 2G 起步
- 支持的操作系统：EL 7/8/9、Debian 12、Ubuntu 22.04 / 24.04 等（完整列表见 [操作系统兼容](/docs/ref/linux)）
- root 或 sudo 权限
- 能访问外网下载软件包（离线安装见 [离线模式](/docs/setup/offline)）

## 面向谁

- **第一次装** PostgreSQL 生产环境的运维工程师
- 想把 PG 从 **云 RDS 迁回** 自有机房的团队
- 想在 **本地跑一套** 完整可观测数据库环境的开发者

准备好了？从 [安装](/guide/install) 开始。

---

## 常用命令速查

下面这些命令是日常运维 99% 的高频操作。按 **用途** 分四类记忆，遇到对应场景再查。

### 查看实例与集群

不知道当前装了哪些集群、哪台是主、复制延迟多少？先用这几条："看清现状"永远是排障第一步。

```bash
# 列出所有 PG 集群（在管理节点上执行）
pg list

# 查看指定集群成员状态：主从角色 / 时间线 / 复制延迟
pg list pg-meta
pg list pg-meta -W 5             # 每 5 秒刷新（watch）
pg list pg-meta -e               # 扩展信息（含 pending restart 等）
pg list pg-meta -f json          # JSON 输出，方便脚本消费

# 也可以直接用底层的 patronictl
patronictl -c /etc/patroni/patroni.yml list
patronictl -c /etc/patroni/patroni.yml topology   # 树形拓扑（含级联从库）

# 查看 Ansible inventory 里登记了哪些主机 / 集群
ansible-inventory --list --yaml      # 全量 dump
ansible-inventory --graph            # 按 group 树形展示
ansible all --list-hosts             # 只列主机
ansible pg-meta --list-hosts         # 列出某集群的成员

# 单机视角：看本机 PG 进程与服务
pig pg status
systemctl status patroni pgbouncer postgres
```

输出里 `Member` 名称带 `*` 表示该实例 **有未生效的配置变更，需要重启**。

> Grafana → **Home → Dashboards → PGSQL → Cluster / Instance** 也有同样信息的可视化版本。

### 集群生命周期 — `pg`

`pg` 是 Pigsty 的高级 CLI（实质是对 Ansible 剧本的封装），统一操作集群与实例。

```bash
# 重启整个 PG 集群（强制 / 不走滚动）
pg restart pgsql --force

# 滚动重启（默认行为，逐节点，主库放最后）
pg restart pgsql

# 重载 PostgreSQL 配置（无需重启）
pg reload pgsql

# 查看 / 修改集群配置（直接编辑 Patroni DCS 配置）
pg edit-config pgsql

# 主从切换（手动 failover / switchover）
pg switchover pgsql

# 在所有节点上重新生成 HBA / 服务定义
pg reload-hba pgsql
pg reload-service pgsql
```

> 完整子命令见 [pg CLI 参考](/docs/pig/) 与 [Patroni 管理](/docs/pgsql/admin/patroni)。

### 剧本编排 — `ansible-playbook`

`pg` 命令底层就是调用这些剧本。当你需要 **细粒度控制**（指定 tag / limit 到单台机器）时直接用剧本：

```bash
# 仅执行 pg_restart 步骤（重启 PostgreSQL 服务）
./pgsql.yml -t pg_restart

# 仅在某一台节点上执行
./pgsql.yml -l 10.10.10.11 -t pg_restart

# 仅刷新 HBA + 重载
./pgsql.yml -t pg_hba,pg_reload

# 重新加载 pgBouncer
./pgsql.yml -t pgbouncer_reload

# 移除集群（危险！清理数据目录）
./pgsql-rm.yml -l pg-meta
```

> 剧本与 tag 列表见 [部署细则 → 剧本](/docs/setup/playbook)。

### 单机服务 — `systemctl` / Ansible ad-hoc

跳过剧本直接管 systemd 服务：

```bash
# 在所有受管节点上 reload Patroni
ansible all -b -a 'systemctl reload patroni'

# 仅在某个集群上重启 pgBouncer
ansible pg-meta -b -a 'systemctl restart pgbouncer'

# 直接登服务器看状态
systemctl status patroni pgbouncer postgres
journalctl -u patroni -f
```

### 配置 / 备份 / 监控

```bash
# 重新生成 pigsty.yml（仅在改硬件 / IP 时用）
./configure

# 全量备份（在主库上执行）
pg-backup full

# 列出备份
pgbackrest --stanza=pg-meta info

# 检查所有集群成员健康
pg list
```

更详细的内容分别在 [备份恢复](/guide/backup) 与 [监测](/guide/monitor)。
