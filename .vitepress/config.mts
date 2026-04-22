import { defineConfig } from 'vitepress'
import { sectionGroup, sectionItems } from './sidebar'

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

// 参考
const referenceSidebar = [
  { text: '参考概览', link: '/reference/' },
  sectionGroup('ref', '参考手册'),
  sectionGroup('conf', '配置模板库'),
  sectionGroup('repo', '软件源'),
  sectionGroup('about', '关于 Pigsty'),
  sectionGroup('concept', '核心概念'),
  sectionGroup('setup', '安装细则'),
  sectionGroup('deploy', '部署细则'),
]

// ---------------- 配置 ----------------

export default defineConfig({
  title: 'Pigsty',
  description: '开箱即用、本地优先的 PostgreSQL 发行版 —— 开源 RDS 替代方案',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

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
          { text: '高级', link: '/advanced/', activeMatch: '^/advanced/' },
          { text: '模块', link: '/modules/', activeMatch: '^/(modules|docs)/' },
          { text: '参考', link: '/reference/', activeMatch: '^/reference/' },
        ],
        sidebar: {
          '/intro/': introSidebar,
          '/guide/': guideSidebar,
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
          { text: 'Intro', link: '/en/' },
        ],
        sidebar: {
          '/en/': [
            { text: 'English docs', link: '/en/' },
          ],
        },
      },
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Pigsty',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pgsty/pigsty' },
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '无匹配结果',
                resetButtonTitle: '清除查询',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
        },
      },
    },
  },
})
