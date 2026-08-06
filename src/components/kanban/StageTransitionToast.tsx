'use client'

import React, { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, Clock, ListChecks, Mail, MessageSquare, X } from 'lucide-react'
import type { KanbanStage, KanbanCard } from '@/types/kanban'

interface StageTransitionToastProps {
  deal: KanbanCard
  stage: KanbanStage
  onClose: () => void
}

export function StageTransitionToast({ deal, stage, onClose }: StageTransitionToastProps) {
  const [sentEmail, setSentEmail] = useState(false)
  const [sentWhatsapp, setSentWhatsapp] = useState(false)

  useEffect(() => {
    const t1 = stage.automation?.email ? setTimeout(() => setSentEmail(true), 900) : undefined
    const t2 = stage.automation?.whatsapp ? setTimeout(() => setSentWhatsapp(true), 1500) : undefined
    const t3 = setTimeout(onClose, 8000)
    return () => {
      if (t1) clearTimeout(t1)
      if (t2) clearTimeout(t2)
      clearTimeout(t3)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage.id, deal.id])

  return (
    <div className="fixed bottom-6 right-6 z-[60] w-[340px] animate-in slide-in-from-bottom-4 rounded-2xl border border-slate-200 bg-white shadow-card-lg">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
          <ArrowRight className="h-3.5 w-3.5 text-obi-500" />
          {deal.title} → {stage.name}
        </div>
        <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-3 px-4 py-3">
        <div className="flex items-start gap-2">
          <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
          <p className="text-xs text-slate-600">
            <span className="font-semibold text-slate-800">SLA da etapa:</span> {stage.sla}
          </p>
        </div>

        <div className="flex items-start gap-2">
          <ListChecks className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
          <div className="text-xs text-slate-600">
            <p className="font-semibold text-slate-800">Ações desta etapa</p>
            <ul className="mt-1 space-y-0.5">
              {stage.atividades.slice(0, 3).map((a) => (
                <li key={a}>→ {a}</li>
              ))}
            </ul>
          </div>
        </div>

        {(stage.automation?.email || stage.automation?.whatsapp) && (
          <div className="rounded-xl bg-slate-50 p-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Simulação de automação
            </p>
            <div className="mt-1.5 space-y-1.5">
              {stage.automation?.email && (
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="h-3.5 w-3.5 text-obi-500" />
                  <span className={sentEmail ? 'text-slate-600' : 'text-slate-400'}>
                    {stage.automation.email}
                  </span>
                  {sentEmail && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                </div>
              )}
              {stage.automation?.whatsapp && (
                <div className="flex items-center gap-2 text-xs">
                  <MessageSquare className="h-3.5 w-3.5 text-obi-500" />
                  <span className={sentWhatsapp ? 'text-slate-600' : 'text-slate-400'}>
                    {stage.automation.whatsapp}
                  </span>
                  {sentWhatsapp && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                </div>
              )}
            </div>
          </div>
        )}

        <p className="text-[10px] text-slate-400">
          Critério de avanço: {stage.criterioAvanco}
        </p>
      </div>
    </div>
  )
}
