---
title: Security Hardening
description: TLS, certificates, passwords and auditing — tightening Pigsty for compliance
---

# Security Hardening

Pigsty turns on most security switches by default, but run through this checklist before going to production.

## Checklist

### 1. Rotate default passwords

- Grafana: `admin / pigsty` → set a strong password
- PostgreSQL superuser / `dbuser_dba` / pgBouncer / Patroni REST / etcd
- In `pigsty.yml` grep for `password:` and `_token:`

### 2. TLS

Pigsty ships a self-signed CA; enable TLS on PG:

```yaml [pigsty.yml]
vars:
  pg_ssl: true
  pg_default_hba_rules:
    - { user: all, db: all, addr: all, auth: scram-sha-256 }
```

Clients should connect with `sslmode=require`.

### 3. Least privilege

- Applications use `dbrole_readwrite` only — **never** grant `SUPERUSER`
- Read-only consumers use `dbrole_readonly`
- Analytics use `dbrole_offline`, routed to the replicas

### 4. Network isolation

- Firewall exposes only business ports (`5433`, `5434`, `6432`, `3000`)
- Bind management ports (ssh, patroni API, etcd) to the private IP
- INFRA nodes may live in a dedicated DMZ

### 5. Audit

Enable the audit extension:

```yaml [pigsty.yml]
pg_extensions:
  - { name: pgaudit }
pg_parameters:
  pgaudit.log: 'ddl,role'
```

### 6. Row-level security (optional)

For multi-tenant apps:

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON orders
  USING (tenant_id = current_setting('app.tenant')::int);
```

### 7. Backup encryption

pgBackRest supports AES-256 encryption:

```yaml [pigsty.yml]
pgbackrest_cipher_type: aes-256-cbc
pgbackrest_cipher_pass: '<strong-random>'
```

### 8. Stay current

Subscribe to the Pigsty [release feed](/docs/about/); apply PostgreSQL minor versions at least quarterly.

## Going deeper

- Concept: [Security design](/docs/concept/sec)
- Install-time security considerations: [/docs/setup/security](/docs/setup/security)
