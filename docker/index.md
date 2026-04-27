---
title: Docker 入门
description: 用 Docker 在 macOS / Windows 上学习 Pigsty —— 单机起步，进阶到多容器集群、扩缩容、主从同步
---

# Docker

> Docker 不是 Pigsty 的目标运行环境，**正式生产请用原生 Linux**。
> 这一节面向 **学习者**：你只想用一台 Mac / Windows 笔记本，把 Pigsty 的玩法整明白。

容器化模式的好处：

- 5 分钟拉起一套带 systemd 的"完整 Linux 节点"
- 想 reset 就 `make purge`，不会污染宿主机
- 可以同时跑 **多个容器** 模拟真实多节点集群，体验 HA / 主从切换

## 学习路径

| 阶段 | 你要做的事 | 文档 |
| --- | --- | --- |
| 1. 拉起单机 | 跑通 `make launch`，进容器，看 Grafana | [快速开始](#快速开始) |
| 2. 熟悉 CLI | 了解 `pg`、剧本、systemctl 三层关系 | [入门 → 常用命令](/guide/#常用命令速查) |
| 3. 多节点集群 | 起 3 容器模拟生产 | [多容器集群](#多容器集群) |
| 4. 扩缩容 | 在线增删从库 / 节点 | [扩容与缩容](#扩容与缩容) |
| 5. 主从同步 | 观察流复制，触发 failover | [主从同步与切换](#主从同步与切换) |
| 6. 进入生产 | 切回原生 Linux 部署 | [高级 → 生产部署](/advanced/deploy) |

---

## 快速开始

```bash
# 拉源码
curl -fsSL https://repo.pigsty.cc/get | bash -s v4.2.2 && cd ~/pigsty/docker

# 启动容器 + 生成配置 + 部署（一条命令搞定）
make launch

# 查看密码
make pass | grep -E 'grafana_admin_password|pg_admin_password'

# 进入容器
make exec       # 等价 docker exec -it pigsty bash
```

打开浏览器访问 `http://localhost:8080`（Web 入口）和 `http://localhost:8080/ui`（Grafana），
用 `psql 'postgres://dbuser_dba:<password>@localhost:5432/postgres'` 连库。

> 端口冲突 / 镜像源 / 详细原理见 [Docker 部署细则](/docs/setup/docker)。

---

## 集群叫什么名字？—— `pgsql` vs `pg-meta`

很多教程里你会看到 `pg list pg-meta`、`pg restart pg-meta`，到 Docker 环境就报"没有这个集群"。
原因不是命令变了，而是 **集群名变了**：`pg list <cls>` 里的 `<cls>` 取自 inventory 中 `pg_cluster:` 的值，
不同 [配置模板](/docs/conf/) 的默认值不一样：

| 模板 | `./configure -c <模板>` | 默认集群名 |
| --- | --- | --- |
| `meta` / `full` / `dual` / `trio` | 标准沙箱 / 生产 | `pg-meta`（常常还有第二个 `pg-test`） |
| **`docker`** | **本节使用的容器模板** | **`pgsql`** |
| `slim` / `demo` / 自定义 | 各种 | 模板里写什么就是什么 |

证据：[`conf/docker.yml`](https://github.com/pgsty/pigsty/blob/main/conf/docker.yml) 第一行就是

```yaml
pgsql: { hosts: { 10.10.10.10: { pg_seq: 1, pg_role: primary }}, vars: { pg_cluster: pgsql }}
```

所以在容器里你应该用：

```bash
pg list                     # 不带参数 —— 永远先用这个看清楚
pg list pgsql               # 容器里就是 pgsql
pg restart pgsql --force    # 同理
pg edit-config pgsql
```

文档示例里的 `pg-meta` 改成 `pgsql` 即可。想确认你这台机器叫什么：

```bash
pg list                                                     # 最直接
grep -E '^\s{2,4}[a-zA-Z][a-zA-Z0-9_-]*:' ~/pigsty/pigsty.yml | grep -v hosts
ansible-inventory --graph
```

> Docker 模板故意挑了一个 *与模板同名、不带连字符* 的 generic 名字 `pgsql`，避免新手把 `pg-meta` 误当成 Pigsty 的保留字。生产模板沿用 `pg-meta` 是表达 "这是放元数据 CMDB 的那一组" 的 **用途约定**，并不是必须。

---

## 容器内的常用动作

进入容器后，所有命令和原生 Linux **一模一样**，可以直接复用 [入门 → 常用命令速查](/guide/#常用命令速查) 里的所有内容：

```bash
make exec              # 进入容器
cd ~/pigsty

pg list                # 查所有集群状态（看主从、复制延迟）
pg list pg-meta        # 单看某个集群
pg edit-config pgsql   # 编辑 Patroni 配置
./pgsql.yml -t pg_restart    # 仅重启 PG
systemctl status patroni
```

> 如果你想把容器当一台普通 Linux SSH 进去，用 `make ssh`（密码 `pigsty`）。

---

## 多容器集群

单容器只能体验"装得上"，要看 **HA / 主从切换** 至少需要 3 个节点（1 主 + 1 从 + 1 仲裁）。
官方 `docker/` 目录下有现成的 `compose.yml`，把节点数调到 3 即可：

```yaml [docker/compose.yml]
services:
  pg-1:
    image: pgsty/pigsty:v4.2.2
    privileged: true
    hostname: pg-1
    networks: [pigsty]
    ports: ["2222:22", "8080:80", "5432:5432"]

  pg-2:
    image: pgsty/pigsty:v4.2.2
    privileged: true
    hostname: pg-2
    networks: [pigsty]

  pg-3:
    image: pgsty/pigsty:v4.2.2
    privileged: true
    hostname: pg-3
    networks: [pigsty]

networks:
  pigsty:
    driver: bridge
```

启动并配置：

```bash
docker compose up -d

# 进入第一个节点（管理节点）
docker exec -it pg-1 bash

# 在 pigsty.yml 里登记三台节点的内部 IP
docker inspect -f '{{.NetworkSettings.Networks.pigsty.IPAddress}}' pg-1 pg-2 pg-3
```

参考 [配置模板库](/docs/conf/) 里的 `dual.yml` / `trio.yml` / `full.yml`，
把对应模板复制成 `pigsty.yml` 填上 IP，再 `./install.yml` 一把梭。

> 真要在 Docker 里跑 HA 需要 **同一 bridge 网络** + **systemd 特权容器**，etcd 单点也要起在某个容器内。生产仍推荐物理机或 VM。

---

## 扩容与缩容

Pigsty 把"扩缩容"也做成了剧本。下面是在多容器场景里的玩法。

### 加一个从库

```bash
# 1. 在 pigsty.yml 中给集群追加一台节点
pg-meta:
  hosts:
    10.10.10.10: { pg_seq: 1, pg_role: primary }
    10.10.10.11: { pg_seq: 2, pg_role: replica }
    10.10.10.12: { pg_seq: 3, pg_role: replica }   # 新增

# 2. 仅对新节点跑剧本
./node.yml  -l 10.10.10.12
./pgsql.yml -l 10.10.10.12
```

剧本会自动调用 Patroni / pgBackRest，从主库 basebackup 拉数据并加入复制流。

### 移除一个从库

```bash
./pgsql-rm.yml -l 10.10.10.12
```

清理完后从 `pigsty.yml` 中删掉对应条目即可。

> 详细字段含义见 [配置 → 集群参数](/guide/config) 与 [HA 架构](/advanced/ha)。

---

## 主从同步与切换

### 看流复制状态

```sql
-- 主库
SELECT application_name, state, sync_state,
       pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) AS lag_bytes
FROM   pg_stat_replication;
```

```bash
# 或用 patronictl
patronictl -c /etc/patroni/patroni.yml list
```

Grafana 的 **PGSQL Replication** 面板会实时画出 lag，建议拉起后立即打开看一眼。

### 手动主从切换

```bash
# 计划内切换：选一台从库提为新主
pg switchover pgsql

# 故意让主挂掉看 Patroni 自动 failover
docker stop pg-1
# 观察 pg-2 被推选为新主，VIP 自动漂移
```

切回去：

```bash
docker start pg-1
# pg-1 自动作为从库重新加入集群（pg_rewind）
```

更深的原理（Raft 选主、复制槽、Synchronous Standby）见 [高可用架构](/advanced/ha)。

---

## 清理

学完了想抹干净：

```bash
make purge      # 删掉所有容器 + ./data 目录（会二次确认）
```

---

## 下一步

- 想把 Docker 学到的搬到生产 → [高级 → 生产部署](/advanced/deploy)
- 想配 Vagrant 多 VM 沙箱（更接近真机） → [Vagrant 沙箱](/docs/deploy/vagrant)
- 模块层细节（DOCKER 模块自身怎么部署） → [模块：DOCKER](/docs/docker/)
