'use client'

import React from 'react'
import { User, Calendar, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MarketingTaskCard } from '@/types/marketing-plan'
import { STATUS_LABEL, STATUS_BADGE_CLASS, formatDueDate } from '@/lib/task-status'

interface TaskCardProps {
  task: MarketingTaskCard
  isDragging: boolean
  onOpen: (id: string) => void
  onDragStart: (id: string) => void
  onDragEnd: () => void
}

export function TaskCard({ task, isDragging, onOpen, onDragStart, onDragEnd }: TaskCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', task.id)
        onDragStart(task.id)
      }}
      onDragEnd={onDragEnd}
      onClick={() => onOpen(task.id)}
      className={cn(
        'cursor-pointer rounded-2xl border border-slate-200 bg-white p-3.5 shadow-card transition-all hover:shadow-card-lg hover:border-obi-300',
        isDragging && 'opacity-40',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-semibold leading-snug text-slate-800">{task.title}</p>
        <span
          className={cn(
            'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
            STATUS_BADGE_CLASS[task.status],
          )}
        >
          {STATUS_LABEL[task.status]}
        </span>
      </div>

      {task.description && (
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">{task.description}</p>
      )}

      <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <User className="h-3 w-3" />
          {task.owner}
        </span>
        {task.dueDate && (
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDueDate(task.dueDate)}
          </span>
        )}
        {task.participants.length > 0 && (
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {task.participants.length}
          </span>
        )}
      </div>
    </div>
  )
}
