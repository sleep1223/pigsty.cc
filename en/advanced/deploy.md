---
title: Production Deployment
description: Planning, preparing and rolling out a multi-node Pigsty cluster
---

# Production Deployment

## Minimum production topology

| Role   | Node count | Notes                                          |
| ------ | ---------- | ---------------------------------------------- |
| INFRA  | 1–3        | Prometheus / Grafana / DNS / package repo      |
| ETCD   | 3 or 5     | DCS (must be odd)                              |
| PGSQL  | 3+         | 1 primary + 2 replicas (satisfies HA)          |

## Steps

1. **Plan** — read [architecture planning](/docs/deploy/planning) to decide node count, network zones, VIP strategy
2. **Prepare resources** — follow the [resource checklist](/docs/deploy/prepare) for hosts, SSH, disks, firewalls
3. **Deploy** — [production install](/docs/deploy/install)
4. **Validate in a sandbox** — use the [sandbox](/docs/deploy/sandbox) on Vagrant / VMs first
5. **Provision infrastructure (optional)** — [Vagrant](/docs/deploy/vagrant) or [Terraform](/docs/deploy/terraform)

## Recommended templates

Reuse one of the production-ready templates:

- `trio.yml` — three-node HA
- `full.yml` — full production template
- `safe.yml` — cross-AZ safety template
- See [config templates](/en/advanced/templates)

## Pre-launch checklist

- [ ] etcd — all three nodes healthy
- [ ] PG replication lag < 1s
- [ ] pgBackRest — first full backup complete
- [ ] Every Grafana dashboard has data
- [ ] Alert webhook verified end-to-end
- [ ] Performed one `patronictl switchover` drill
- [ ] Firewall exposes only the business ports
- [ ] All default passwords rotated

## Going deeper

- Full deployment manual: [/docs/deploy/](/docs/deploy/)
