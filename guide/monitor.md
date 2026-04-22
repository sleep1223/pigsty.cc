---
title: 监测
description: Grafana 面板、Prometheus 指标、告警与日志
---

# 监测

Pigsty 自带完整可观测性栈，装完就能看到所有东西。默认地址（单机模式）：

| 组件 | 地址 | 默认账号 |
| --- | --- | --- |
| Grafana | `http://<IP>:3000` | `admin / pigsty` |
| Prometheus | `http://<IP>:9090` | — |
| AlertManager | `http://<IP>:9093` | — |
| Loki (日志) | 内置于 Grafana 数据源 | — |

---

## Grafana 面板

登录后直接看 **Home → Dashboards**，按首字母分组：

- **PGSQL** —— Cluster / Instance / Database / Query / Session / Replication
- **PGCAT** —— 基于系统目录的表 / 索引 / 扩展详情
- **PGLOG** —— 慢日志分析
- **INFRA** —— Prometheus / Grafana / Loki 自身
- **NODE** —— CPU / 内存 / 磁盘 / 网络
- **REDIS / MINIO / ETCD** —— 对应模块面板

重点面板：

- `PGSQL Overview` —— 集群健康一眼
- `PGSQL Cluster` —— 主从延迟、TPS、连接数
- `PGSQL Instance` —— 单实例深度指标
- `PGSQL Query` —— 结合 `pg_stat_statements` 的慢查询
- `PGSQL Alert` —— 当前告警聚合

---

## 指标来源

| 来源 | 说明 |
| --- | --- |
| `pg_exporter` | PostgreSQL 600+ 指标（含自定义） |
| `node_exporter` | 主机指标 |
| `patroni` | HA 状态 |
| `haproxy` | 路由 / 健康 / 连接 |
| `pgbouncer_exporter` | 连接池指标 |

详见 [pg_exporter 模块](/docs/pg_exporter/)。

---

## 告警

告警规则预置在 Prometheus 里，位于各节点 `/etc/prometheus/rules/*.yml`。

常见默认告警：

- PostgreSQL 主库不可达
- 复制延迟超过阈值
- 连接数接近上限
- 磁盘使用率 > 85%
- pgBouncer 连接堆积

对接 Webhook / 钉钉 / 企业微信：修改 `alertmanager.yml` 的 `receivers` 段。

---

## 日志

- **PostgreSQL 日志** 通过 `promtail` 采集到 Loki
- Grafana → Explore → 选 Loki 数据源 → `{cluster="pg-meta"}` 即可查询
- 结构化日志 / 慢日志分析面板：`PGLOG Analysis`

---

## 更深入

- INFRA 模块：[/docs/infra/](/docs/infra/)
- pg_exporter：[/docs/pg_exporter/](/docs/pg_exporter/)
- 监控系统概念：[/docs/concept/monitor](/docs/concept/monitor)
