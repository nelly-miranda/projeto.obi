'use client'

import React, { useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ChatWidget } from './ChatWidget'

export function ObiAssistantWidget() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir o assistente Obi"
        className={cn(
          'fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-card-lg transition-all hover:scale-105 hover:bg-slate-800',
          open && 'pointer-events-none translate-y-2 opacity-0',
        )}
      >
        <Sparkles className="h-4 w-4 text-obi-300" />
        Obi
      </button>

      {/* Painel lateral */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-md p-3 transition-transform duration-300 ease-out md:p-4',
          open ? 'translate-x-0' : 'pointer-events-none translate-x-full',
        )}
        aria-hidden={!open}
      >
        <div className="relative h-full">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar o assistente Obi"
            className="absolute -left-3.5 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-400 shadow-card-lg transition-colors hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>

          <ChatWidget />
        </div>
      </div>

      {/* Fundo clicável para fechar, sem bloquear a leitura da página */}
      {open && (
        <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
      )}
    </>
  )
}
