'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Eye, EyeOff, ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import type { ContentItem, ContentFrontmatter, ContentSection } from '@/types/content'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ContentEditorProps {
  item?: ContentItem
  section: ContentSection
  slug?: string
  isNew?: boolean
}

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Rascunho' },
  { value: 'review', label: 'Em revisão' },
  { value: 'active', label: 'Ativo' },
  { value: 'archived', label: 'Arquivado' },
]

const ICON_OPTIONS = [
  'FileText', 'GitBranch', 'Users', 'Target', 'BarChart2',
  'BookOpen', 'Layers', 'Building2', 'Workflow',
]

export function ContentEditor({ item, section, slug, isNew = false }: ContentEditorProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [preview, setPreview] = useState(false)
  const [saved, setSaved] = useState(false)

  const [frontmatter, setFrontmatter] = useState<ContentFrontmatter>(
    item?.frontmatter ?? {
      title: '',
      section,
      slug: slug ?? '',
      description: '',
      status: 'draft',
      icon: 'FileText',
      order: 99,
      owner: '',
      tags: [],
      objective: '',
      team: '',
    },
  )
  const [body, setBody] = useState(item?.body ?? '')
  const [tagsInput, setTagsInput] = useState((item?.frontmatter.tags ?? []).join(', '))

  const currentSlug = slug ?? frontmatter.slug

  async function handleSave() {
    startTransition(async () => {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)

      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section,
          slug: currentSlug,
          frontmatter: { ...frontmatter, tags },
          body,
        }),
      })

      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      if (isNew) router.push(`/${section}/${currentSlug}`)
      else router.refresh()
    })
  }

  async function handleDelete() {
    if (!confirm('Remover este documento?')) return
    await fetch(`/api/content?section=${section}&slug=${currentSlug}`, { method: 'DELETE' })
    router.push('/')
  }

  const set = (key: keyof ContentFrontmatter) => (val: string) =>
    setFrontmatter((prev) => ({ ...prev, [key]: val }))

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-slate-100 bg-white px-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPreview((v) => !v)}
            className="text-slate-600"
          >
            {preview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {preview ? 'Editar' : 'Preview'}
          </Button>

          {!isNew && (
            <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-500 hover:text-red-600 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}

          <Button onClick={handleSave} disabled={isPending} size="sm">
            <Save className="h-4 w-4" />
            {isPending ? 'Salvando…' : saved ? 'Salvo ✓' : 'Salvar'}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Frontmatter panel */}
        <aside className="w-72 shrink-0 overflow-y-auto border-r border-slate-100 bg-slate-50/60 p-5 space-y-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Metadados
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Título</label>
                <Input value={frontmatter.title} onChange={(e) => set('title')(e.target.value)} placeholder="Título do documento" />
              </div>

              {isNew && (
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">Slug (URL)</label>
                  <Input value={frontmatter.slug} onChange={(e) => set('slug')(e.target.value)} placeholder="ex: gdq-pipeline" className="font-mono text-xs" />
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Descrição</label>
                <Textarea value={frontmatter.description ?? ''} onChange={(e) => set('description')(e.target.value)} placeholder="Resumo em uma frase" className="min-h-[60px] font-sans text-xs resize-none" />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Status</label>
                <Select value={frontmatter.status} onValueChange={set('status')}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Ícone</label>
                <Select value={frontmatter.icon ?? 'FileText'} onValueChange={set('icon')}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((i) => (
                      <SelectItem key={i} value={i}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Responsável</label>
                <Input value={frontmatter.owner ?? ''} onChange={(e) => set('owner')(e.target.value)} placeholder="Nome" />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Equipe</label>
                <Input value={frontmatter.team ?? ''} onChange={(e) => set('team')(e.target.value)} placeholder="Ex: Marketing e Pré-vendas" />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Objetivo</label>
                <Textarea value={frontmatter.objective ?? ''} onChange={(e) => set('objective')(e.target.value)} placeholder="Objetivo principal" className="min-h-[60px] font-sans text-xs resize-none" />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Tags (separadas por vírgula)</label>
                <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="agro, fintech, parceiros" />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">Ordem</label>
                <Input type="number" value={frontmatter.order ?? ''} onChange={(e) => setFrontmatter((p) => ({ ...p, order: parseInt(e.target.value) || 99 }))} placeholder="1" />
              </div>
            </div>
          </div>
        </aside>

        {/* Body editor / preview */}
        <div className="flex-1 overflow-y-auto bg-white">
          {preview ? (
            <div className="prose-obi max-w-3xl mx-auto px-8 py-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </div>
          ) : (
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="h-full w-full resize-none rounded-none border-0 bg-transparent p-8 text-sm font-mono text-slate-700 leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
              placeholder={`# Título do documento\n\nEscreva o conteúdo em Markdown...\n\n## Seção\n\nConteúdo aqui.`}
            />
          )}
        </div>
      </div>
    </div>
  )
}
