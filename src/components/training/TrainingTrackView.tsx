'use client'

import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TrainingTrack } from '@/types/training'

interface TrainingTrackViewProps {
  track: TrainingTrack
  storageKey: string
}

export function TrainingTrackView({ track, storageKey }: TrainingTrackViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeModule, setActiveModule] = useState(track.modules[0]?.id)
  const [completed, setCompleted] = useState<string[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const moduleRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey)
    if (saved) {
      try {
        setCompleted(JSON.parse(saved))
      } catch {
        // ignora progresso corrompido
      }
    }
  }, [storageKey])

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(completed))
  }, [completed, storageKey])

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveModule(entry.target.id)
        })
      },
      { root, rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )

    Object.values(moduleRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [track.modules])

  const scrollToModule = (id: string) => {
    moduleRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggleCompleted = (id: string) => {
    setCompleted((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]))
  }

  const progressPct = Math.round((completed.length / track.modules.length) * 100)

  return (
    <div className="relative flex-1 overflow-hidden">
      <div className="absolute left-0 top-0 z-10 h-0.5 w-full bg-slate-100">
        <div className="h-full bg-obi-500 transition-[width]" style={{ width: `${progressPct}%` }} />
      </div>

      <div ref={scrollRef} className="h-full overflow-y-auto px-8 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Hero de boas-vindas */}
          <div className="mb-10 rounded-3xl bg-slate-900 px-7 py-6 shadow-card">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-obi-300">
              {completed.length} de {track.modules.length} módulos concluídos
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">{track.intro}</p>

            <div className="mt-4 rounded-2xl bg-white/5 p-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Antes de começar
              </p>
              <ul className="space-y-1">
                {track.prerequisites.map((item, i) => (
                  <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-300">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-10">
            {/* Sumário dos módulos */}
            <aside className="sticky top-0 h-fit">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Módulos</p>
              <ol className="space-y-0.5">
                {track.modules.map((mod) => (
                  <li key={mod.id}>
                    <button
                      type="button"
                      onClick={() => scrollToModule(mod.id)}
                      className={cn(
                        'flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors',
                        activeModule === mod.id
                          ? 'bg-obi-50 font-semibold text-obi-700'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700',
                      )}
                    >
                      <span className="font-mono text-[10px] text-slate-400">{mod.number}</span>
                      <span className="flex-1 leading-snug">{mod.title}</span>
                      {completed.includes(mod.id) && <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />}
                    </button>
                  </li>
                ))}
              </ol>
            </aside>

            {/* Conteúdo dos módulos */}
            <div className="min-w-0">
              {track.modules.map((mod) => {
                const isDone = completed.includes(mod.id)
                return (
                  <section
                    key={mod.id}
                    id={mod.id}
                    ref={(el) => {
                      moduleRefs.current[mod.id] = el
                    }}
                    className="mb-16 scroll-mt-4"
                  >
                    <div className="mb-5 flex items-baseline gap-3 border-b border-slate-100 pb-4">
                      <span className="font-mono text-xs text-slate-400">{mod.number}</span>
                      <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{mod.title}</h2>
                    </div>

                    <div className="prose-obi text-sm leading-relaxed text-slate-600">
                      <ReactMarkdown>{mod.body}</ReactMarkdown>
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-obi-500">
                        Perguntas de autoverificação
                      </p>
                      <ul className="space-y-1.5">
                        {mod.selfCheck.map((q, i) => (
                          <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-600">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCompleted(mod.id)}
                      className={cn(
                        'mt-4 flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors',
                        isDone
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'border-slate-200 text-slate-500 hover:border-obi-300 hover:text-obi-600',
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                      {isDone ? 'Módulo concluído' : 'Marcar como concluído'}
                    </button>
                  </section>
                )
              })}

              {/* FAQ */}
              <section className="mb-10">
                <div className="mb-5 flex items-baseline gap-3 border-b border-slate-100 pb-4">
                  <span className="font-mono text-xs text-slate-400">—</span>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    Perguntas frequentes
                  </h2>
                </div>

                <div className="space-y-2">
                  {track.faq.map((item, i) => {
                    const isOpen = openFaq === i
                    return (
                      <div key={i} className="rounded-2xl border border-slate-100">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium text-slate-800"
                        >
                          {item.question}
                          <ChevronDown className={cn('h-4 w-4 shrink-0 text-slate-400 transition-transform', isOpen && 'rotate-180')} />
                        </button>
                        {isOpen && (
                          <p className="px-4 pb-4 text-xs leading-relaxed text-slate-500">{item.answer}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
