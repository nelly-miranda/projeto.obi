import type { MarketingPhase } from '@/types/marketing-plan'
import type { GdqTaskCard } from '@/types/gdq-plan'

// Conteúdo baseado em content/pipelines/gdq.md (etapas, critérios de avanço,
// SLA, KPIs e governança já documentados). As 7 etapas do GDQ foram
// agrupadas em 5 fases de trabalho, no mesmo formato do Plano de Ação de
// Marketing. Nenhuma meta ou SLA foi inventado.
export const GDQ_PHASES: MarketingPhase[] = [
  {
    id: 'fase-1',
    number: '01',
    title: 'Entrada e Registro de Leads',
    intro:
      'Esta primeira fase é volumétrica e automatizada: empresas entram via automações, parceiros e canais ativos, sem fricção humana. O objetivo é registrar todo lead que entra em até 24h, já classificado por canal.',
    pillars: [
      'Perfil A (empresa em movimento): o sinal de qualificação é o momento, não o tamanho. Exemplos: aporte recente, nova liderança, expansão de operação, contratação ativa de TI.',
      'Perfil B (dor declarada): empresa que já tentou resolver um problema técnico e não conseguiu, ou que opera de forma manual e limitada.',
      'O que tira uma empresa do funil: fora dos nichos prioritários, sem problema de negócio identificado, fora do escopo de produtos da OBI.TEC, ou já é cliente ativo.',
    ],
    actions: [
      {
        id: 'gdq-f1-a1',
        title: 'Validar Origem e Ecossistema de Entrada',
        description:
          'Ao chegar um novo lead, confirmar por qual canal ele entrou: parceiro ativo, prospecção no LinkedIn, evento/conteúdo ou indicação. Cada canal tem um sinal de dor implícito diferente, então essa validação já orienta a abordagem das próximas etapas.',
      },
      {
        id: 'gdq-f1-a2',
        title: 'Confirmar Dados Básicos da Empresa',
        description:
          'Registrar empresa, setor e canal de entrada. Sem esses três dados preenchidos, o lead não atende ao critério de avanço da etapa Novo Lead e não deve seguir para o Enriquecimento.',
      },
      {
        id: 'gdq-f1-a3',
        title: 'Classificar o Canal de Entrada',
        description:
          'Marcar o lead como parceiro, LinkedIn, evento ou indicação. Leads de indicação têm prioridade na fila por terem conversão mais alta; leads de parceiros já chegam com sinal de dor implícito pelo contexto do parceiro.',
      },
    ],
  },
  {
    id: 'fase-2',
    number: '02',
    title: 'Enriquecimento e Qualificação',
    intro:
      'Antes de qualquer abordagem, é preciso complementar os dados do lead e confirmar que ele realmente combina com o perfil de cliente ideal. O prazo documentado para essa etapa é de 3 a 5 dias.',
    pillars: [
      'Critério de avanço: decisor identificado com pelo menos um sinal de dor mapeado.',
      'Sem esse sinal de dor mapeado, o lead não deve seguir para Abordagem Ativa: ele é reclassificado para Nutrição.',
    ],
    actions: [
      {
        id: 'gdq-f2-a1',
        title: 'Completar Dados do Decisor',
        description:
          'Buscar no LinkedIn, no site da empresa ou em bases já disponíveis quem é o decisor real (não apenas um contato genérico), para que a abordagem da próxima fase já saiba com quem falar.',
      },
      {
        id: 'gdq-f2-a2',
        title: 'Identificar o Sinal de Dor de Negócio',
        description:
          'Mapear ao menos um sinal concreto de dor: gargalo operacional, retrabalho, dependência de planilha, sistema que não integra, ou um dos sinais de momento do Perfil A (aporte, nova liderança, expansão).',
      },
      {
        id: 'gdq-f2-a3',
        title: 'Classificar: Abordagem Ativa ou Nutrição',
        description:
          'Com o decisor e o sinal de dor mapeados, decidir se o lead já está pronto para uma abordagem ativa agora, ou se ainda não tem o timing certo e deve entrar no sub-pipeline de Nutrição.',
      },
    ],
  },
  {
    id: 'fase-3',
    number: '03',
    title: 'Abordagem Ativa e Engajamento',
    intro:
      'Aqui começa o contato direto e personalizado com o decisor. Se não houver resposta em 5 tentativas, o lead é movido para Nutrição, em vez de continuar sendo trabalhado sem sinal de interesse.',
    pillars: [
      'Critério de avanço da Abordagem Ativa: o lead respondeu ou confirmou reunião.',
      'Critério de avanço do Engajamento: lead com dor registrada e reunião agendada ou confirmada.',
      'Cada toque de abordagem deve trazer uma referência real ao contexto da empresa, nunca um script genérico repetido para todos os leads.',
    ],
    actions: [
      {
        id: 'gdq-f3-a1',
        title: 'Enviar Sequência de Abordagem',
        description:
          'Disparar a sequência combinando e-mail, LinkedIn e telefone, personalizando cada mensagem com uma referência específica ao contexto da empresa (o sinal de dor ou de momento identificado na fase anterior).',
      },
      {
        id: 'gdq-f3-a2',
        title: 'Registrar Tentativas e Respostas no CRM',
        description:
          'Anotar cada tentativa de contato e a resposta obtida (ou a ausência dela). Depois de 5 tentativas sem resposta, mover o lead para Nutrição em vez de continuar insistindo sem sinal de interesse.',
      },
      {
        id: 'gdq-f3-a3',
        title: 'Explorar a Dor de Negócio em Profundidade',
        description:
          'Quando o lead responde e demonstra interesse, ir além do sinal inicial: entender o contexto estratégico completo da empresa antes de propor qualquer reunião de diagnóstico.',
      },
      {
        id: 'gdq-f3-a4',
        title: 'Agendar o Diagnóstico com o Decisor Correto',
        description:
          'Confirmar que a reunião será marcada com a pessoa certa (o decisor identificado na fase de Enriquecimento), não com um interlocutor sem poder de decisão.',
      },
    ],
  },
  {
    id: 'fase-4',
    number: '04',
    title: 'Diagnóstico e Reagendamento',
    intro:
      'Fase da primeira reunião de fato com o decisor. Quando a reunião não acontece no prazo, o processo continua ativo por meio de reagendamento, mas com um limite claro antes de desistir daquele lead.',
    pillars: [
      'Critério de avanço do Diagnóstico: reunião realizada com pelo menos uma dor de negócio documentada.',
      'Reagendamento tem limite de 2 tentativas antes de o lead ser movido para Nutrição.',
      'Meta documentada de tempo total do GDQ (Novo Lead até Encaminhamento): menos de 30 dias úteis.',
    ],
    actions: [
      {
        id: 'gdq-f4-a1',
        title: 'Preparar Briefing Setorial da Reunião',
        description:
          'Antes da reunião de diagnóstico, montar um briefing curto com o contexto da empresa, o setor (Agro, Fintech ou Educação) e a dor já mapeada, para não repetir perguntas que já foram respondidas.',
      },
      {
        id: 'gdq-f4-a2',
        title: 'Confirmar Participantes e Pauta',
        description:
          'Garantir que o decisor correto vai participar e que a pauta da reunião está clara para todos antes do horário marcado.',
      },
      {
        id: 'gdq-f4-a3',
        title: 'Registrar Dores e Decisores Durante a Reunião',
        description:
          'Durante o diagnóstico, anotar objetivamente as dores relatadas e quem são os decisores envolvidos, documentando tudo para não depender da memória de quem conduziu a reunião.',
      },
      {
        id: 'gdq-f4-a4',
        title: 'Gerenciar Reagendamentos com Limite Claro',
        description:
          'Se a reunião não ocorrer no prazo, registrar o motivo e reenviar uma nova proposta de data em até 3 dias úteis. Depois de 2 reagendamentos sem sucesso, reclassificar o lead para Nutrição.',
      },
    ],
  },
  {
    id: 'fase-5',
    number: '05',
    title: 'Encaminhamento e Governança',
    intro:
      'Última fase do GDQ: passar o lead qualificado ao Pipeline de Oportunidades com todo o histórico documentado, e manter a governança semanal que mantém o funil saudável.',
    pillars: [
      'A passagem ao Pipeline de Oportunidades exige: interlocutor identificado, dor de negócio validada, estimativa de momento de decisão e histórico de contatos documentado.',
      'Reunião semanal entre Pré-vendas e Marketing para revisar leads travados, motivos de perda e ajuste de scripts.',
      'Metas documentadas: conversão Novo Lead → Encaminhamento acima de 15% ao mês; taxa de aceite pelo vendedor acima de 80%.',
    ],
    actions: [
      {
        id: 'gdq-f5-a1',
        title: 'Confirmar Interlocutor, Dor e Momento de Decisão',
        description:
          'Antes de encaminhar, checar que os três pontos estão claros: quem decide, qual é a dor de negócio validada e quando a decisão deve acontecer.',
      },
      {
        id: 'gdq-f5-a2',
        title: 'Documentar Contexto e Histórico no CRM',
        description:
          'Reunir todo o histórico de contatos e o contexto acumulado ao longo das etapas anteriores em um único registro, para o vendedor não precisar repetir nenhuma pergunta já respondida.',
      },
      {
        id: 'gdq-f5-a3',
        title: 'Realizar a Passagem em até 24h',
        description:
          'Formalizar a passagem do lead ao Pipeline de Oportunidades dentro do prazo de 24h, registrando a transição formalmente no pipeline.',
      },
      {
        id: 'gdq-f5-a4',
        title: 'Manter a Cadência Semanal de Revisão',
        description:
          'Participar da reunião semanal entre Pré-vendas e Marketing para revisar leads travados, entender motivos de perda e ajustar os scripts de abordagem usados nas fases anteriores.',
      },
      {
        id: 'gdq-f5-a5',
        title: 'Acompanhar o Sub-pipeline de Nutrição',
        description:
          'Leads sem resposta ou sem timing certo entram automaticamente na Nutrição. Acompanhar os sinais de engajamento (abertura, clique) para reavaliar a reativação desses leads no GDQ.',
      },
    ],
  },
]

function task(
  id: string,
  title: string,
  description: string,
  status: GdqTaskCard['status'],
  owner: string,
): GdqTaskCard {
  return { id, title, description, status, owner, participants: [], dueDate: undefined, messages: [] }
}

// Tarefas reais de exemplo, extraídas das atividades documentadas em cada
// etapa do GDQ, distribuídas nos 4 status para popular o quadro inicial.
export const INITIAL_GDQ_TASKS: GdqTaskCard[] = [
  task('gdq-t1', 'Validar origem e ecossistema de entrada', 'Confirmar por qual canal o lead entrou: parceiro, LinkedIn, evento ou indicação.', 'nova-tarefa', 'Marketing'),
  task('gdq-t2', 'Completar dados do decisor', 'Buscar no LinkedIn, site ou base quem é o decisor real da empresa.', 'nova-tarefa', 'Pré-vendas'),
  task('gdq-t3', 'Enviar sequência de abordagem', 'Disparar e-mail + LinkedIn + telefone, personalizando com o contexto da empresa.', 'em-execucao', 'Pré-vendas'),
  task('gdq-t4', 'Preparar briefing setorial da reunião', 'Montar o briefing com contexto e dor já mapeada antes do diagnóstico.', 'em-execucao', 'Pré-vendas'),
  task('gdq-t5', 'Reenviar proposta de nova data', 'Reagendamento após reunião não realizada, respeitando o prazo de 3 dias úteis.', 'pendente', 'Pré-vendas'),
  task('gdq-t6', 'Registrar motivo do reagendamento', 'Documentar por que a reunião de diagnóstico não ocorreu no prazo original.', 'pendente', 'Pré-vendas'),
  task('gdq-t7', 'Confirmar interlocutor, dor e momento de decisão', 'Checagem final antes de encaminhar o lead ao Pipeline de Oportunidades.', 'concluido', 'Marketing + Pré-vendas'),
  task('gdq-t8', 'Registrar passagem formal ao pipeline', 'Formalizar a transição documentada ao Pipeline de Oportunidades em até 24h.', 'concluido', 'Marketing + Pré-vendas'),
]
