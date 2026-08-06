import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookOpen } from 'lucide-react'
import { buildNav, getContentItem } from '@/lib/content'
import { AppFrame } from '@/components/layout/AppFrame'
import { Sidebar } from '@/components/layout/Sidebar'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { KANBAN_STAGES, SAMPLE_DEALS } from '@/lib/pipelines-kanban'
import type { PipelineSlug } from '@/types/kanban'

interface PageProps {
  params: { slug: string }
}

export default function PipelineKanbanPage({ params }: PageProps) {
  const { slug } = params
  const stages = KANBAN_STAGES[slug as PipelineSlug]
  if (!stages) notFound()

  const nav = buildNav()
  const item = getContentItem('pipelines', slug)
  const cards = SAMPLE_DEALS[slug as PipelineSlug] ?? []

  return (
    <AppFrame>
      <Sidebar nav={nav} />

      <main className="app-frame flex flex-1 flex-col overflow-hidden rounded-4xl bg-white">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-100 px-8">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-slate-900">
              {item?.frontmatter.title ?? 'Pipeline'}
            </h1>
            <p className="text-xs text-slate-400">Quadro Kanban</p>
          </div>

          <Link
            href={`/pipelines/${slug}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:border-obi-300 hover:text-obi-600"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Documentação
          </Link>
        </header>

        <KanbanBoard stages={stages} initialCards={cards} />
      </main>
    </AppFrame>
  )
}
