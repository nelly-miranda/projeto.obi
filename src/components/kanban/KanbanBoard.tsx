'use client'

import React, { useState } from 'react'
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

export function KanbanBoard({ stages, initialCards }: KanbanBoardProps) {
  const [cards, setCards] = useState<KanbanCard[]>(initialCards)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [openDealId, setOpenDealId] = useState<string | null>(null)
  const [transition, setTransition] = useState<Transition | null>(null)

  const openDeal = cards.find((c) => c.id === openDealId) ?? null
  const transitionDeal = transition ? cards.find((c) => c.id === transition.dealId) : null
  const transitionStage = transition ? stages.find((s) => s.id === transition.stageId) : null

  const updateDeal = (dealId: string, updater: (deal: KanbanCard) => KanbanCard) => {
    setCards((prev) => prev.map((c) => (c.id === dealId ? updater(c) : c)))
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
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-x-auto overflow-y-hidden px-6 py-5">
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
            />
          ))}
        </div>
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
