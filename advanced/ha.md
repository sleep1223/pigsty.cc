---
title: 高可用架构
description: Pigsty 如何用 Patroni + etcd + HAProxy 实现自动故障切换
---

# 高可用架构

## 组件分工

```text
┌──────────────────────────────────────┐
│   Application                        │
└──────────────────────────────────────┘
                │ 5433 / 5434
                ▼
┌──────────────────────────────────────┐
│   HAProxy  (路由 + 健康检查)          │
└──────────────────────────────────────┘
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
┌───────┐  ┌───────┐  ┌───────┐
│ PG-1  │  │ PG-2  │  │ PG-3  │
│主     │  │从     │  │从     │
│Patroni│  │Patroni│  │Patroni│
└───┬───┘  └───┬───┘  └───┬───┘
    │          │          │
    └──────────┴──────────┘
               │
          ┌────▼────┐
          │  etcd   │ (3/5 节点集群)
          └─────────┘
```

- **Patroni** —— 每个 PG 实例旁的守护进程，竞争 leader key，管理 PG 启停
- **etcd** —— 分布式锁与配置，记录当前主库
- **HAProxy** —— 监听 Patroni 健康接口，动态把 5433 指向当前主库

## 故障切换流程

1. 主库故障 / Patroni 进程失联
2. leader key TTL 到期
3. 健康从库竞争新的 leader key
4. 获胜者 `promote` 自己为新主
5. HAProxy 健康检查发现身份变化，更新路由
6. 应用端下一次连接自动打到新主

典型 RTO：**5-30 秒**（取决于 TTL、复制延迟、应用重连策略）。

## 手工切换

```bash
# 计划内切换（优雅）
patronictl -c /etc/patroni/patroni.yml switchover

# 强制故障转移
patronictl -c /etc/patroni/patroni.yml failover
```

或通过 Ansible 剧本：

```bash
./pgsql-reload.yml -l pg-meta -t primary
```

## VIP

除了 HAProxy，Pigsty 也提供可选的 VIP：

- **L2 VIP** —— 基于 keepalived + arp，要求同一二层网络
- **L3 VIP** —— 基于 DNS / BGP，适合跨网段

两者都可实现"对客户端完全透明"的主库迁移。详见 [NODE / VIP](/docs/node/).

## 脑裂与数据安全

Pigsty 采用 **同步复制 + 仲裁** 策略降低脑裂风险：

- `synchronous_commit = on` + `synchronous_standby_names`
- etcd 三节点仲裁 —— 少数派节点主动降级
- 新时间线检测 —— 见 [/docs/pgbackrest/](/docs/pgbackrest/)

## 更深入

- 概念：[高可用](/docs/concept/ha)
- Patroni 中文文档：[/docs/patroni/](/docs/patroni/)
- etcd 模块：[/docs/etcd/](/docs/etcd/)
