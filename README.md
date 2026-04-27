# Pigsty Docs

Pigsty 中文文档站源码，基于 [VitePress](https://vitepress.dev/) 构建。

线上站点：https://sleep1223.github.io/pigsty.cc/ （由 GitHub Pages 部署）

## 本地开发

依赖：Node.js 22+、pnpm 10+。

```bash
pnpm install
pnpm dev       # 启动本地开发服务器
pnpm build     # 产物输出到 .vitepress/dist
pnpm preview   # 预览生产构建
```

## 目录结构

| 路径            | 说明                                   |
| --------------- | -------------------------------------- |
| `.vitepress/`   | VitePress 配置、主题、侧边栏           |
| `guide/`        | 快速上手与安装指南                     |
| `intro/`        | 项目介绍与业务场景                     |
| `modules/`      | 模块总览（PGSQL / Redis / Node 等）    |
| `docs/`         | 各模块管理与运维细节                   |
| `advanced/`     | 进阶主题                               |
| `reference/`    | 参考文档                               |
| `en/`           | 英文文档                               |
| `public/`       | 静态资源                               |
| `scripts/`      | 构建脚本                               |

## 部署

推送到 `vitepress` 分支会触发 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)，
经由 GitHub Actions 构建后发布到 GitHub Pages。Algolia DocSearch 索引在部署成功后由
[`.github/workflows/algolia-scraper.yml`](.github/workflows/algolia-scraper.yml) 更新，
需要在仓库 secrets 中配置 `ALGOLIA_APP_ID` / `ALGOLIA_WRITE_API_KEY` / `ALGOLIA_INDEX_NAME` 等。

## 远端

- `origin` &mdash; `git@github.com:sleep1223/pigsty.cc.git`（开发与部署）
- `upstream` &mdash; `git@github.com:pgsty/pigsty.cc.git`（上游参考）

## License

文档内容遵循 Pigsty 项目对应的开源许可。
