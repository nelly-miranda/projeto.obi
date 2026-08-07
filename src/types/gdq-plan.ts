import type { TaskMessage } from './marketing-plan'

export type GdqTaskStatus = 'nova-tarefa' | 'em-execucao' | 'pendente' | 'concluido'

export interface GdqStage {
  id: GdqTaskStatus
  label: string
}

export interface GdqTaskCard {
  id: string
  title: string
  description: string
  status: GdqTaskStatus
  owner: string
  participants: string[]
  dueDate?: string
  messages: TaskMessage[]
}

export type { TaskMessage }
