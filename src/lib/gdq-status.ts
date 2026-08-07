import type { GdqStage, GdqTaskStatus } from '@/types/gdq-plan'

export const GDQ_STAGES: GdqStage[] = [
  { id: 'nova-tarefa', label: 'Nova Tarefa' },
  { id: 'em-execucao', label: 'Em Execução' },
  { id: 'pendente', label: 'Pendente' },
  { id: 'concluido', label: 'Concluído' },
]

export const GDQ_STATUS_LABEL: Record<GdqTaskStatus, string> = {
  'nova-tarefa': 'Nova Tarefa',
  'em-execucao': 'Em Execução',
  pendente: 'Pendente',
  concluido: 'Concluído',
}
