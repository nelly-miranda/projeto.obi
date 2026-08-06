'use client'

import React, { useState } from 'react'
import { ViewToggle } from '@/components/content/ViewToggle'
import { ContentCard } from '@/components/content/ContentCard'
import type { ContentItem, ViewMode } from '@/types/content'

interface SectionContentGridProps {
  items: ContentItem[]
}

export function SectionContentGrid({ items }: SectionContentGridProps) {
  const [mode, setMode] = useState<ViewMode>('grid')

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          {items.length} {items.length === 1 ? 'documento' : 'documentos'}
        </p>
        <ViewToggle value={mode} onChange={setMode} />
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-16 text-center">
          <p className="text-sm text-slate-500">Nenhum documento nesta seção ainda.</p>
        </div>
      ) : mode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ContentCard key={item.slug} item={item} mode="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <ContentCard key={item.slug} item={item} mode="list" />
          ))}
        </div>
      )}
    </div>
  )
}
