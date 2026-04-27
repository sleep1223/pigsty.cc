import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { sectionGroup, sectionItems } from './sidebar'

const algoliaAppId = process.env.ALGOLIA_APP_ID
const algoliaSearchKey = process.env.ALGOLIA_SEARCH_API_KEY
const algoliaIndexName = process.env.ALGOLIA_INDEX_NAME
const algoliaAssistantId = process.env.ALGOLIA_ASSISTANT_ID

const localeZh = {
  placeholder: '搜索文档',
  translations: {
    button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
    modal: {
      searchBox: {
        resetButtonTitle: '清除查询条件',
        resetButtonAriaLabel: '清除查询条件',
        cancelButtonText: '取消',
        cancelButtonAriaLabel: '取消',
      },
      startScreen: {
        recentSearchesTitle: '搜索历史',
        noRecentSearchesText: '没有搜索历史',
        saveRecentSearchButtonTitle: '保存至搜索历史',
        removeRecentSearchButtonTitle: '从搜索历史中移除',
        favoriteSearchesTitle: '收藏',
        removeFavoriteSearchButtonTitle: '从收藏中移除',
      },
      errorScreen: { titleText: '无法获取结果', helpText: '你可能需要检查你的网络连接' },
      footer: { selectText: '选择', navigateText: '切换', closeText: '关闭', searchByText: '搜索提供者' },
      noResultsScreen: {
        noResultsText: '无匹配结果',
        suggestedQueryText: '尝试搜索',
        reportMissingResultsText: '认为这条查询应该有结果？',
        reportMissingResultsLinkText: '点此反馈',
      },
    },
  },
}

const search: DefaultTheme.Config['search'] = algoliaAppId && algoliaSearchKey && algoliaIndexName
  ? {
      provider: 'algolia',
      options: {
        appId: algoliaAppId,
        apiKey: algoliaSearchKey,
        indexName: algoliaIndexName,
        ...(algoliaAssistantId
          ? {
              mode: 'hybrid' as const,
              askAi: {
                assistantId: algoliaAssistantId,
                agentStudio: true,
                sidePanel: true,
              },
            }
          : {}),
        locales: { root: localeZh },
      },
    }
  : {
      provider: 'local',
      options: { locales: { root: { translations: localeZh.translations } } },
    }

// ---------------- Sidebars (one per top-level category) ----------------

// 介绍 —— flat list, no outer grouping
const introSidebar = [
  { text: '认识 Pigsty', link: '/intro/' },
  { text: '功能特性', link: '/intro/features' },
  { text: '业务场景', link: '/intro/scenarios' },
  { text: '同类对比', link: '/intro/compare' },
]

// 入门 —— 用户要求的简化顺序
const guideSidebar = [
  { text: '入门概览', link: '/guide/' },
  { text: '安装', link: '/guide/install' },
  { text: '个性化配置', link: '/guide/config' },
  { text: '连接数据库', link: '/guide/connect' },
  { text: '备份恢复', link: '/guide/backup' },
  { text: '监测', link: '/guide/monitor' },
]

// 高级
const advancedSidebar = [
  { text: '高级概览', link: '/advanced/' },
  { text: '生产部署', link: '/advanced/deploy' },
  { text: '高可用架构', link: '/advanced/ha' },
  { text: '安全加固', link: '/advanced/security' },
  { text: '配置模板', link: '/advanced/templates' },
  { text: '扩展管理', link: '/advanced/extensions' },
]

// 模块 —— 每个模块作为可折叠小节，其内部条目由 sidebar.ts 从 frontmatter 读出
const modulesSidebar = [
  { text: '模块总览', link: '/modules/' },
  { text: '核心', collapsed: false, items: [
    sectionGroup('pgsql', 'PGSQL'),
    sectionGroup('patroni', 'Patroni'),
    sectionGroup('pgbouncer', 'pgBouncer'),
    sectionGroup('pgbackrest', 'pgBackRest'),
    sectionGroup('pg_exporter', 'pg_exporter'),
  ]},
  { text: '基础设施', collapsed: true, items: [
    sectionGroup('infra', 'INFRA'),
    sectionGroup('node', 'NODE'),
    sectionGroup('etcd', 'ETCD'),
    sectionGroup('minio', 'MINIO'),
    sectionGroup('docker', 'DOCKER'),
  ]},
  { text: '扩展数据服务', collapsed: true, items: [
    sectionGroup('redis', 'REDIS'),
    sectionGroup('ferret', 'FERRET'),
    sectionGroup('juice', 'JUICE'),
  ]},
  { text: '工具', collapsed: true, items: [
    sectionGroup('pig', 'pig'),
    sectionGroup('piglet', 'piglet'),
    sectionGroup('vibe', 'vibe'),
    sectionGroup('pilot', 'pilot'),
  ]},
  { text: '应用模板', collapsed: true, items: [
    sectionGroup('app', '应用模板'),
  ]},
]

// Docker —— 本地学习专用入口
const dockerSidebar = [
  { text: 'Docker 入门', link: '/docker/' },
  { text: '相关阅读', collapsed: false, items: [
    { text: '安装：Docker 步骤', link: '/guide/install#docker-安装步骤' },
    { text: '入门：常用命令速查', link: '/guide/#常用命令速查' },
    { text: '高可用架构', link: '/advanced/ha' },
    { text: '模块：DOCKER', link: '/docs/docker/' },
    { text: '部署细则：Docker', link: '/docs/setup/docker' },
  ]},
]

// 参考 —— 按用途分组：先"日常查"，再"安装/部署细则"，最后"背景资料"
const referenceSidebar = [
  { text: '参考概览', link: '/reference/' },
  { text: '日常速查', collapsed: false, items: [
    sectionGroup('ref', '参考手册'),
    sectionGroup('conf', '配置模板库'),
    sectionGroup('repo', '软件源'),
  ]},
  { text: '安装与部署细则', collapsed: false, items: [
    sectionGroup('setup', '安装细则'),
    sectionGroup('deploy', '部署细则'),
  ]},
  { text: '背景资料', collapsed: true, items: [
    sectionGroup('concept', '核心概念'),
    sectionGroup('about', '关于 Pigsty'),
  ]},
]

// ---------------- 配置 ----------------

export default defineConfig({
  title: 'Pigsty',
  description: '开箱即用、本地优先的 PostgreSQL 发行版 —— 开源 RDS 替代方案',
  lang: 'zh-CN',
  base: '/pigsty.cc/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    lineNumbers: true,
    languageAlias: {
      promql: 'bash',
      prometheus: 'yaml',
      haproxy: 'ini',
      math: 'text',
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#3E668F' }],
  ],

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '介绍', link: '/intro/', activeMatch: '^/intro/' },
          { text: '入门', link: '/guide/', activeMatch: '^/guide/' },
          { text: 'Docker', link: '/docker/', activeMatch: '^/docker/' },
          { text: '高级', link: '/advanced/', activeMatch: '^/advanced/' },
          { text: '模块', link: '/modules/', activeMatch: '^/(modules|docs)/' },
          { text: '参考', link: '/reference/', activeMatch: '^/reference/' },
        ],
        sidebar: {
          '/intro/': introSidebar,
          '/guide/': guideSidebar,
          '/docker/': dockerSidebar,
          '/advanced/': advancedSidebar,
          '/modules/': modulesSidebar,
          '/docs/': modulesSidebar,
          '/reference/': referenceSidebar,
        },
        editLink: {
          pattern: 'https://github.com/sleep1223/pigsty.cc/edit/main/:path',
          text: '在 GitHub 上编辑此页',
        },
        footer: {
          message: '基于 AGPL 3.0 协议发布',
          copyright: 'Copyright © 2018-present Pigsty',
        },
        outline: { level: [2, 3], label: '本页目录' },
        docFooter: { prev: '上一篇', next: '下一篇' },
        lastUpdatedText: '最后更新',
        darkModeSwitchLabel: '主题',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '目录',
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Intro', link: '/en/intro/', activeMatch: '^/en/intro/' },
          { text: 'Guide', link: '/en/guide/', activeMatch: '^/en/guide/' },
          { text: 'Advanced', link: '/en/advanced/', activeMatch: '^/en/advanced/' },
          { text: 'Modules', link: '/en/modules/', activeMatch: '^/en/modules/' },
          { text: 'Reference', link: '/en/reference/', activeMatch: '^/en/reference/' },
        ],
        sidebar: {
          '/en/intro/': [
            { text: 'Meet Pigsty', link: '/en/intro/' },
            { text: 'Features', link: '/en/intro/features' },
            { text: 'Use Cases', link: '/en/intro/scenarios' },
            { text: 'Comparison', link: '/en/intro/compare' },
          ],
          '/en/guide/': [
            { text: 'Overview', link: '/en/guide/' },
            { text: 'Install', link: '/en/guide/install' },
            { text: 'Configure', link: '/en/guide/config' },
            { text: 'Connect', link: '/en/guide/connect' },
            { text: 'Backup & Restore', link: '/en/guide/backup' },
            { text: 'Monitor', link: '/en/guide/monitor' },
          ],
          '/en/advanced/': [
            { text: 'Overview', link: '/en/advanced/' },
            { text: 'Production Deployment', link: '/en/advanced/deploy' },
            { text: 'HA Architecture', link: '/en/advanced/ha' },
            { text: 'Security Hardening', link: '/en/advanced/security' },
            { text: 'Config Templates', link: '/en/advanced/templates' },
            { text: 'Extension Management', link: '/en/advanced/extensions' },
          ],
          '/en/modules/': [
            { text: 'Module Overview', link: '/en/modules/' },
            { text: '(Module deep-dives are in Chinese; see /docs/)', link: '/docs/' },
          ],
          '/en/reference/': [
            { text: 'Reference', link: '/en/reference/' },
          ],
        },
        editLink: {
          pattern: 'https://github.com/sleep1223/pigsty.cc/edit/main/:path',
          text: 'Edit this page on GitHub',
        },
        footer: {
          message: 'Released under the AGPL 3.0 License',
          copyright: 'Copyright © 2018-present Pigsty',
        },
        outline: { level: [2, 3], label: 'On this page' },
        docFooter: { prev: 'Previous', next: 'Next' },
        lastUpdatedText: 'Last updated',
        darkModeSwitchLabel: 'Appearance',
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
      },
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Pigsty',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pgsty/pigsty' },
    ],
    search,
  },
})
