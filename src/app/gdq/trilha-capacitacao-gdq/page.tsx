import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ListChecks } from 'lucide-react'
import { buildNav } from '@/lib/content'
import { AppFrame } from '@/components/layout/AppFrame'
import { Sidebar } from '@/components/layout/Sidebar'
import { Button } from '@/components/ui/button'
import { TrainingTrackView } from '@/components/training/TrainingTrackView'
import { GDQ_TRAINING_TRACK } from '@/lib/gdq-training'

export default function TrilhaCapacitacaoGdqPage() {
  const nav = buildNav()

  return (
    <AppFrame>
      <Sidebar nav={nav} />

      <main className="app-frame flex flex-1 flex-col overflow-hidden rounded-4xl bg-white">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-100 px-8">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/gdq"
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:border-obi-300 hover:bg-obi-50 hover:text-obi-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar
            </Link>
            <div className="h-5 w-px shrink-0 bg-slate-200" />
            <h1 className="truncate text-sm font-semibold text-slate-900">Trilha de Capacitação: GDQ</h1>
          </div>

          <Link href="/gdq/plano-trabalho-gdq">
            <Button variant="outline" size="sm">
              <ListChecks className="h-3.5 w-3.5" />
              Ver Plano de Trabalho
            </Button>
          </Link>
        </header>

        <TrainingTrackView track={GDQ_TRAINING_TRACK} storageKey="obitec-trilha-gdq-progresso" />
      </main>
    </AppFrame>
  )
}
