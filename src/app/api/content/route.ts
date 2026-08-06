import { NextRequest, NextResponse } from 'next/server'
import { getContentItem, saveContentItem, deleteContentItem, getSectionItems } from '@/lib/content'
import type { ContentSection } from '@/types/content'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const section = searchParams.get('section') as ContentSection
  const slug = searchParams.get('slug')

  if (!section) {
    return NextResponse.json({ error: 'section required' }, { status: 400 })
  }

  if (slug) {
    const item = getContentItem(section, slug)
    if (!item) return NextResponse.json({ error: 'not found' }, { status: 404 })
    return NextResponse.json(item)
  }

  const items = getSectionItems(section)
  return NextResponse.json(items)
}

export async function PUT(req: NextRequest) {
  try {
    const { section, slug, frontmatter, body } = await req.json()
    if (!section || !slug) {
      return NextResponse.json({ error: 'section and slug required' }, { status: 400 })
    }
    saveContentItem(section as ContentSection, slug, frontmatter, body)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const section = searchParams.get('section') as ContentSection
  const slug = searchParams.get('slug')

  if (!section || !slug) {
    return NextResponse.json({ error: 'section and slug required' }, { status: 400 })
  }

  deleteContentItem(section, slug)
  return NextResponse.json({ ok: true })
}
