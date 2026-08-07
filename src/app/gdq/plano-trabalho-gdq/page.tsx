import React from 'react'
import Link from 'next/link'
import { ArrowLeft, LayoutGrid } from 'lucide-react'
import { buildNav } from '@/lib/content'
import { AppFrame } from '@/components/layout/AppFrame'
import { Sidebar } from '@/components/layout/Sidebar'
import { Button } from '@/components/ui/button'
import { MarketingPlanView } from '@/components/marketing-plan/MarketingPlanView'
import { GDQ_PHASES } from '@/lib/gdq-plan'

const OBJECTIVES = [
  {
    title: 'Qualificar antes de quantificar',
    description:
      'Garantir que cada lead que avança no GDQ tenha contexto mapeado, interlocutor identificado e dor de negócio validada, em vez de só gerar volume.',
  },
  {
    title: 'Passar o bastão com previsibilidade',
    description:
      'Encaminhar ao Pipeline de Oportunidades apenas leads com histórico completo, dentro do prazo de 30 dias úteis, para o vendedor não perder tempo com informação incompleta.',
  },
]

const PRINCIPLE =
  'Não é sobre gerar volume, e sim garantir que quem avança está pronto: contexto mapeado, interlocutor identificado e dor de negócio validada antes de qualquer passagem de etapa.'

export default function PlanoTrabalhoGdqPage() {
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
            <h1 className="truncate text-sm font-semibold text-slate-900">Plano de Trabalho: GDQ</h1>
          </div>

          <Link href="/gdq/tarefas-gdq">
            <Button variant="outline" size="sm">
              <LayoutGrid className="h-3.5 w-3.5" />
              Ver Kanban
            </Button>
          </Link>
        </header>

        <MarketingPlanView phases={GDQ_PHASES} objectives={OBJECTIVES} principle={PRINCIPLE} />
      </main>
    </AppFrame>
  )
}
