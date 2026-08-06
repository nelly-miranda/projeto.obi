import React from 'react'
import { cn } from '@/lib/utils'

interface AppFrameProps {
  children: React.ReactNode
  className?: string
}

/**
 * Page shell on the black canvas: the sidebar sits flush on the background,
 * only the content panel (passed in via className/children) floats as a
 * rounded card, matching the reference dashboard layout.
 */
export function AppFrame({ children, className }: AppFrameProps) {
  return (
    <div className={cn('flex h-screen w-full gap-3 bg-canvas p-3 md:gap-4 md:p-4', className)}>
      {children}
    </div>
  )
}
