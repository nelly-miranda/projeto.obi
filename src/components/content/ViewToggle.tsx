'use client'

import React from 'react'
import { LayoutGrid, List } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ViewMode } from '@/types/content'

interface ViewToggleProps {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center rounded-full border border-slate-200/60 bg-white p-1 shadow-card">
      <button
        onClick={() => onChange('grid')}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
          value === 'grid'
            ? 'bg-slate-900 text-white shadow-card'
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700',
        )}
      >
        <LayoutGrid className="h-3.5 w-3.5" />
        Grid
      </button>
      <button
        onClick={() => onChange('list')}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
          value === 'list'
            ? 'bg-slate-900 text-white shadow-card'
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700',
        )}
      >
        <List className="h-3.5 w-3.5" />
        Lista
      </button>
    </div>
  )
}
