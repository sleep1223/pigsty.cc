---
title: 配置模板
description: Pigsty 自带 40+ 现成配置模板，按场景挑选
---

# 配置模板

Pigsty 在 `conf/` 目录下提供大量现成模板 —— 直接 `cp conf/xxx.yml pigsty.yml` 就能跑。

## 单机模板

| 模板 | 资源要求 | 场景 |
| --- | --- | --- |
| `meta.yml` | 1C/2G | 最小沙箱 |
| `slim.yml` | 1C/2G | 只要 PG，没有监控 |
| `rich.yml` | 4C/8G | 单机全功能 |
| `fat.yml`  | 8C/16G | 单机重负载 |
| `infra.yml` | — | 仅 INFRA 组件 |
| `vibe.yml` | — | AI 开发沙箱 |

## HA 模板

| 模板 | 节点数 | 说明 |
| --- | --- | --- |
| `trio.yml` | 3 | 基础 HA |
| `dual.yml` | 2 | 主 + 备（无仲裁） |
| `full.yml` | 4+ | 完整生产 |
| `safe.yml` | 跨机房 | 强一致 / 同步复制 |
| `simu.yml` | 模拟 | 故障演练用 |

## 内核变体

| 模板 | 内核 |
| --- | --- |
| `pgsql.yml` | 原生 PostgreSQL |
| `citus.yml` | Citus 分布式 |
| `mssql.yml` | MSSQL 兼容模式 |
| `polar.yml` | PolarDB |
| `agens.yml` | AgensGraph |

## 应用模板

对接常见开源应用，`conf/app/` 下提供即开即用的 Compose：

- Supabase, Metabase, Superset
- Odoo, NocoDB, Directus
- Dify, Langfuse, Mastra
- Gitea, Harbor, Keycloak
- ……

完整清单：[/docs/app/](/docs/app/) 与 [/docs/conf/](/docs/conf/)

## 选模板的思路

```text
你有几台机器？
├── 1 台 → meta / rich / fat / slim
├── 2 台 → dual
├── 3 台 → trio（推荐起点）
└── 4+ 台 → full / safe
```

然后再看是否需要切换内核（citus / polar / mssql）或叠加应用（app/*.yml）。
