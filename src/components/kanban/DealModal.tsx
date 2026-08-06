'use client'

import React, { useState } from 'react'
import { X, Mail, MessageSquare, Plus, Building2, User, Tag, CheckSquare, Square } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { KanbanStage, KanbanCard, KanbanProduct, KanbanTask, CustomField } from '@/types/kanban'

interface DealModalProps {
  deal: KanbanCard
  stages: KanbanStage[]
  onClose: () => void
  onUpdate: (dealId: string, updater: (deal: KanbanCard) => KanbanCard) => void
}

type Tab = 'geral' | 'produtos' | 'automacao'

function formatCurrency(value: number): string {
  if (!value) return 'R$0'
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

let idCounter = 0
function nextId(prefix: string): string {
  idCounter += 1
  return `${prefix}-${idCounter}`
}

export function DealModal({ deal, stages, onClose, onUpdate }: DealModalProps) {
  const [tab, setTab] = useState<Tab>('geral')
  const [newProductName, setNewProductName] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')
  const [newFieldLabel, setNewFieldLabel] = useState('')
  const [newTaskLabel, setNewTaskLabel] = useState('')

  const currentStage = stages.find((s) => s.id === deal.stageId) ?? stages[0]
  const currentIndex = stages.findIndex((s) => s.id === deal.stageId)

  const addProduct = () => {
    if (!newProductName.trim()) return
    const product: KanbanProduct = {
      id: nextId('prod'),
      name: newProductName.trim(),
      price: Number(newProductPrice) || 0,
    }
    onUpdate(deal.id, (d) => ({ ...d, produtos: [...d.produtos, product] }))
    setNewProductName('')
    setNewProductPrice('')
  }

  const addField = () => {
    if (!newFieldLabel.trim()) return
    const field: CustomField = { id: nextId('field'), label: newFieldLabel.trim(), value: '' }
    onUpdate(deal.id, (d) => ({ ...d, camposPersonalizados: [...d.camposPersonalizados, field] }))
    setNewFieldLabel('')
  }

  const addTask = () => {
    if (!newTaskLabel.trim()) return
    const task: KanbanTask = { id: nextId('task'), label: newTaskLabel.trim(), done: false }
    onUpdate(deal.id, (d) => ({ ...d, tarefas: [...d.tarefas, task] }))
    setNewTaskLabel('')
  }

  const toggleTask = (taskId: string) => {
    onUpdate(deal.id, (d) => ({
      ...d,
      tarefas: d.tarefas.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-card-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-900">{deal.title}</h2>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Stage pills */}
        <div className="flex gap-1.5 overflow-x-auto border-b border-slate-100 px-6 py-3">
          {stages.map((stage, i) => (
            <span
              key={stage.id}
              className={cn(
                'shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-medium whitespace-nowrap',
                i === currentIndex
                  ? 'bg-obi-500 text-white'
                  : i < currentIndex
                    ? 'bg-obi-50 text-obi-600'
                    : 'bg-slate-100 text-slate-500',
              )}
            >
              {stage.name}
            </span>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-100 px-6">
          {([
            ['geral', 'Geral'],
            ['produtos', 'Produtos'],
            ['automacao', 'Automação'],
          ] as [Tab, string][]).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                'border-b-2 py-3 text-xs font-semibold transition-colors',
                tab === key ? 'border-obi-500 text-obi-600' : 'border-transparent text-slate-400 hover:text-slate-600',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {tab === 'geral' && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Sobre o negócio</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Building2 className="mt-0.5 h-3.5 w-3.5 text-obi-500" />
                    <div>
                      <p className="text-[10px] text-slate-400">Empresa</p>
                      <p className="text-xs font-medium text-slate-700">{deal.empresa}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="mt-0.5 h-3.5 w-3.5 text-obi-500" />
                    <div>
                      <p className="text-[10px] text-slate-400">Contato</p>
                      <p className="text-xs font-medium text-slate-700">{deal.contato}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Tag className="mt-0.5 h-3.5 w-3.5 text-obi-500" />
                    <div>
                      <p className="text-[10px] text-slate-400">Fonte</p>
                      <p className="text-xs font-medium text-slate-700">{deal.fonte}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Valor</p>
                    <p className="text-xs font-medium text-slate-700">{formatCurrency(deal.valor)}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Campos personalizados</p>
                </div>
                <div className="space-y-2">
                  {deal.camposPersonalizados.map((f) => (
                    <div key={f.id} className="flex items-center gap-2 text-xs">
                      <span className="w-28 shrink-0 text-slate-400">{f.label}</span>
                      <span className="text-slate-700">{f.value || '—'}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      value={newFieldLabel}
                      onChange={(e) => setNewFieldLabel(e.target.value)}
                      placeholder="Nome do campo"
                      className="h-8 flex-1 rounded-lg border border-slate-200 px-2.5 text-xs outline-none focus:border-obi-400"
                    />
                    <button type="button" onClick={addField} className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-200">
                      <Plus className="h-3 w-3" /> Criar campo
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Atividades da etapa atual: {currentStage.name}
                </p>
                <ul className="space-y-1">
                  {currentStage.atividades.map((a) => (
                    <li key={a} className="text-xs text-slate-600">→ {a}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tarefas</p>
                <div className="space-y-1.5">
                  {deal.tarefas.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTask(t.id)}
                      className="flex w-full items-center gap-2 text-left text-xs"
                    >
                      {t.done ? (
                        <CheckSquare className="h-3.5 w-3.5 text-obi-500" />
                      ) : (
                        <Square className="h-3.5 w-3.5 text-slate-300" />
                      )}
                      <span className={t.done ? 'text-slate-400 line-through' : 'text-slate-700'}>{t.label}</span>
                    </button>
                  ))}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      value={newTaskLabel}
                      onChange={(e) => setNewTaskLabel(e.target.value)}
                      placeholder="Nova tarefa"
                      className="h-8 flex-1 rounded-lg border border-slate-200 px-2.5 text-xs outline-none focus:border-obi-400"
                    />
                    <button type="button" onClick={addTask} className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-200">
                      <Plus className="h-3 w-3" /> Tarefa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'produtos' && (
            <div className="space-y-3">
              {deal.produtos.length === 0 && (
                <p className="text-xs text-slate-400">Nenhum produto cadastrado neste negócio ainda.</p>
              )}
              {deal.produtos.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-xl border border-slate-200 px-3.5 py-2.5">
                  <span className="text-xs font-medium text-slate-700">{p.name}</span>
                  <span className="text-xs text-obi-600">{formatCurrency(p.price)}</span>
                </div>
              ))}

              <div className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 p-3">
                <input
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="Nome do produto"
                  className="h-8 flex-1 rounded-lg border border-slate-200 px-2.5 text-xs outline-none focus:border-obi-400"
                />
                <input
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  placeholder="Preço"
                  inputMode="numeric"
                  className="h-8 w-24 rounded-lg border border-slate-200 px-2.5 text-xs outline-none focus:border-obi-400"
                />
                <button type="button" onClick={addProduct} className="flex items-center gap-1 rounded-lg bg-obi-500 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-obi-600">
                  <Plus className="h-3 w-3" /> Adicionar
                </button>
              </div>
            </div>
          )}

          {tab === 'automacao' && (
            <div className="space-y-2.5">
              <p className="text-xs text-slate-500">
                Simulação das automações configuradas para cada etapa deste pipeline. Ao arrastar o card entre colunas no quadro, essas mensagens aparecem simuladas em tempo real.
              </p>
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  className={cn(
                    'rounded-xl border p-3',
                    stage.id === deal.stageId ? 'border-obi-300 bg-obi-50' : 'border-slate-200',
                  )}
                >
                  <p className="text-xs font-semibold text-slate-700">{stage.name}</p>
                  {!stage.automation?.email && !stage.automation?.whatsapp && (
                    <p className="mt-1 text-[11px] text-slate-400">Sem automação simulada nesta etapa.</p>
                  )}
                  {stage.automation?.email && (
                    <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-600">
                      <Mail className="h-3 w-3 text-obi-500" /> {stage.automation.email}
                    </div>
                  )}
                  {stage.automation?.whatsapp && (
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-600">
                      <MessageSquare className="h-3 w-3 text-obi-500" /> {stage.automation.whatsapp}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
