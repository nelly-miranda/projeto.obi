'use client'

import React, { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SaveToastProps {
  message?: string
  onDone: () => void
}

export function SaveToast({ message = 'Tarefa salva', onDone }: SaveToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const show = requestAnimationFrame(() => setVisible(true))
    const hide = setTimeout(() => setVisible(false), 2200)
    const remove = setTimeout(onDone, 2500)
    return () => {
      cancelAnimationFrame(show)
      clearTimeout(hide)
      clearTimeout(remove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-medium text-white shadow-card-lg transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
      )}
    >
      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
      {message}
    </div>
  )
}
