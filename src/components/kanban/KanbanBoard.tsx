'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { KanbanStage, KanbanCard } from '@/types/kanban'
import { KanbanColumn } from './KanbanColumn'
import { DealModal } from './DealModal'
import { StageTransitionToast } from './StageTransitionToast'

interface KanbanBoardProps {
  stages: KanbanStage[]
  initialCards: KanbanCard[]
}

interface Transition {
  dealId: string
  stageId: string
  key: number
}

const EDGE_ZONE = 90
const MAX_SCROLL_SPEED = 16

export function KanbanBoard({ stages, initialCards }: KanbanBoardProps) {
  const [cards, setCards] = useState<KanbanCard[]>(initialCards)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [openDealId, setOpenDealId] = useState<string | null>(null)
  const [transition, setTransition] = useState<Transition | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollSpeedRef = useRef(0)
  const [edgeHint, setEdgeHint] = useState<'left' | 'right' | null>(null)

  // Auto-scroll horizontal: aproximar o mouse da borda esquerda ou direita do
  // quadro revela o restante das etapas, em todos os pipelines (mesmo componente).
  useEffect(() => {
    let frame: number
    const step = () => {
      const el = scrollRef.current
      if (el && scrollSpeedRef.current !== 0) {
        el.scrollLeft += scrollSpeedRef.current
      }
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

  const openDeal = cards.find((c) => c.id === openDealId) ?? null
  const transitionDeal = transition ? cards.find((c) => c.id === transition.dealId) : null
  const transitionStage = transition ? stages.find((s) => s.id === transition.stageId) : null

  const updateDeal = (dealId: string, updater: (deal: KanbanCard) => KanbanCard) => {
    setCards((prev) => prev.map((c) => (c.id === dealId ? updater(c) : c)))
  }

  const createDeal = (card: KanbanCard) => {
    setCards((prev) => [...prev, card])
  }

  const handleDrop = (stageId: string) => {
    if (!draggingId) return
    const deal = cards.find((c) => c.id === draggingId)
    setDraggingId(null)
    if (!deal || deal.stageId === stageId) return

    setCards((prev) => prev.map((c) => (c.id === deal.id ? { ...c, stageId } : c)))
    setTransition({ dealId: deal.id, stageId, key: Date.now() })
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
          {stages.map((stage) => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              deals={cards.filter((c) => c.stageId === stage.id)}
              draggingId={draggingId}
              onOpenDeal={setOpenDealId}
              onDragStartDeal={setDraggingId}
              onDragEndDeal={() => setDraggingId(null)}
              onDropDeal={handleDrop}
              onCreateDeal={createDeal}
            />
          ))}
        </div>
      </div>

      {/* Indicador sutil de que há mais etapas naquela direção */}
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

      {openDeal && (
        <DealModal
          deal={openDeal}
          stages={stages}
          onClose={() => setOpenDealId(null)}
          onUpdate={updateDeal}
        />
      )}

      {transition && transitionDeal && transitionStage && (
        <StageTransitionToast
          key={transition.key}
          deal={transitionDeal}
          stage={transitionStage}
          onClose={() => setTransition(null)}
        />
      )}
    </div>
  )
}
