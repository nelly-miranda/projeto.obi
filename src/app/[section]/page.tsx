import React from 'react'
import { notFound } from 'next/navigation'
import { getAllSections, getSectionItems, buildNav } from '@/lib/content'
import { AppFrame } from '@/components/layout/AppFrame'
import { Sidebar } from '@/components/layout/Sidebar'
import { SectionContentGrid } from '@/components/content/SectionContentGrid'
import type { ContentSection } from '@/types/content'

const SECTION_DESCRIPTION: Partial<Record<ContentSection, string>> = {
  'base-conhecimento':
    'Documentos-fonte de estratégia, BMC e pipelines da OBI.TEC. Cada card abre o documento completo dentro do app e também linka o Google Doc original, a mesma base que os agentes de IA leem para entender a estratégia e os pipelines de GDQ e Marketing.',
  pipelines: 'Processos operacionais de aquisição e relacionamento da OBI.TEC, etapa a etapa.',
  projeto: 'Contexto do projeto de transformação comercial da OBI.TEC.',
  marketing: 'Plano de ação de marketing e seus desdobramentos: as fases, os objetivos e as tarefas que alimentam o pipeline comercial da OBI.TEC.',
  gdq: 'Plano de trabalho do GDQ e suas tarefas: o desdobramento das 7 etapas do pipeline em fases de execução, com um Kanban por status.',
  'produtos-servicos': 'Catálogo editável dos produtos e serviços da OBI.TEC, por vertical, com espaço para preencher quantidade e valor de cada item.',
  agentes: 'Agentes de IA do Claude Code conectados a este projeto, cada um fundamentado apenas no que está documentado em content/, nenhum inventa dados fora daqui.',
}

interface PageProps {
  params: { section: string }
}

export async function generateStaticParams() {
  return []
}

export default async function SectionPage({ params }: PageProps) {
  const { section } = params

  if (!getAllSections().includes(section as ContentSection)) notFound()

  const nav = buildNav()
  const items = getSectionItems(section as ContentSection)
  const navSection = nav.find((s) => s.id === section)
  const label = navSection?.label ?? section

  return (
    <AppFrame>
      <Sidebar nav={nav} />

      <main className="app-frame flex flex-1 flex-col overflow-hidden rounded-4xl bg-white">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-100 px-8">
          <h1 className="text-sm font-semibold text-slate-900">{label}</h1>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="mx-auto max-w-5xl">
            {SECTION_DESCRIPTION[section as ContentSection] && (
              <p className="mb-8 max-w-2xl text-sm leading-relaxed text-slate-500">
                {SECTION_DESCRIPTION[section as ContentSection]}
              </p>
            )}

            <SectionContentGrid items={items} />
          </div>
        </div>
      </main>
    </AppFrame>
  )
}
