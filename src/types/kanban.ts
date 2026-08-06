export interface StageAutomation {
  email?: string
  whatsapp?: string
}

export interface KanbanStage {
  id: string
  name: string
  objetivo: string
  criterioAvanco: string
  sla: string
  atividades: string[]
  automation?: StageAutomation
}

export interface KanbanProduct {
  id: string
  name: string
  price: number
}

export interface KanbanTask {
  id: string
  label: string
  done: boolean
}

export interface CustomField {
  id: string
  label: string
  value: string
}

export interface KanbanContact {
  id: string
  nome: string
  cargo?: string
  telefone?: string
  email?: string
}

export interface KanbanCard {
  id: string
  title: string
  empresa: string
  cnpj?: string
  pessoaFisica?: string
  cpf?: string
  contato: string
  contatos: KanbanContact[]
  fonte: string
  valor: number
  stageId: string
  tarefaStatus?: 'completed' | 'overdue' | null
  produtos: KanbanProduct[]
  tarefas: KanbanTask[]
  camposPersonalizados: CustomField[]
  criadoEm: string
  ultimaAtividade?: string
  diasNaEtapa?: number
}

export type PipelineSlug = 'gdq' | 'nutricao' | 'oportunidades' | 'parceiros'
