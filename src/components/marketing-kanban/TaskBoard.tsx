'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MarketingPhase, MarketingTaskCard, TaskMessage } from '@/types/marketing-plan'
import { SaveToast } from '@/components/ui/save-toast'
import { TaskColumn } from './TaskColumn'
import { TaskModal } from './TaskModal'

interface TaskBoardProps {
  phases: MarketingPhase[]
  initialTasks: MarketingTaskCard[]
}

const EDGE_ZONE = 90
const MAX_SCROLL_SPEED = 16

let idCounter = 0

function emptyDraft(phaseId: string): MarketingTaskCard {
  idCounter += 1
  return {
    id: `draft-${idCounter}`,
    title: '',
    description: '',
    phaseId,
    owner: 'Marketing',
    participants: [],
    status: 'pendente',
    dueDate: undefined,
    messages: [],
  }
}

export function TaskBoard({ phases, initialTasks }: TaskBoardProps) {
  const [tasks, setTasks] = useState<MarketingTaskCard[]>(initialTasks)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [openTaskId, setOpenTaskId] = useState<string | null>(null)
  const [draftTask, setDraftTask] = useState<MarketingTaskCard | null>(null)
  const [showSaveToast, setShowSaveToast] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollSpeedRef = useRef(0)
  const [edgeHint, setEdgeHint] = useState<'left' | 'right' | null>(null)

  useEffect(() => {
    let frame: number
    const step = () => {
      const el = scrollRef.current
      if (el && scrollSpeedRef.current !== 0) el.scrollLeft += scrollSpeedRef.current
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [])

  const handleBoardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left

    if (x < EDGE_ZONE && el.scrollLeft > 0) {
      const intensity = 1 - x / EDGE_ZONE
      scrollSpeedRef.current = -Math.max(2, intensity * MAX_SCROLL_SPEED)
      setEdgeHint('left')
    } else if (x > rect.width - EDGE_ZONE && el.scrollLeft < el.scrollWidth - el.clientWidth - 1) {
      const intensity = 1 - (rect.width - x) / EDGE_ZONE
      scrollSpeedRef.current = Math.max(2, intensity * MAX_SCROLL_SPEED)
      setEdgeHint('right')
    } else {
      scrollSpeedRef.current = 0
      setEdgeHint(null)
    }
  }

  const handleBoardMouseLeave = () => {
    scrollSpeedRef.current = 0
    setEdgeHint(null)
  }

  const openTask = tasks.find((t) => t.id === openTaskId) ?? null
  const openTaskPhase = openTask ? phases.find((p) => p.id === openTask.phaseId) : undefined
  const draftPhase = draftTask ? phases.find((p) => p.id === draftTask.phaseId) : undefined

  const handleDrop = (phaseId: string) => {
    if (!draggingId) return
    setDraggingId(null)
    setTasks((prev) => prev.map((t) => (t.id === draggingId ? { ...t, phaseId } : t)))
  }

  const updateTask = (id: string, patch: Partial<MarketingTaskCard>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  }

  const sendMessage = (id: string, message: TaskMessage) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, messages: [...t.messages, message] } : t)))
  }

  const createTask = (draft: MarketingTaskCard) => {
    idCounter += 1
    const newTask: MarketingTaskCard = { ...draft, id: `task-${idCounter}` }
    setTasks((prev) => [...prev, newTask])
    setDraftTask(null)
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <div
        ref={scrollRef}
        onMouseMove={handleBoardMouseMove}
        onMouseLeave={handleBoardMouseLeave}
        className="flex-1 overflow-x-auto overflow-y-hidden px-6 py-5"
      >
        <div className="flex h-full gap-4">
          {phases.map((phase) => (
            <TaskColumn
              key={phase.id}
              phase={phase}
              tasks={tasks.filter((t) => t.phaseId === phase.id)}
              draggingId={draggingId}
              onOpenTask={setOpenTaskId}
              onDragStartTask={setDraggingId}
              onDragEndTask={() => setDraggingId(null)}
              onDropTask={handleDrop}
              onRequestCreate={(phaseId) => setDraftTask(emptyDraft(phaseId))}
            />
          ))}
        </div>
      </div>

      <div
        className={cn(
          'pointer-events-none absolute left-0 top-0 flex h-full w-16 items-center justify-start bg-gradient-to-r from-black/10 to-transparent pl-1 transition-opacity duration-150',
          edgeHint === 'left' ? 'opacity-100' : 'opacity-0',
        )}
      >
        <ChevronLeft className="h-5 w-5 text-slate-400" />
      </div>
      <div
        className={cn(
          'pointer-events-none absolute right-0 top-0 flex h-full w-16 items-center justify-end bg-gradient-to-l from-black/10 to-transparent pr-1 transition-opacity duration-150',
          edgeHint === 'right' ? 'opacity-100' : 'opacity-0',
        )}
      >
        <ChevronRight className="h-5 w-5 text-slate-400" />
      </div>

      {openTask && (
        <TaskModal
          task={openTask}
          phase={openTaskPhase}
          onClose={() => setOpenTaskId(null)}
          onUpdate={updateTask}
          onSendMessage={sendMessage}
          onSave={() => setShowSaveToast(true)}
        />
      )}

      {showSaveToast && <SaveToast message="Tarefa salva" onDone={() => setShowSaveToast(false)} />}

      {draftTask && (
        <TaskModal
          task={draftTask}
          phase={draftPhase}
          isNew
          onClose={() => setDraftTask(null)}
          onUpdate={() => {}}
          onCreate={createTask}
          onSendMessage={() => {}}
        />
      )}
    </div>
  )
}
