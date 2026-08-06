'use client'

import React from 'react'
import { Phone, Mail, MessageSquare, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { KanbanCard } from '@/types/kanban'

interface DealCardProps {
  deal: KanbanCard
  onOpen: (id: string) => void
  onDragStart: (id: string) => void
  onDragEnd: () => void
  isDragging: boolean
}

function formatCurrency(value: number): string {
  if (!value) return 'R$0'
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export function DealCard({ deal, onOpen, onDragStart, onDragEnd, isDragging }: DealCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', deal.id)
        onDragStart(deal.id)
      }}
      onDragEnd={onDragEnd}
      onClick={() => onOpen(deal.id)}
      className={cn(
        'group cursor-pointer rounded-2xl border border-slate-200 bg-white p-3.5 shadow-card transition-all hover:shadow-card-lg hover:border-obi-300',
        isDragging && 'opacity-40',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-semibold text-slate-800 leading-snug">{deal.title}</p>
        <div className="flex shrink-0 items-center gap-1 text-slate-400">
          <Phone className="h-3.5 w-3.5" />
          <Mail className="h-3.5 w-3.5" />
          <MessageSquare className="h-3.5 w-3.5" />
        </div>
      </div>

      <p className="mt-1.5 text-xs font-medium text-obi-600">{formatCurrency(deal.valor)}</p>

      <p className="mt-2 text-xs text-slate-500">{deal.contato}</p>
      <p className="text-xs text-slate-400">{deal.empresa}</p>

      <p className="mt-2 text-[11px] text-slate-400">Fonte: {deal.fonte}</p>

      <div className="mt-3 flex items-center justify-between">
        {deal.tarefaStatus ? (
          <span
            className={cn(
              'rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
              deal.tarefaStatus === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700',
            )}
          >
            {deal.tarefaStatus === 'completed' ? 'Concluída' : 'Atrasada'}
          </span>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpen(deal.id)
          }}
          className="flex items-center gap-1 text-[11px] text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-obi-600"
        >
          <Plus className="h-3 w-3" />
          Atividade
        </button>
      </div>
    </div>
  )
}
