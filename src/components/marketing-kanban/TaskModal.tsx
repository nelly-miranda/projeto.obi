'use client'

import React, { useEffect, useRef, useState } from 'react'
import { X, User, Calendar, Layers, Paperclip, Send, Play, Pause, Check, Save } from 'lucide-react'
import type { MarketingTaskCard, MarketingPhase, TaskMessage, MarketingTaskStatus } from '@/types/marketing-plan'
import { STATUS_LABEL, STATUS_OPTIONS } from '@/lib/task-status'

interface TaskModalProps {
  task: MarketingTaskCard
  phase: MarketingPhase | undefined
  isNew?: boolean
  onClose: () => void
  onUpdate: (id: string, patch: Partial<MarketingTaskCard>) => void
  onCreate?: (task: MarketingTaskCard) => void
  onSendMessage: (id: string, message: TaskMessage) => void
}

let msgCounter = 0

export function TaskModal({ task, phase, isNew, onClose, onUpdate, onCreate, onSendMessage }: TaskModalProps) {
  const [draft, setDraft] = useState(task)
  const [participantInput, setParticipantInput] = useState('')
  const [messageText, setMessageText] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const current = isNew ? draft : task

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [task.messages.length])

  const patch = (p: Partial<MarketingTaskCard>) => {
    if (isNew) setDraft((d) => ({ ...d, ...p }))
    else onUpdate(task.id, p)
  }

  const addParticipant = () => {
    if (!participantInput.trim()) return
    patch({ participants: [...current.participants, participantInput.trim()] })
    setParticipantInput('')
  }

  const removeParticipant = (name: string) => {
    patch({ participants: current.participants.filter((p) => p !== name) })
  }

  const handleCreate = () => {
    if (!draft.title.trim()) return
    onCreate?.(draft)
  }

  const sendMessage = () => {
    if (!messageText.trim()) return
    msgCounter += 1
    onSendMessage(task.id, {
      id: `msg-${task.id}-${msgCounter}`,
      author: 'Você',
      text: messageText.trim(),
      createdAt: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
    })
    setMessageText('')
  }

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    msgCounter += 1
    onSendMessage(task.id, {
      id: `msg-${task.id}-${msgCounter}`,
      author: 'Você',
      text: '',
      attachmentName: file.name,
      attachmentUrl: URL.createObjectURL(file),
      createdAt: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
    })
    e.target.value = ''
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[92vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-card-lg"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar tarefa"
          className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 text-slate-400 shadow-card hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Painel de campos */}
        <div className="flex w-[460px] shrink-0 flex-col overflow-y-auto border-r border-slate-100 p-7 pr-14">
          <input
            value={current.title}
            onChange={(e) => patch({ title: e.target.value })}
            placeholder="Nome da tarefa"
            className="mb-4 w-full text-xl font-bold leading-snug text-slate-900 focus:outline-none"
          />

          <textarea
            value={current.description}
            onChange={(e) => patch({ description: e.target.value })}
            placeholder="Descrição da tarefa"
            className="mb-6 min-h-[260px] flex-1 resize-none rounded-xl border border-slate-200 p-3.5 text-sm leading-relaxed text-slate-600 placeholder:text-slate-400 focus:border-obi-300 focus:outline-none"
          />

          <div className="space-y-4">
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                <User className="h-3 w-3" />
                Responsável
              </label>
              <input
                value={current.owner}
                onChange={(e) => patch({ owner: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 focus:border-obi-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                <Calendar className="h-3 w-3" />
                Prazo
              </label>
              <input
                type="date"
                value={current.dueDate ?? ''}
                onChange={(e) => patch({ dueDate: e.target.value || undefined })}
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 focus:border-obi-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Status
              </label>
              <select
                value={current.status}
                onChange={(e) => patch({ status: e.target.value as MarketingTaskStatus })}
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 focus:border-obi-300 focus:outline-none"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABEL[s]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Participantes
              </label>
              {current.participants.length > 0 && (
                <div className="mb-1.5 flex flex-wrap gap-1.5">
                  {current.participants.map((p) => (
                    <span
                      key={p}
                      className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600"
                    >
                      {p}
                      <button type="button" onClick={() => removeParticipant(p)} className="text-slate-400 hover:text-slate-600">
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <input
                value={participantInput}
                onChange={(e) => setParticipantInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addParticipant()
                  }
                }}
                placeholder="Nome e Enter"
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 focus:border-obi-300 focus:outline-none"
              />
            </div>

            {phase && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Layers className="h-3.5 w-3.5 text-obi-500" />
                {phase.number} · {phase.title}
              </div>
            )}
          </div>

          <div className="mt-auto pt-5">
            {isNew ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={!draft.title.trim()}
                  className="flex-1 rounded-full bg-slate-900 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-40"
                >
                  Criar tarefa
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-slate-900 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  <Save className="h-3 w-3" />
                  Salvar
                </button>

                {current.status === 'em-andamento' && (
                  <button
                    type="button"
                    onClick={() => patch({ status: 'pendente' })}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-amber-500 py-2 text-xs font-semibold text-white hover:bg-amber-600"
                  >
                    <Pause className="h-3 w-3" />
                    Pausar
                  </button>
                )}

                {current.status === 'pendente' && (
                  <button
                    type="button"
                    onClick={() => patch({ status: 'em-andamento' })}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-obi-600 py-2 text-xs font-semibold text-white hover:bg-obi-700"
                  >
                    <Play className="h-3 w-3" />
                    Iniciar
                  </button>
                )}

                {current.status === 'concluido' ? (
                  <button
                    type="button"
                    onClick={() => patch({ status: 'pendente' })}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-200 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50"
                  >
                    Reabrir
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => patch({ status: 'concluido' })}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-600 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                  >
                    <Check className="h-3 w-3" />
                    Concluir
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bate-papo interno da tarefa */}
        {!isNew && (
          <div className="flex flex-1 flex-col bg-slate-50">
            <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3.5">
              <p className="text-sm font-semibold text-slate-800">Bate-papo da tarefa</p>
              <span className="text-xs text-slate-400">
                {task.participants.length + 1} participante{task.participants.length !== 0 ? 's' : ''}
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {task.messages.length === 0 && (
                <p className="text-xs text-slate-400">
                  Nenhuma mensagem ainda. Converse aqui sobre a tarefa e anexe arquivos: tudo fica registrado.
                </p>
              )}
              {task.messages.map((m) => (
                <div key={m.id} className="rounded-2xl bg-white p-3 shadow-card">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-slate-800">{m.author}</p>
                    <p className="text-[10px] text-slate-400">{m.createdAt}</p>
                  </div>
                  {m.text && <p className="mt-1 text-xs leading-relaxed text-slate-600">{m.text}</p>}
                  {m.attachmentName && (
                    <a
                      href={m.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-obi-600 hover:text-obi-700"
                    >
                      <Paperclip className="h-3 w-3" />
                      {m.attachmentName}
                    </a>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 bg-white px-4 py-3">
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleFile} />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="shrink-0 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Anexar arquivo"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') sendMessage()
                }}
                placeholder="Escreva uma mensagem"
                className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:border-obi-300 focus:outline-none"
              />
              <button
                type="button"
                onClick={sendMessage}
                className="shrink-0 rounded-full bg-slate-900 p-2 text-white hover:bg-slate-800"
                aria-label="Enviar mensagem"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
