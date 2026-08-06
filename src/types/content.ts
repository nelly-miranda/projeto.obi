export type ContentStatus = 'draft' | 'review' | 'active' | 'archived'
export type ContentSection = 'projeto' | 'pipelines' | 'documentacao'

export interface ContentFrontmatter {
  title: string
  section: ContentSection
  slug: string
  description?: string
  status: ContentStatus
  icon?: string
  order?: number
  owner?: string
  lastUpdated?: string
  tags?: string[]
  // pipeline-specific
  pipeline?: string
  team?: string
  objective?: string
}

export interface ContentItem {
  frontmatter: ContentFrontmatter
  body: string
  slug: string
  section: ContentSection
  filePath: string
}

export interface NavSection {
  id: ContentSection
  label: string
  icon: string
  items: NavItem[]
}

export interface NavItem {
  slug: string
  section: ContentSection
  title: string
  icon: string
  status: ContentStatus
  order: number
}

export type ViewMode = 'grid' | 'list'
