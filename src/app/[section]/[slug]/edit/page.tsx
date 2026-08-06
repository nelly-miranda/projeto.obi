import React from 'react'
import { getContentItem, buildNav } from '@/lib/content'
import { AppFrame } from '@/components/layout/AppFrame'
import { Sidebar } from '@/components/layout/Sidebar'
import { ContentEditor } from '@/components/editor/ContentEditor'
import type { ContentSection } from '@/types/content'

interface PageProps {
  params: { section: string; slug: string }
}

export default async function EditPage({ params }: PageProps) {
  const { section, slug } = params
  const nav = buildNav()
  const isNew = slug === 'new'
  const item = isNew ? undefined : getContentItem(section as ContentSection, slug) ?? undefined

  return (
    <AppFrame>
      <Sidebar nav={nav} />
      <main className="app-frame flex flex-1 flex-col overflow-hidden rounded-4xl bg-white">
        <ContentEditor
          item={item}
          section={section as ContentSection}
          slug={isNew ? undefined : slug}
          isNew={isNew}
        />
      </main>
    </AppFrame>
  )
}
