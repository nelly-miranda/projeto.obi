'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Building2, Workflow, FileText, BarChart2, GitBranch,
  Users, Target, BookOpen, Layers, ChevronDown,
  PanelLeftClose, PanelLeftOpen, Bot, Sparkles, ShieldCheck, PenLine, LineChart,
  Megaphone, LayoutGrid, Package, ListChecks,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavSection, NavItem } from '@/types/content'

// icon map for dynamic resolution
const ICONS: Record<string, React.ElementType> = {
  Building2, Workflow, FileText, BarChart2, GitBranch,
  Users, Target, BookOpen, Layers,
  Bot, Sparkles, ShieldCheck, PenLine, LineChart,
  Megaphone, LayoutGrid, Package, ListChecks,
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
  const [collapsed, setCollapsed] = useState(false)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(nav.map((section) => [section.id, true])),
  )

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside
      className={cn(
        'flex h-full shrink-0 flex-col overflow-hidden transition-[width] duration-300 ease-in-out',
        collapsed ? 'w-[64px]' : 'w-[240px]',
      )}
    >
      {/* Logo + toggle (o botão fica sempre no canto superior) */}
      <div
        className={cn(
          'flex h-20 shrink-0 items-center border-b border-white/[0.06]',
          collapsed ? 'justify-center px-2' : 'justify-between px-5',
        )}
      >
        {!collapsed && (
          <img
            src="/obitec-logo.png"
            alt="OBI.TEC"
            className="logo-glow h-9 md:h-10 w-auto max-w-[70%] object-contain"
          />
        )}
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
          title={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="sidebar-scroll flex-1 overflow-y-auto py-4 px-2.5">
        {nav.map((section) => {
          const isOpen = openSections[section.id] ?? true
          const showItems = collapsed || isOpen

          return (
            <div key={section.id} className="mb-5">
              {/* Section label (gaveta) */}
              {collapsed ? (
                <div className="mb-1.5 flex justify-center py-1" title={section.label}>
                  <NavIcon name={section.icon} className="h-3.5 w-3.5 text-slate-600" />
                </div>
              ) : (
                <div className="flex items-center gap-1 mb-1.5">
                  <Link
                    href={`/${section.id}`}
                    title={`Ver todos os documentos de ${section.label}`}
                    className={cn(
                      'flex flex-1 items-center gap-2 rounded-lg px-2.5 py-1 transition-colors',
                      pathname === `/${section.id}`
                        ? 'bg-white/[0.09] text-white'
                        : 'hover:bg-white/[0.04]',
                    )}
                  >
                    <NavIcon name={section.icon} className="h-3 w-3 text-slate-300" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-200">
                      {section.label}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    aria-label={isOpen ? `Recolher ${section.label}` : `Expandir ${section.label}`}
                    className="rounded-lg p-1 text-slate-600 hover:bg-white/[0.04] transition-colors"
                  >
                    <ChevronDown
                      className={cn(
                        'h-3 w-3 transition-transform duration-150',
                        !isOpen && '-rotate-90',
                      )}
                    />
                  </button>
                </div>
              )}

              {/* Items */}
              {showItems && (
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
                          title={item.title}
                          className={cn(
                            'group flex items-center rounded-xl text-[13px] transition-all duration-150',
                            collapsed ? 'justify-center p-2.5' : 'gap-2.5 px-3 py-2.5',
                            isActive
                              ? 'bg-white/[0.09] text-white font-semibold'
                              : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-200',
                          )}
                        >
                          <NavIcon
                            name={item.icon}
                            className={cn(isActive ? 'text-obi-400' : 'text-slate-500 group-hover:text-slate-300')}
                          />
                          {!collapsed && <span className="truncate font-medium">{item.title}</span>}
                          {!collapsed && item.status === 'draft' && (
                            <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-slate-600">
                              rascunho
                            </span>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}

              <div className="mt-4 h-px bg-white/[0.055]" />
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={cn('border-t border-white/[0.06] py-4', collapsed ? 'px-2 text-center' : 'px-5')}>
        {!collapsed && <p className="text-[10px] text-slate-600">v0.1.0 · OBI.TEC © 2026</p>}
      </div>
    </aside>
  )
}
