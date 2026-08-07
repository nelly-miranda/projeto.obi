'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { MarketingPhase } from '@/types/marketing-plan'

interface MarketingObjective {
  title: string
  description: string
}

interface MarketingPlanViewProps {
  phases: MarketingPhase[]
  objectives: MarketingObjective[]
  principle: string
}

export function MarketingPlanView({ phases, objectives, principle }: MarketingPlanViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [activePhase, setActivePhase] = useState(phases[0]?.id)
  const phaseRefs = useRef<Record<string, HTMLElement | null>>({})

  // Barra de progresso de leitura, calculada sobre a própria área com scroll
  // (o app usa containers com overflow-y-auto, não scroll na janela toda)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onScroll = () => {
      const h = el.scrollHeight - el.clientHeight
      setProgress(h > 0 ? (el.scrollTop / h) * 100 : 0)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // Destaque da fase atual no sumário, via IntersectionObserver
  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActivePhase(entry.target.id)
        })
      },
      { root, rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )

    Object.values(phaseRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [phases])

  const scrollToPhase = (id: string) => {
    phaseRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative flex-1 overflow-hidden">
      <div className="absolute left-0 top-0 z-10 h-0.5 w-full bg-slate-100">
        <div className="h-full bg-obi-500 transition-[width]" style={{ width: `${progress}%` }} />
      </div>

      <div ref={scrollRef} className="h-full overflow-y-auto px-8 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 rounded-3xl bg-slate-900 px-7 py-6 shadow-card">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-obi-300">
              Dois objetivos centrais
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {objectives.map((obj) => (
                <div key={obj.title} className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{obj.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{obj.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10 rounded-2xl border border-obi-100 bg-obi-50 px-6 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-obi-600">Princípio de abordagem</p>
            <p className="mt-1.5 text-sm leading-relaxed text-obi-900">{principle}</p>
          </div>

          <div className="grid grid-cols-[200px_minmax(0,1fr)] gap-10">
            {/* Sumário das fases */}
            <aside className="sticky top-0 h-fit">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Fases</p>
              <ol className="space-y-0.5">
                {phases.map((phase) => (
                  <li key={phase.id}>
                    <button
                      type="button"
                      onClick={() => scrollToPhase(phase.id)}
                      className={cn(
                        'flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors',
                        activePhase === phase.id
                          ? 'bg-obi-50 font-semibold text-obi-700'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700',
                      )}
                    >
                      <span className="font-mono text-[10px] text-slate-400">{phase.number}</span>
                      <span className="leading-snug">{phase.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </aside>

            {/* Conteúdo das fases */}
            <div className="min-w-0">
              {phases.map((phase) => (
                <section
                  key={phase.id}
                  id={phase.id}
                  ref={(el) => {
                    phaseRefs.current[phase.id] = el
                  }}
                  className="mb-16 scroll-mt-4"
                >
                  <div className="mb-5 flex items-baseline gap-3 border-b border-slate-100 pb-4">
                    <span className="font-mono text-xs text-slate-400">{phase.number}</span>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{phase.title}</h2>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-slate-600">{phase.intro}</p>

                  <div className="mb-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-obi-500">
                      Fundamentação
                    </p>
                    <ul className="space-y-1.5">
                      {phase.pillars.map((pillar, i) => (
                        <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-600">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                          {pillar}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    Plano de ação
                  </p>
                  <div className="space-y-4">
                    {phase.actions.map((action, i) => (
                      <div key={action.id} className="flex gap-4">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 font-mono text-xs font-medium text-slate-500">
                          {i + 1}
                        </div>
                        <div className="min-w-0 pb-1">
                          <p className="text-sm font-semibold text-slate-800">{action.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-500">{action.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
