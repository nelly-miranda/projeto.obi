'use client'

import React from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MarketingPhase, MarketingTaskCard } from '@/types/marketing-plan'
import { TaskCard } from './TaskCard'

interface TaskColumnProps {
  phase: MarketingPhase
  tasks: MarketingTaskCard[]
  draggingId: string | null
  onOpenTask: (id: string) => void
  onDragStartTask: (id: string) => void
  onDragEndTask: () => void
  onDropTask: (phaseId: string) => void
  onRequestCreate: (phaseId: string) => void
}

export function TaskColumn({
  phase,
  tasks,
  draggingId,
  onOpenTask,
  onDragStartTask,
  onDragEndTask,
  onDropTask,
  onRequestCreate,
}: TaskColumnProps) {
  const [isOver, setIsOver] = React.useState(false)

  return (
    <div className="flex h-full w-[280px] shrink-0 flex-col">
      <div className="rounded-t-2xl bg-slate-900 px-3.5 py-2.5">
        <p className="truncate text-[13px] font-semibold text-white">
          {phase.number} · {phase.title} <span className="text-slate-400">{tasks.length}</span>
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsOver(true)
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsOver(false)
          onDropTask(phase.id)
        }}
        className={cn(
          'flex-1 space-y-2.5 overflow-y-auto rounded-b-2xl bg-slate-100/70 p-2.5 transition-colors',
          isOver && 'bg-obi-50',
        )}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isDragging={draggingId === task.id}
            onOpen={onOpenTask}
            onDragStart={onDragStartTask}
            onDragEnd={onDragEndTask}
          />
        ))}

        <button
          type="button"
          onClick={() => onRequestCreate(phase.id)}
          className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-slate-300 py-2 text-[11px] text-slate-400 hover:border-obi-300 hover:text-obi-600"
        >
          <Plus className="h-3 w-3" />
          Nova tarefa
        </button>
      </div>
    </div>
  )
}
