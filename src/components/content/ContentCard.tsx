'use client'

import React from 'react'
import Link from 'next/link'
import { FileText, ArrowRight, Calendar, User, Tag, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn, formatDate } from '@/lib/utils'
import type { ContentItem, ContentStatus, ViewMode } from '@/types/content'

const STATUS_LABEL: Record<ContentStatus, string> = {
  active: 'Ativo',
  draft: 'Rascunho',
  review: 'Em revisão',
  archived: 'Arquivado',
}

const STATUS_VARIANT: Record<ContentStatus, 'active' | 'draft' | 'review' | 'archived'> = {
  active: 'active',
  draft: 'draft',
  review: 'review',
  archived: 'archived',
}

interface ContentCardProps {
  item: ContentItem
  mode: ViewMode
}

export function ContentCard({ item, mode }: ContentCardProps) {
  const { frontmatter, section, slug } = item
  const href = `/${section}/${slug}`

  if (mode === 'list') {
    return (
      <Link href={href} className="block group">
        <div className="flex items-center gap-4 rounded-3xl border border-slate-200/60 bg-white px-5 py-4 shadow-card hover:border-obi-300 hover:shadow-card-lg transition-all duration-150">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-obi-50 transition-colors">
            <FileText className="h-4 w-4 text-slate-500 group-hover:text-obi-500" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-semibold text-slate-900 truncate">{frontmatter.title}</p>
              <Badge variant={STATUS_VARIANT[frontmatter.status]}>
                {STATUS_LABEL[frontmatter.status]}
              </Badge>
            </div>
            {frontmatter.description && (
              <p className="text-xs text-slate-500 truncate">{frontmatter.description}</p>
            )}
          </div>

          <div className="flex items-center gap-4 shrink-0 text-xs text-slate-400">
            {frontmatter.owner && (
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {frontmatter.owner}
              </span>
            )}
            {frontmatter.lastUpdated && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(frontmatter.lastUpdated)}
              </span>
            )}
            <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-obi-400 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </Link>
    )
  }

  // Grid mode
  return (
    <div className="group h-full">
      <Card className="flex h-full flex-col hover:border-obi-300 hover:shadow-card-lg transition-all duration-200">
        <Link href={href} className="block flex-1">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 transition-all duration-200 group-hover:-rotate-3 group-hover:scale-105 group-hover:bg-obi-50">
                <FileText className="h-4 w-4 text-slate-500 group-hover:text-obi-500" />
              </div>
              <Badge variant={STATUS_VARIANT[frontmatter.status]}>
                {STATUS_LABEL[frontmatter.status]}
              </Badge>
            </div>

            {/* Título com sublinhado animado no hover */}
            <h3 className="relative inline-block w-fit text-sm font-semibold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-obi-700">
              {frontmatter.title}
              <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-obi-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </h3>

            {frontmatter.description && (
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1.5">
                {frontmatter.description}
              </p>
            )}
          </CardHeader>

          <CardContent className="pt-0">
            {/* Meta fields */}
            <div className="space-y-2 mb-3">
              {frontmatter.objective && (
                <div className="rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Objetivo
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2">{frontmatter.objective}</p>
                </div>
              )}
              {(frontmatter.team || frontmatter.owner) && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <User className="h-3 w-3" />
                  <span className="truncate">{frontmatter.team ?? frontmatter.owner}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-1">
                {frontmatter.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500"
                  >
                    <Tag className="h-2.5 w-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Link>

        {/* Footer: data + Saber mais + link para o documento de origem */}
        <div className="mt-auto flex items-center justify-between gap-2 px-6 pb-5 pt-3 border-t border-slate-100">
          {frontmatter.lastUpdated ? (
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <Calendar className="h-3 w-3" />
              {formatDate(frontmatter.lastUpdated)}
            </span>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-3">
            {frontmatter.sourceUrl && (
              <a
                href={frontmatter.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-obi-600 transition-colors"
                title="Abrir documento original"
              >
                <ExternalLink className="h-3 w-3" />
                Original
              </a>
            )}
            <Link
              href={href}
              className="flex items-center gap-1 text-xs font-semibold text-obi-600 transition-all hover:gap-1.5 hover:text-obi-700"
            >
              Saber mais
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
