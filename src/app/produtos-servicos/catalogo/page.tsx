import React from 'react'
import { ExternalLink } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { buildNav, getContentItem } from '@/lib/content'
import { AppFrame } from '@/components/layout/AppFrame'
import { Sidebar } from '@/components/layout/Sidebar'
import { CatalogTable } from '@/components/catalog/CatalogTable'
import { INITIAL_CATALOG } from '@/lib/catalog'

export default function CatalogoPage() {
  const nav = buildNav()
  const item = getContentItem('produtos-servicos', 'catalogo')

  return (
    <AppFrame>
      <Sidebar nav={nav} />

      <main className="app-frame flex flex-1 flex-col overflow-hidden rounded-4xl bg-white">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-100 px-8">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-slate-900">Catálogo de Produtos e Serviços</h1>
            <p className="text-xs text-slate-400">Tabela editável, por vertical</p>
          </div>

          {item?.frontmatter.sourceUrl && (
            <a
              href={item.frontmatter.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-500 hover:border-obi-300 hover:text-obi-600"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Reunião de origem
            </a>
          )}
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="mx-auto max-w-6xl">
            {item?.body && (
              <div className="prose-obi mb-6 max-w-3xl text-sm leading-relaxed text-slate-500">
                <ReactMarkdown>{item.body}</ReactMarkdown>
              </div>
            )}
            <CatalogTable initialItems={INITIAL_CATALOG} />
          </div>
        </div>
      </main>
    </AppFrame>
  )
}
