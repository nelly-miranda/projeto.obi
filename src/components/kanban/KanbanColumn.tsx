'use client'

import React, { useState } from 'react'
import { Info, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { KanbanStage, KanbanCard } from '@/types/kanban'
import { DealCard } from './DealCard'

interface KanbanColumnProps {
  stage: KanbanStage
  deals: KanbanCard[]
  draggingId: string | null
  onOpenDeal: (id: string) => void
  onDragStartDeal: (id: string) => void
  onDragEndDeal: () => void
  onDropDeal: (stageId: string) => void
}

function formatCurrency(value: number): string {
  if (!value) return 'R$0'
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export function KanbanColumn({
  stage,
  deals,
  draggingId,
  onOpenDeal,
  onDragStartDeal,
  onDragEndDeal,
  onDropDeal,
}: KanbanColumnProps) {
  const [infoOpen, setInfoOpen] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const total = deals.reduce((sum, d) => sum + d.valor, 0)

  return (
    <div className="flex h-full w-[280px] shrink-0 flex-col">
      <div className="rounded-t-2xl bg-slate-900 px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[13px] font-semibold text-white">
            {stage.name} <span className="text-slate-400">{deals.length}</span>
          </p>
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setInfoOpen((v) => !v)}
              className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              aria-label={`Informações sobre a etapa ${stage.name}`}
            >
              <Info className="h-3.5 w-3.5" />
            </button>

            {infoOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setInfoOpen(false)} />
                <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-card-lg">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-obi-500">Objetivo</p>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{stage.objetivo}</p>

                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-obi-500">Critério de avanço</p>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{stage.criterioAvanco}</p>

                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-obi-500">SLA</p>
                  <p className="mt-1 text-xs text-slate-600">{stage.sla}</p>

                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-obi-500">Atividades</p>
                  <ul className="mt-1 space-y-1">
                    {stage.atividades.map((a) => (
                      <li key={a} className="text-xs text-slate-600 leading-relaxed">→ {a}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
        <p className="mt-1 text-[11px] font-medium text-slate-400">{formatCurrency(total)}</p>
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
          onDropDeal(stage.id)
        }}
        className={cn(
          'flex-1 space-y-2.5 overflow-y-auto rounded-b-2xl bg-slate-100/70 p-2.5 transition-colors',
          isOver && 'bg-obi-50',
        )}
      >
        {deals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
            onOpen={onOpenDeal}
            onDragStart={onDragStartDeal}
            onDragEnd={onDragEndDeal}
            isDragging={draggingId === deal.id}
          />
        ))}

        <button
          type="button"
          className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-slate-300 py-2 text-[11px] text-slate-400 hover:border-obi-300 hover:text-obi-600"
        >
          <Plus className="h-3 w-3" />
          Negócio rápido
        </button>
      </div>
    </div>
  )
}
