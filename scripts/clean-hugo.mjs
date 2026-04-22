#!/usr/bin/env node
// Clean Hugo shortcodes and dead links from copied docs.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('../docs/', import.meta.url).pathname

const COLOR_MAP = {
  info: 'tip', primary: 'tip', success: 'tip',
  warning: 'warning', secondary: 'info',
  danger: 'danger',
}

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) out.push(...walk(full))
    else if (entry.endsWith('.md')) out.push(full)
  }
  return out
}

function clean(src) {
  let out = src

  // {{% alert title="X" color="Y" %}} ... {{% /alert %}}
  out = out.replace(
    /\{\{%\s*alert([^%]*)%\}\}([\s\S]*?)\{\{%\s*\/alert\s*%\}\}/g,
    (_, attrs, body) => {
      const title = (attrs.match(/title="([^"]*)"/) || [, ''])[1]
      const color = (attrs.match(/color="([^"]*)"/) || [, 'info'])[1]
      const kind = COLOR_MAP[color] || 'tip'
      const head = title ? ` ${title}` : ''
      return `\n::: ${kind}${head}\n${body.trim()}\n:::\n`
    },
  )

  // {{< tabpane ... >}} ... {{< /tabpane >}}  — drop wrapper, keep inner
  out = out.replace(/\{\{<\s*\/?tabpane[^}]*>\}\}/g, '')

  // {{% tab header="X" %}} ... {{% /tab %}}  or self-closing {{% tab .. /%}}
  out = out.replace(
    /\{\{%\s*tab\s+([^%]*?)\s*\/?%\}\}/g,
    (_, attrs) => {
      const header = (attrs.match(/header="([^"]*)"/) || [, ''])[1]
      const disabled = /disabled=true/.test(attrs)
      if (!header) return ''
      return `\n#### ${header}${disabled ? ' _(示例)_' : ''}\n`
    },
  )
  out = out.replace(/\{\{%\s*\/tab\s*%\}\}/g, '')

  // {{< cardpane >}} / {{< /cardpane >}}
  out = out.replace(/\{\{<\s*\/?cardpane\s*>\}\}/g, '')

  // {{< card header="..." title="..." ... >}} ... {{< /card >}}
  out = out.replace(
    /\{\{<\s*card\s+([^>]*?)>\}\}([\s\S]*?)\{\{<\s*\/card\s*>\}\}/g,
    (_, attrs, body) => {
      const title = (attrs.match(/title="([^"]*)"/) || [, ''])[1]
      const subtitle = (attrs.match(/subtitle="([^"]*)"/) || [, ''])[1]
      const head = [title, subtitle].filter(Boolean).join(' — ')
      return `\n**${head}**\n\n${body.trim()}\n`
    },
  )

  // {{< readfile file="X" ... >}}  → note with link
  out = out.replace(
    /\{\{<\s*readfile\s+([^>]*?)>\}\}/g,
    (_, attrs) => {
      const file = (attrs.match(/file="([^"]*)"/) || [, ''])[1]
      return `\n> 📄 引用文件：\`${file}\`（详见源仓库）\n`
    },
  )

  // Remaining unknown shortcodes: strip line containing just `{{< ... >}}` or `{{% ... %}}`
  out = out.replace(/\{\{<[^}]*>\}\}/g, '')
  out = out.replace(/\{\{%[^%]*%\}\}/g, '')

  // Dead /ext/ links → pigsty.cc absolute
  out = out.replace(/\]\(\/ext\//g, '](https://pigsty.cc/ext/')
  // /blog links → pigsty.cc absolute
  out = out.replace(/\]\(\/blog(?=[/)])/g, '](https://pigsty.cc/blog')

  return out
}

const files = walk(ROOT)
let changed = 0
for (const f of files) {
  const src = readFileSync(f, 'utf8')
  const out = clean(src)
  if (out !== src) {
    writeFileSync(f, out)
    changed++
  }
}
console.log(`cleaned ${changed}/${files.length} files`)
