import React from 'react'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { buildNav } from '@/lib/content'
import { AppFrame } from '@/components/layout/AppFrame'
import { Sidebar } from '@/components/layout/Sidebar'
import { TaskBoard } from '@/components/gdq-kanban/TaskBoard'
import { INITIAL_GDQ_TASKS } from '@/lib/gdq-plan'

export default function TarefasGdqPage() {
  const nav = buildNav()

  return (
    <AppFrame>
      <Sidebar nav={nav} />

      <main className="app-frame flex flex-1 flex-col overflow-hidden rounded-4xl bg-white">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-100 px-8">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-slate-900">Kanban: Tarefas do GDQ</h1>
            <p className="text-xs text-slate-400">Nova Tarefa, Em Execução, Pendente e Concluído</p>
          </div>

          <Link
            href="/gdq/plano-trabalho-gdq"
            className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:border-obi-300 hover:text-obi-600"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Ver plano
          </Link>
        </header>

        <TaskBoard initialTasks={INITIAL_GDQ_TASKS} />
      </main>
    </AppFrame>
  )
}
