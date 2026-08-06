import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border border-transparent bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'text-obi-700',
        active: 'text-slate-700',
        draft: 'text-slate-500',
        review: 'text-slate-700',
        archived: 'text-slate-700',
        outline: 'border-slate-200 bg-transparent text-slate-600',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

const dotVariants = cva('h-1.5 w-1.5 shrink-0 rounded-full', {
  variants: {
    variant: {
      default: 'bg-obi-500',
      active: 'bg-status-success',
      draft: 'bg-slate-400',
      review: 'bg-status-info',
      archived: 'bg-status-pending',
      outline: 'bg-slate-400',
    },
  },
  defaultVariants: { variant: 'default' },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <span className={cn(dotVariants({ variant }))} aria-hidden="true" />
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
