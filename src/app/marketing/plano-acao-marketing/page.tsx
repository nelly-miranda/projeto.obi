import React from 'react'
import Link from 'next/link'
import { ArrowLeft, LayoutGrid } from 'lucide-react'
import { buildNav } from '@/lib/content'
import { AppFrame } from '@/components/layout/AppFrame'
import { Sidebar } from '@/components/layout/Sidebar'
import { Button } from '@/components/ui/button'
import { MarketingPlanView } from '@/components/marketing-plan/MarketingPlanView'
import { MARKETING_PHASES } from '@/lib/marketing-plan'

const OBJECTIVES = [
  {
    title: 'Adquirir leads dos nichos prioritários',
    description:
      'Trazer leads qualificados de Agro, Fintechs e Educação por meio de campanhas, eventos e listas frias, alimentando o GDQ para que o time comercial tenha o que trabalhar.',
  },
  {
    title: 'Conquistar novos parceiros',
    description:
      'Ampliar o alcance da OBI.TEC fechando novas parcerias de plataforma (como já acontece com a Blackboard), em vez de depender só de indicação pessoal.',
  },
]

const PRINCIPLE =
  'Em toda abordagem, ensine algo novo ao cliente antes de vender. É esse ensinamento, e não a insistência, que gera o retorno sobre o processo: confiança e leads que respondem.'

export default function PlanoAcaoMarketingPage() {
  const nav = buildNav()

  return (
    <AppFrame>
      <Sidebar nav={nav} />

      <main className="app-frame flex flex-1 flex-col overflow-hidden rounded-4xl bg-white">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-100 px-8">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/marketing"
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:border-obi-300 hover:bg-obi-50 hover:text-obi-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar
            </Link>
            <div className="h-5 w-px shrink-0 bg-slate-200" />
            <h1 className="truncate text-sm font-semibold text-slate-900">Plano de Ação: Marketing</h1>
          </div>

          <Link href="/marketing/tarefas-marketing">
            <Button variant="outline" size="sm">
              <LayoutGrid className="h-3.5 w-3.5" />
              Ver Kanban
            </Button>
          </Link>
        </header>

        <MarketingPlanView phases={MARKETING_PHASES} objectives={OBJECTIVES} principle={PRINCIPLE} />
      </main>
    </AppFrame>
  )
}
