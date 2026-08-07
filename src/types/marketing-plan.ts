export interface MarketingAction {
  id: string
  title: string
  description: string
}

export interface MarketingPhase {
  id: string
  number: string
  title: string
  intro: string
  pillars: string[]
  actions: MarketingAction[]
}

export type MarketingTaskStatus = 'pendente' | 'em-andamento' | 'concluido'

export interface TaskMessage {
  id: string
  author: string
  text: string
  attachmentName?: string
  attachmentUrl?: string
  createdAt: string
}

export interface MarketingTaskCard {
  id: string
  title: string
  description: string
  phaseId: string
  owner: string
  participants: string[]
  status: MarketingTaskStatus
  dueDate?: string
  messages: TaskMessage[]
}
