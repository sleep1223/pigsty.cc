---
title: 生产部署
description: 多节点生产环境的规划、准备与上线
---

# 生产部署

## 最小生产拓扑

| 角色 | 节点数 | 说明 |
| --- | --- | --- |
| INFRA | 1-3 | Prometheus / Grafana / DNS / 软件源 |
| ETCD | 3 / 5 | DCS（必须奇数） |
| PGSQL | 3 起 | 1 主 + 2 从（满足 HA） |

## 步骤

1. **规划** —— 阅读 [架构规划](/docs/deploy/planning) 决定节点数、网络分区、VIP 方案
2. **资源准备** —— 按 [资源准备清单](/docs/deploy/prepare) 准备机器、SSH、磁盘、防火墙
3. **执行部署** —— [正式部署](/docs/deploy/install)
4. **沙箱验证** —— [沙箱环境](/docs/deploy/sandbox) 先在 Vagrant / VM 上跑通
5. **基础设施置备（可选）** —— [Vagrant](/docs/deploy/vagrant) 或 [Terraform](/docs/deploy/terraform)

## 推荐配置模板

生产场景可直接复用现成模板：

- `trio.yml` —— 三节点 HA
- `full.yml` —— 完整生产模板
- `safe.yml` —— 跨机房安全模板
- 详见 [配置模板](/advanced/templates)

## 上线前检查

- [ ] etcd 三节点健康
- [ ] PG 主从复制延迟 < 1s
- [ ] pgBackRest 首次全量完成
- [ ] Grafana 面板都有数据
- [ ] 告警 Webhook 验证过一次
- [ ] 手工演练过一次 `patronictl switchover`
- [ ] 防火墙只开业务端口
- [ ] 默认密码全部修改

## 更深入

- 完整部署手册：[/docs/deploy/](/docs/deploy/)
