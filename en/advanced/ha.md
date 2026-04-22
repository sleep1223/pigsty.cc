---
title: HA Architecture
description: How Pigsty achieves automatic failover with Patroni + etcd + HAProxy
---

# HA Architecture

## Roles

```text
┌──────────────────────────────────────┐
│   Application                        │
└──────────────────────────────────────┘
                │ 5433 / 5434
                ▼
┌──────────────────────────────────────┐
│   HAProxy  (routing + health checks) │
└──────────────────────────────────────┘
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
┌───────┐  ┌───────┐  ┌───────┐
│ PG-1  │  │ PG-2  │  │ PG-3  │
│primary│  │replica│  │replica│
│Patroni│  │Patroni│  │Patroni│
└───┬───┘  └───┬───┘  └───┬───┘
    │          │          │
    └──────────┴──────────┘
               │
          ┌────▼────┐
          │  etcd   │ (3 / 5 nodes)
          └─────────┘
```

- **Patroni** — a sidecar on every PG instance; it competes for the leader key and manages PG start/stop
- **etcd** — distributed lock + config store; records the current primary
- **HAProxy** — tracks Patroni's health endpoint and dynamically points `5433` at the live primary

## Failover flow

1. The primary fails or Patroni loses contact
2. The leader key's TTL expires
3. Healthy replicas race for the new leader key
4. The winner promotes itself as the new primary
5. HAProxy's health check picks up the role change and updates routing
6. The next client connection lands on the new primary

Typical RTO: **5–30 seconds** depending on TTL, replication lag and client reconnect behaviour.

## Manual switchover

```bash
# Graceful planned switchover
patronictl -c /etc/patroni/patroni.yml switchover

# Forced failover
patronictl -c /etc/patroni/patroni.yml failover
```

Or via the Ansible playbook:

```bash
./pgsql-reload.yml -l pg-meta -t primary
```

## VIP

In addition to HAProxy, Pigsty optionally provides a VIP:

- **L2 VIP** — keepalived + ARP; requires a shared L2 network
- **L3 VIP** — DNS / BGP; suitable for cross-subnet deployments

Both make the primary-role switch transparent to the client. See [NODE / VIP](/docs/node/).

## Split-brain and data safety

Pigsty uses **synchronous replication + quorum** to reduce split-brain risk:

- `synchronous_commit = on` + `synchronous_standby_names`
- etcd's three-node quorum — minority partitions step down on their own
- Timeline detection — see [/docs/pgbackrest/](/docs/pgbackrest/)

## Going deeper

- Concept: [High availability](/docs/concept/ha)
- Patroni: [/docs/patroni/](/docs/patroni/)
- etcd module: [/docs/etcd/](/docs/etcd/)
