---
title: Install
description: Bring up Pigsty on a Linux host with a single command
---

# Install

## Single-node quick install

On a Linux host, run:

```bash [install.sh]
# 1. Download & unpack the Pigsty source tarball
curl -fsSL https://repo.pigsty.cc/get | bash -s v4.2.2

cd ~/pigsty

# 2. Install Ansible and its dependencies
./bootstrap

# 3. Generate pigsty.yml with sensible defaults
./configure

# 4. Run the installation playbook
./install.yml
```

After 5–10 minutes Pigsty is up. Default endpoints:

- PostgreSQL 17 on port `5432`
- Grafana UI at `http://<IP>:3000` (default `admin / pigsty`)
- Prometheus at `http://<IP>:9090`
- MinIO console at `http://<IP>:9001`

## Common install modes

| Mode           | Best for                               | Read more                              |
| -------------- | -------------------------------------- | -------------------------------------- |
| **Standard**   | Single-node / sandbox / small prod     | [Single-node install](/docs/setup/install) |
| **Offline**    | Air-gapped environments, domestic OS   | [Offline mode](/docs/setup/offline)     |
| **Slim**       | Just PostgreSQL, no monitoring stack   | [Slim mode](/docs/setup/slim)           |
| **Multi-node** | Production HA                          | [Advanced → Deployment](/en/advanced/deploy) |

## Provisioning hosts via Vagrant / Terraform

Pigsty ships ready-to-use infrastructure templates:

- [Vagrant sandbox](/docs/deploy/vagrant) — multi-node VMs locally with one command
- [Terraform templates](/docs/deploy/terraform) — provision on AWS / Alibaba Cloud / etc.

## Verify

```bash [verify.sh]
# Check services
systemctl status patroni pgbouncer

# Connect via local Unix socket
psql -h /var/run/postgresql -U dbuser_dba postgres -c '\l'

# Or over TCP
psql "postgres://dbuser_dba@127.0.0.1/postgres"
```

## Next

Once installed, continue to [Configure](/en/guide/config) to create your first business user and database.
