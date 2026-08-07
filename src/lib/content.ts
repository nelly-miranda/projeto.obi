import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ContentItem, ContentFrontmatter, ContentSection, NavSection, NavItem } from '@/types/content'

const CONTENT_DIR = path.join(process.cwd(), 'content')

const SECTION_ORDER: ContentSection[] = ['projeto', 'marketing', 'gdq', 'produtos-servicos', 'pipelines', 'base-conhecimento', 'agentes']

export function getContentDir(section: ContentSection): string {
  return path.join(CONTENT_DIR, section)
}

export function getAllSections(): ContentSection[] {
  const sections = fs.readdirSync(CONTENT_DIR).filter((dir) => {
    return fs.statSync(path.join(CONTENT_DIR, dir)).isDirectory()
  }) as ContentSection[]

  return sections.sort((a, b) => SECTION_ORDER.indexOf(a) - SECTION_ORDER.indexOf(b))
}

export function getSectionItems(section: ContentSection): ContentItem[] {
  const dir = getContentDir(section)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

  const items = files.map((file) => {
    const slug = file.replace('.md', '')
    const filePath = path.join(dir, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    return {
      frontmatter: data as ContentFrontmatter,
      body: content,
      slug,
      section,
      filePath,
    } satisfies ContentItem
  })

  return items.sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99))
}

export function getContentItem(section: ContentSection, slug: string): ContentItem | null {
  const filePath = path.join(getContentDir(section), `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    frontmatter: data as ContentFrontmatter,
    body: content,
    slug,
    section,
    filePath,
  }
}

export function saveContentItem(
  section: ContentSection,
  slug: string,
  frontmatter: ContentFrontmatter,
  body: string,
): void {
  const dir = getContentDir(section)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  const filePath = path.join(dir, `${slug}.md`)
  const raw = matter.stringify(body, { ...frontmatter, lastUpdated: new Date().toISOString() })
  fs.writeFileSync(filePath, raw, 'utf-8')
}

export function deleteContentItem(section: ContentSection, slug: string): void {
  const filePath = path.join(getContentDir(section), `${slug}.md`)
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
}

export function buildNav(): NavSection[] {
  const sectionMeta: Record<ContentSection, { label: string; icon: string }> = {
    projeto: { label: 'Projeto', icon: 'Building2' },
    marketing: { label: 'Marketing', icon: 'Megaphone' },
    gdq: { label: 'GDQ', icon: 'Target' },
    'produtos-servicos': { label: 'Produtos e Serviços', icon: 'Package' },
    pipelines: { label: 'CRM', icon: 'Workflow' },
    'base-conhecimento': { label: 'Base de Conhecimento', icon: 'BookOpen' },
    agentes: { label: 'Agentes', icon: 'Bot' },
  }

  // "agentes" fica só como referência de conteúdo para as IAs, não aparece no menu
  const sections = getAllSections().filter((section) => section !== 'agentes')

  return sections.map((section) => {
    const items = getSectionItems(section)
    const meta = sectionMeta[section] ?? { label: section, icon: 'Folder' }

    return {
      id: section,
      label: meta.label,
      icon: meta.icon,
      items: items.map((item) => ({
        slug: item.slug,
        section: item.section,
        title: item.frontmatter.title,
        icon: item.frontmatter.icon ?? 'FileText',
        status: item.frontmatter.status,
        order: item.frontmatter.order ?? 99,
      })) satisfies NavItem[],
    }
  })
}
