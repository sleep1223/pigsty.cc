---
title: Comparison
description: Pigsty vs managed RDS, Kubernetes operators, and plain PostgreSQL
---

# Comparison

## Pigsty vs managed RDS

| Aspect            | Cloud-managed RDS         | Pigsty                              |
| ----------------- | ------------------------- | ----------------------------------- |
| Cost              | Pay-per-hour; expensive long-term | Pay hardware cost once |
| PostgreSQL version | Usually 6–18 months behind upstream | Tracks upstream; 17 by default |
| Extensions        | Dozens                    | 340+                                |
| Data sovereignty  | Subject to cloud provider | Fully in your hands                 |
| Customization     | Limited                   | Unlimited                           |
| Lock-in risk      | High                      | None                                |

## Pigsty vs Kubernetes operators (CloudNativePG, etc.)

| Aspect                  | K8s operator                   | Pigsty                     |
| ----------------------- | ------------------------------ | -------------------------- |
| Infrastructure assumption | Existing K8s cluster         | Bare metal / VMs           |
| Operational mindset     | Cloud-native / container scheduling | Traditional "pet" nodes |
| Monitoring stack        | Bring your own                 | Delivered by default       |
| Extension ecosystem     | Build your own image           | Precompiled, one-stop      |
| Best fit                | Short-lived, elastic databases | Long-running production DB |

## Pigsty vs plain PostgreSQL

Plain PostgreSQL is just a database process. In production you also need:

- A high-availability solution (Patroni + etcd)
- A connection pooler (pgBouncer)
- A load balancer (HAProxy)
- A backup tool (pgBackRest)
- Monitoring (Prometheus / Grafana / exporter)
- Logging, alerting, config management, …

**Pigsty = PostgreSQL + all of the above + opinionated wiring**, instead of making you glue the pieces yourself.
