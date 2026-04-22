---
title: 安全加固
description: TLS、证书、密码、审计 —— 把 Pigsty 配到合规水平
---

# 安全加固

Pigsty 默认就开启了大多数安全选项，但生产上线前建议逐项核对。

## 清单

### 1. 修改默认密码

- Grafana：`admin / pigsty` → 改成强口令
- PostgreSQL 超级用户 / dbuser_dba / pgbouncer / patroni 接口 / etcd
- 在 `pigsty.yml` 中搜索 `password:` 与 `_token:`

### 2. TLS

Pigsty 内置自签 CA，启用 TLS：

```yaml [pigsty.yml]
vars:
  pg_ssl: true
  pg_default_hba_rules:
    - { user: all, db: all, addr: all, auth: scram-sha-256 }
```

客户端连接串加 `sslmode=require`。

### 3. 最小权限

- 应用账号只赋 `dbrole_readwrite`，**绝不** 给 `SUPERUSER`
- 只读账号用 `dbrole_readonly`
- 分析账号用 `dbrole_offline`，流量路由到只读副本

### 4. 网络隔离

- 防火墙只开业务端口（5433 / 5434 / 6432 / 3000）
- 管理端口（ssh、patroni API、etcd）绑定内网 IP
- INFRA 节点可单独放 DMZ

### 5. 审计

开启审计扩展：

```yaml [pigsty.yml]
pg_extensions:
  - { name: pgaudit }
pg_parameters:
  pgaudit.log: 'ddl,role'
```

### 6. 行级安全（可选）

对多租户业务：

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON orders USING (tenant_id = current_setting('app.tenant')::int);
```

### 7. 备份加密

pgBackRest 支持 AES-256 加密：

```yaml [pigsty.yml]
pgbackrest_cipher_type: aes-256-cbc
pgbackrest_cipher_pass: '<strong-random>'
```

### 8. 定期升级

订阅 Pigsty [发布公告](/docs/about/)；PostgreSQL 次版本建议每季度跟进。

## 更深入

- 概念：[安全设计](/docs/concept/sec)
- 安装时的安全考量：[/docs/setup/security](/docs/setup/security)
