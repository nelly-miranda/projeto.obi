import type { MarketingTaskStatus } from '@/types/marketing-plan'

export const STATUS_LABEL: Record<MarketingTaskStatus, string> = {
  pendente: 'Pendente',
  'em-andamento': 'Em andamento',
  concluido: 'Concluído',
}

export const STATUS_BADGE_CLASS: Record<MarketingTaskStatus, string> = {
  pendente: 'bg-slate-100 text-slate-600',
  'em-andamento': 'bg-obi-100 text-obi-700',
  concluido: 'bg-emerald-100 text-emerald-700',
}

export const STATUS_OPTIONS: MarketingTaskStatus[] = ['pendente', 'em-andamento', 'concluido']

export function formatDueDate(iso?: string): string {
  if (!iso) return ''
  const [year, month, day] = iso.split('-')
  if (!year || !month || !day) return iso
  return `${day}/${month}/${year}`
}
