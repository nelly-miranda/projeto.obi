'use client'

import React, { useState } from 'react'
import { Phone, Mail, MessageSquare, Plus, Info, Clock, ListChecks, Package, Users } from 'lucide-react'
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
  const [showInfo, setShowInfo] = useState(false)

  const totalTarefas = deal.tarefas?.length ?? 0
  const tarefasConcluidas = deal.tarefas?.filter((t) => t.done).length ?? 0
  const temTarefas = totalTarefas > 0
  const progressoPct = temTarefas ? Math.round((tarefasConcluidas / totalTarefas) * 100) : 0

  const totalProdutos = deal.produtos?.length ?? 0
  const valorProdutos = deal.produtos?.reduce((sum, p) => sum + (p.price || 0), 0) ?? 0
  const temProdutos = totalProdutos > 0

  const outrosContatos = (deal.contatos?.length ?? 0) > 1 ? deal.contatos.length - 1 : 0
  const contatoPrincipal = deal.contatos?.[0]

  const dias = deal.diasNaEtapa
  const diasAltos = typeof dias === 'number' && dias > 10

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
        'group relative cursor-pointer rounded-2xl border border-slate-200 bg-white p-3.5 shadow-card transition-all hover:shadow-card-lg hover:border-obi-300',
        isDragging && 'opacity-40',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-semibold text-slate-800 leading-snug">{deal.title}</p>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setShowInfo((v) => !v)
            }}
            className="rounded-md p-0.5 text-obi-500 transition-colors hover:bg-obi-50 hover:text-obi-700"
            aria-label="Ver resumo do card"
          >
            <Info className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1 text-slate-400">
            <Phone className="h-3.5 w-3.5" />
            <Mail className="h-3.5 w-3.5" />
            <MessageSquare className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      <p className="mt-1.5 text-xs font-medium text-obi-600">{formatCurrency(deal.valor)}</p>

      <div className="mt-2 flex items-center gap-1.5">
        <p className="text-xs text-slate-500">{deal.contato}</p>
        {outrosContatos > 0 && (
          <span className="flex items-center gap-0.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
            <Users className="h-2.5 w-2.5" />
            +{outrosContatos}
          </span>
        )}
      </div>
      <p className="text-xs text-slate-400">{deal.empresa}</p>

      {temProdutos && (
        <p className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
          <Package className="h-3 w-3 text-slate-400" />
          {totalProdutos} produto{totalProdutos > 1 ? 's' : ''} · {formatCurrency(valorProdutos)}
        </p>
      )}

      {temTarefas && (
        <div className="mt-2">
          <p className="flex items-center gap-1 text-[11px] text-slate-500">
            <ListChecks className="h-3 w-3 text-slate-400" />
            {tarefasConcluidas}/{totalTarefas} tarefas
          </p>
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-obi-500 transition-all"
              style={{ width: `${progressoPct}%` }}
            />
          </div>
        </div>
      )}

      {typeof dias === 'number' && (
        <p
          className={cn(
            'mt-2 flex items-center gap-1 text-[11px]',
            diasAltos ? 'text-amber-600' : 'text-slate-400',
          )}
        >
          <Clock className="h-3 w-3" />
          Há {dias} dia{dias !== 1 ? 's' : ''} nesta etapa
        </p>
      )}

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

      {showInfo && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={(e) => {
              e.stopPropagation()
              setShowInfo(false)
            }}
          />
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-9 z-50 w-60 rounded-xl border border-slate-200 bg-white p-3 shadow-card-lg"
          >
            <p className="text-xs font-semibold text-slate-800">{deal.empresa}</p>
            {contatoPrincipal ? (
              <p className="mt-0.5 text-[11px] text-slate-500">
                {contatoPrincipal.nome}
                {contatoPrincipal.cargo ? ` · ${contatoPrincipal.cargo}` : ''}
              </p>
            ) : (
              <p className="mt-0.5 text-[11px] text-slate-500">{deal.contato}</p>
            )}

            <div className="mt-2 space-y-1 border-t border-slate-100 pt-2">
              <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Package className="h-3 w-3 text-slate-400" />
                {temProdutos
                  ? `${totalProdutos} produto${totalProdutos > 1 ? 's' : ''} · ${formatCurrency(valorProdutos)}`
                  : 'Sem produtos'}
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <ListChecks className="h-3 w-3 text-slate-400" />
                {temTarefas ? `${tarefasConcluidas} de ${totalTarefas} concluídas` : 'Sem tarefas'}
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Clock className="h-3 w-3 text-slate-400" />
                {typeof dias === 'number' ? `Há ${dias} dia${dias !== 1 ? 's' : ''} na etapa` : 'Sem registro de tempo'}
              </p>
              {deal.ultimaAtividade && (
                <p className="text-[11px] text-slate-400">Última atividade: {deal.ultimaAtividade}</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
