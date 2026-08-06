import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Pencil, Calendar, User, Tag, LayoutGrid } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getContentItem, getSectionItems, buildNav } from '@/lib/content'
import { AppFrame } from '@/components/layout/AppFrame'
import { Sidebar } from '@/components/layout/Sidebar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ContentCard } from '@/components/content/ContentCard'
import { formatDate } from '@/lib/utils'
import type { ContentSection, ContentStatus } from '@/types/content'

const STATUS_LABEL: Record<ContentStatus, string> = {
  active: 'Ativo', draft: 'Rascunho', review: 'Em revisão', archived: 'Arquivado',
}
const STATUS_VARIANT: Record<ContentStatus, 'active' | 'draft' | 'review' | 'archived'> = {
  active: 'active', draft: 'draft', review: 'review', archived: 'archived',
}

interface PageProps {
  params: { section: string; slug: string }
}

export async function generateStaticParams() {
  // Enable static generation per file
  return []
}

export default async function ContentPage({ params }: PageProps) {
  const { section, slug } = params
  const nav = buildNav()

  // "new" slug → redirect to editor
  if (slug === 'new') {
    const { redirect } = await import('next/navigation')
    redirect(`/${section}/new/edit`)
  }

  const item = getContentItem(section as ContentSection, slug)
  if (!item) notFound()

  const { frontmatter, body } = item

  return (
    <AppFrame>
      <Sidebar nav={nav} />

      <main className="app-frame flex flex-1 flex-col overflow-hidden rounded-4xl bg-white">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-100 px-8">
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="truncate text-sm font-semibold text-slate-900">{frontmatter.title}</h1>
            <Badge variant={STATUS_VARIANT[frontmatter.status]}>
              {STATUS_LABEL[frontmatter.status]}
            </Badge>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {frontmatter.lastUpdated && (
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(frontmatter.lastUpdated)}
              </span>
            )}
            {section === 'pipelines' && (
              <Link href={`/pipelines/${slug}/kanban`}>
                <Button variant="outline" size="sm">
                  <LayoutGrid className="h-3.5 w-3.5" />
                  Ver Kanban
                </Button>
              </Link>
            )}
            <Link href={`/${section}/${slug}/edit`}>
              <Button variant="outline" size="sm">
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </Button>
            </Link>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="mx-auto max-w-3xl">
            {/* Meta card */}
            {(frontmatter.description || frontmatter.objective || frontmatter.team || frontmatter.tags?.length) && (
              <div className="mb-8 rounded-3xl bg-slate-50/70 p-6 space-y-3 shadow-card">
                {frontmatter.description && (
                  <p className="text-sm text-slate-600 leading-relaxed">{frontmatter.description}</p>
                )}
                <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                  {frontmatter.team && (
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {frontmatter.team}
                    </span>
                  )}
                  {frontmatter.owner && (
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-obi-500" />
                      {frontmatter.owner}
                    </span>
                  )}
                </div>
                {frontmatter.objective && (
                  <div className="rounded-2xl bg-obi-50 px-4 py-3.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-obi-500 mb-1">Objetivo</p>
                    <p className="text-xs text-slate-700 leading-relaxed">{frontmatter.objective}</p>
                  </div>
                )}
                {frontmatter.tags && frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {frontmatter.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-slate-500 shadow-card">
                        <Tag className="h-2.5 w-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Markdown body */}
            <article className="prose-obi">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </article>
          </div>
        </div>
      </main>
    </AppFrame>
  )
}
