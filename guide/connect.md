---
title: 连接数据库
description: 使用 psql、pgBouncer、VIP、DNS 等多种方式接入 Pigsty 集群
---

# 连接数据库

Pigsty 默认暴露 **五种服务端点**，针对不同使用场景：

| 服务 | 端口 | 用途 |
| --- | --- | --- |
| `primary` | 5433 | 读写，自动指向主库 |
| `replica` | 5434 | 只读，读流量分发到所有副本 |
| `default` | 5436 | 直连 primary（不经 pgBouncer） |
| `offline` | 5438 | 离线分析专用 |
| `pgbouncer` | 6432 | 连接池入口 |

HAProxy 自动维护后端健康检查，主库切换对客户端透明。

---

## psql 命令行

```bash
# 本地 Unix socket（最快）
psql postgres

# TCP + 密码
psql "postgres://dbuser_app:password@10.10.10.10:5433/app_main"

# 只读副本
psql "postgres://dbuser_ro:password@10.10.10.10:5434/app_main"
```

## 应用程序连接串

**Java / HikariCP**：
```properties [hikari.properties]
jdbc.url=jdbc:postgresql://pg-meta:5433/app_main
db.user=dbuser_app
db.password=********
```

**Go / pgx**：
```go
dsn := "postgres://dbuser_app:***@pg-meta:5433/app_main?sslmode=require"
```

**Node.js / node-postgres**：
```js
new Pool({ host: 'pg-meta', port: 5433, user: 'dbuser_app', database: 'app_main' })
```

推荐在应用端连 `pgBouncer`（端口 **6432**）以获得连接复用：

```text
postgres://dbuser_app:***@pg-meta:6432/app_main
```

## 域名 / VIP 接入

Pigsty 默认把集群名（如 `pg-meta`）注册到内置 DNS，指向 VIP。应用端只需使用集群名，不用感知具体节点 IP。

- L2 VIP：需要同一网段 / 交换机支持
- DNS：适合 L3 跨网络
- 详见 [NODE / VIP](/docs/node/)

## 密码与 `.pgpass`

为避免在命令行裸露密码，可写入 `~/.pgpass`：

```text [~/.pgpass]
10.10.10.10:5433:app_main:dbuser_app:password
```

```bash
chmod 600 ~/.pgpass
```

## 更深入

- 服务接入架构：[/docs/pgsql/misc/svc](/docs/pgsql/misc/svc)
- pgBouncer 池化模式：[/docs/pgbouncer/](/docs/pgbouncer/)
- HAProxy 路由：[/docs/node/](/docs/node/)
