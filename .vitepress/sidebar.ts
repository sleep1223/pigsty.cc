import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import matter from 'gray-matter'

const DOCS_ROOT = resolve(__dirname, '..', 'docs')

type Item = { text: string; link: string; weight: number }

function readMeta(file: string): { title?: string; weight?: number } {
  try {
    const raw = readFileSync(file, 'utf8')
    const fm = matter(raw).data as Record<string, unknown>
    return {
      title: typeof fm.title === 'string' ? fm.title : undefined,
      weight: typeof fm.weight === 'number' ? fm.weight : undefined,
    }
  } catch {
    return {}
  }
}

function titleize(slug: string) {
  return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/** Collect .md files inside a section folder, honoring `weight:` frontmatter. */
export function sectionItems(section: string): Item[] {
  const dir = join(DOCS_ROOT, section)
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return []
  }

  const items: Item[] = []
  for (const entry of entries) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) {
      const idx = join(full, 'index.md')
      try {
        statSync(idx)
        const meta = readMeta(idx)
        items.push({
          text: meta.title ?? titleize(entry),
          link: `/docs/${section}/${entry}/`,
          weight: meta.weight ?? 9999,
        })
      } catch { /* no index.md — skip */ }
      continue
    }
    if (!entry.endsWith('.md') || entry === 'index.md') continue
    const meta = readMeta(full)
    const slug = entry.replace(/\.md$/, '')
    items.push({
      text: meta.title ?? titleize(slug),
      link: `/docs/${section}/${slug}`,
      weight: meta.weight ?? 9999,
    })
  }

  items.sort((a, b) => a.weight - b.weight || a.text.localeCompare(b.text, 'zh-Hans'))
  return items
}

export function sectionGroup(section: string, text?: string) {
  const idx = join(DOCS_ROOT, section, 'index.md')
  let label = text
  if (!label) {
    const meta = readMeta(idx)
    label = meta.title ?? titleize(section)
  }
  return {
    text: label,
    link: `/docs/${section}/`,
    collapsed: true,
    items: sectionItems(section),
  }
}
