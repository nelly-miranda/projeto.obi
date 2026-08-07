import type { CatalogItem } from '@/types/catalog'

// Verticais e produtos reais levantados na reunião de entendimento de
// produtos e serviços com o Mauro (OBI.TEC). Quantidade e valor ficam em
// branco (0) de propósito: ninguém documentou preço ainda, o time preenche.
export const INITIAL_CATALOG: CatalogItem[] = [
  {
    id: 'cat-1',
    category: 'OB Agro',
    name: 'Desenvolvimento customizado para Agro',
    description: 'Soluções sob medida a partir da experiência da OBI.TEC com o agronegócio.',
    quantity: 1,
    unitValue: 0,
  },
  {
    id: 'cat-2',
    category: 'OBFIN',
    name: 'Desenvolvimento customizado para Fintechs',
    description: 'Soluções sob medida para o setor financeiro.',
    quantity: 1,
    unitValue: 0,
  },
  {
    id: 'cat-3',
    category: 'OBDEV',
    name: 'Desenvolvimento customizado e infraestrutura',
    description: 'Pilar geral: tudo que não se encaixa nas outras verticais, desenvolvimento sob medida e infraestrutura.',
    quantity: 1,
    unitValue: 0,
  },
  {
    id: 'cat-4',
    category: 'OBEDU',
    name: 'OB Certificados',
    description: 'Produto agnóstico de LMS (funciona sozinho ou integrado a Blackboard, Moodle ou D2L). Vendido ao mercado geral de instituições de ensino superior.',
    quantity: 1,
    unitValue: 0,
  },
  {
    id: 'cat-5',
    category: 'OBEDU',
    name: 'OB Regulação',
    description: 'Exclusivo para instituições de ensino superior do Brasil. Vendido ao mercado geral.',
    quantity: 1,
    unitValue: 0,
  },
  {
    id: 'cat-6',
    category: 'OBEDU',
    name: 'OB Core Sync',
    description: 'Produto exclusivo para clientes Blackboard, vendido também na América Latina.',
    quantity: 1,
    unitValue: 0,
  },
  {
    id: 'cat-7',
    category: 'OBEDU',
    name: 'OB CBO',
    description: 'Produto exclusivo para clientes Blackboard, vendido também na América Latina.',
    quantity: 1,
    unitValue: 0,
  },
  {
    id: 'cat-8',
    category: 'OBEDU',
    name: 'OB Portfólios',
    description: 'Produto exclusivo para clientes Blackboard, vendido também na América Latina.',
    quantity: 1,
    unitValue: 0,
  },
]
