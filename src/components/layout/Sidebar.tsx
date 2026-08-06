'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Building2, Workflow, FileText, BarChart2, GitBranch,
  Users, Target, BookOpen, Layers, PlusCircle, ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavSection, NavItem } from '@/types/content'

// icon map for dynamic resolution
const ICONS: Record<string, React.ElementType> = {
  Building2, Workflow, FileText, BarChart2, GitBranch,
  Users, Target, BookOpen, Layers, PlusCircle,
}

function NavIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? FileText
  return <Icon className={cn('h-4 w-4 shrink-0', className)} />
}

interface SidebarProps {
  nav: NavSection[]
}

export function Sidebar({ nav }: SidebarProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(nav.map((section) => [section.id, true])),
  )

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside className="flex h-full w-[240px] shrink-0 flex-col overflow-hidden">
      {/* Logo */}
      <div className="flex h-20 items-center px-5 py-5 border-b border-white/[0.06]">
        <img
          src="/obitec-logo.png"
          alt="OBI.TEC"
          className="logo-glow h-9 md:h-10 w-auto max-w-[90%] object-contain"
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2.5">
        {nav.map((section) => {
          const isOpen = openSections[section.id] ?? true

          return (
          <div key={section.id} className="mb-5">
            {/* Section label (gaveta) */}
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className="flex w-full items-center gap-2 px-2.5 mb-1.5 py-1 rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              <NavIcon name={section.icon} className="h-3 w-3 text-slate-600" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                {section.label}
              </span>
              <ChevronDown
                className={cn(
                  'ml-auto h-3 w-3 text-slate-600 transition-transform duration-150',
                  !isOpen && '-rotate-90',
                )}
              />
            </button>

            {/* Items */}
            {isOpen && (
            <ul className="space-y-1">
              {section.items.map((item) => {
                const href = item.section === 'pipelines'
                  ? `/pipelines/${item.slug}/kanban`
                  : `/${item.section}/${item.slug}`
                const isActive = pathname === href

                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      className={cn(
                        'group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] transition-all duration-150',
                        isActive
                          ? 'bg-white/[0.09] text-white font-semibold'
                          : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-200',
                      )}
                    >
                      <NavIcon
                        name={item.icon}
                        className={cn(isActive ? 'text-obi-400' : 'text-slate-500 group-hover:text-slate-300')}
                      />
                      <span className="truncate font-medium">{item.title}</span>
                      {item.status === 'draft' && (
                        <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-slate-600">
                          rascunho
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}

              {/* New item */}
              <li>
                <Link
                  href={`/${section.id}/new`}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] text-slate-600 hover:bg-white/[0.04] hover:text-slate-400 transition-colors"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Novo documento</span>
                </Link>
              </li>
            </ul>
            )}

            <div className="mt-4 h-px bg-white/[0.055]" />
          </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.06] px-5 py-4">
        <p className="text-[10px] text-slate-600">v0.1.0 · OBI.TEC © 2026</p>
      </div>
    </aside>
  )
}
