import type { KanbanStage, KanbanCard, PipelineSlug } from '@/types/kanban'

// Etapas reais de cada pipeline, extraídas da documentação de processo
// (content/pipelines/*.md). A automação é uma simulação ilustrativa da
// experiência de arrastar o card, não um sistema real de envio.
export const KANBAN_STAGES: Record<PipelineSlug, KanbanStage[]> = {
  gdq: [
    {
      id: 'novo-lead',
      name: 'Novo Lead',
      objetivo: 'Registrar todos os leads que entram via automação, parceiros e canais ativos.',
      criterioAvanco: 'Lead com empresa, setor e canal de entrada registrados.',
      sla: 'Até 24h',
      atividades: [
        'Validar origem e ecossistema de entrada',
        'Confirmar dados básicos da empresa',
        'Classificar canal (parceiro, LinkedIn, evento, indicação)',
      ],
      automation: { email: 'E-mail de confirmação de recebimento enviado ao lead' },
    },
    {
      id: 'enriquecimento',
      name: 'Enriquecimento / Qualificação',
      objetivo: 'Complementar dados e confirmar aderência ao perfil antes da abordagem.',
      criterioAvanco: 'Decisor identificado com ao menos um sinal de dor mapeado.',
      sla: '3 a 5 dias',
      atividades: [
        'Completar dados do decisor (LinkedIn, site, base)',
        'Identificar sinal de dor de negócio',
        'Classificar: Abordagem Ativa ou Nutrição',
      ],
    },
    {
      id: 'abordagem-ativa',
      name: 'Abordagem Ativa',
      objetivo: 'Iniciar contato personalizado com o decisor.',
      criterioAvanco: 'Lead respondeu ou confirmou reunião. Sem resposta em 5 tentativas: mover para Nutrição.',
      sla: 'Até 10 dias',
      atividades: [
        'Enviar sequência de abordagem (email + LinkedIn + telefone)',
        'Registrar tentativas e respostas no CRM',
        'Personalizar cada toque com referência ao contexto da empresa',
      ],
      automation: {
        email: 'Sequência de e-mails de abordagem disparada',
        whatsapp: 'Mensagem inicial de contato enviada por WhatsApp',
      },
    },
    {
      id: 'engajamento',
      name: 'Engajamento',
      objetivo: 'Aprofundar a conversa com o lead que demonstrou interesse.',
      criterioAvanco: 'Lead com dor registrada e reunião agendada ou confirmada.',
      sla: '5 dias úteis',
      atividades: [
        'Explorar dores de negócio em profundidade',
        'Mapear contexto estratégico da empresa',
        'Agendar diagnóstico com o decisor correto',
      ],
    },
    {
      id: 'agendamento-diagnostico',
      name: 'Agendamento de Diagnóstico',
      objetivo: 'Confirmar e conduzir a primeira reunião de diagnóstico com o decisor.',
      criterioAvanco: 'Reunião realizada com pelo menos uma dor de negócio documentada.',
      sla: 'Reunião em 5 dias',
      atividades: [
        'Preparar briefing setorial com contexto da empresa',
        'Confirmar participantes e pauta',
        'Registrar dores e decisores durante a reunião',
        'Documentar contexto para passagem ao vendedor',
      ],
      automation: { whatsapp: 'Lembrete de confirmação da reunião enviado por WhatsApp' },
    },
    {
      id: 'reagendamento',
      name: 'Reagendamento',
      objetivo: 'Manter o processo ativo quando o diagnóstico não acontece no prazo.',
      criterioAvanco: 'Nova data confirmada. Limite: 2 reagendamentos antes de mover para Nutrição.',
      sla: '3 dias para nova proposta',
      atividades: [
        'Registrar motivo do reagendamento',
        'Reenviar proposta de data em até 3 dias úteis',
        'Avaliar contato alternativo se o decisor não responde',
        'Reclassificar para Nutrição após 2 tentativas sem sucesso',
      ],
    },
    {
      id: 'encaminhamento',
      name: 'Encaminhamento',
      objetivo: 'Passar o lead qualificado ao Pipeline de Oportunidades com histórico completo.',
      criterioAvanco: 'Passagem documentada ao Pipeline de Oportunidades com histórico completo.',
      sla: 'Até 24h',
      atividades: [
        'Confirmar interlocutor, dor e momento de decisão',
        'Documentar contexto e histórico de contatos no CRM',
        'Realizar passagem ao próximo responsável em até 24h',
        'Registrar a passagem formalmente no pipeline',
      ],
      automation: { email: 'E-mail de handoff enviado ao vendedor responsável' },
    },
  ],

  nutricao: [
    {
      id: 'novo-na-nutricao',
      name: 'Novo na Nutrição',
      objetivo: 'Registrar o lead e iniciar a sequência automatizada de nutrição.',
      criterioAvanco: 'Sequência iniciada com primeiro conteúdo enviado.',
      sla: 'Até 48h',
      atividades: [
        'Confirmar e registrar o motivo de saída do funil principal no CRM',
        'Iniciar sequência de emails com conteúdo relevante ao setor',
        'Definir trilha de conteúdo (Agro, Fintech ou Educação)',
      ],
      automation: { email: 'Primeiro conteúdo da trilha de nutrição enviado' },
    },
    {
      id: 'em-nutricao',
      name: 'Em Nutrição',
      objetivo: 'Manter presença relevante com conteúdo automatizado e de baixa frequência.',
      criterioAvanco: 'Sequência ativa sem sinal de saída. Revisar base a cada 90 dias.',
      sla: 'Contínuo',
      atividades: [
        'Enviar conteúdo setorial a cada 15 dias',
        'Monitorar aberturas, cliques e respostas',
        'Registrar engajamentos no CRM para avaliação futura',
        'Revisar toda a base de Nutrição a cada 90 dias',
      ],
      automation: { email: 'Conteúdo setorial periódico (cadência de 15 dias) enviado' },
    },
    {
      id: 'sinal-de-vida',
      name: 'Sinal de Vida',
      objetivo: 'Reagir ao engajamento do lead e avaliar se o momento mudou.',
      criterioAvanco: 'Decisão documentada: reativar no GDQ ou manter na nutrição.',
      sla: 'Avaliar em 48h',
      atividades: [
        'Identificar o sinal (abertura, clique, resposta, menção em evento)',
        'Avaliar se o contexto da empresa mudou desde a saída do funil',
        'Decidir: retornar ao GDQ (etapa correta) ou manter na nutrição',
        'Documentar a decisão e o racional no CRM',
      ],
      automation: { whatsapp: 'Alerta de sinal de engajamento enviado ao responsável' },
    },
    {
      id: 'reativado',
      name: 'Reativado',
      objetivo: 'Reinserir o lead no Pipeline GDQ principal com contexto atualizado.',
      criterioAvanco: 'Lead reativado e visível no Pipeline GDQ na etapa correta.',
      sla: 'Reinserção em 24h',
      atividades: [
        'Documentar motivo da reativação e o sinal que a disparou',
        'Inserir no GDQ na etapa correta (não necessariamente Novo Lead)',
        'Registrar histórico de nutrição completo para uso no Engajamento',
        'Briefar o responsável pelo contato com o contexto acumulado',
      ],
      automation: { email: 'Briefing de reativação enviado ao responsável pelo GDQ' },
    },
  ],

  oportunidades: [
    {
      id: 'oportunidade-recebida',
      name: 'Oportunidade Recebida',
      objetivo: 'Revisar o histórico completo antes do primeiro contato e alinhar com quem qualificou.',
      criterioAvanco: 'Vendedor com contexto completo para iniciar o diagnóstico.',
      sla: 'A definir',
      atividades: [
        'Revisar histórico completo do lead no CRM',
        'Alinhar com quem qualificou no GDQ',
      ],
      automation: { email: 'Resumo da qualificação enviado ao vendedor' },
    },
    {
      id: 'diagnostico-enquadramento',
      name: 'Diagnóstico e Enquadramento',
      objetivo: 'Aprofundar o diagnóstico e posicionar a conversa como consultoria estratégica.',
      criterioAvanco: 'Reunião realizada com contexto estratégico estabelecido.',
      sla: 'A definir',
      atividades: [
        'Aprofundar o diagnóstico de negócio',
        'Posicionar a conversa como consultoria estratégica, não fornecimento técnico',
        'Enquadramento por contraste: foco em crescimento e retorno',
      ],
    },
    {
      id: 'apresentacao-multipla',
      name: 'Apresentação por Abordagem Múltipla',
      objetivo: 'Adaptar a comunicação para cada decisor do comitê.',
      criterioAvanco: 'Cada decisor relevante recebeu comunicação adequada ao seu papel.',
      sla: 'A definir',
      atividades: [
        'Adaptar comunicação por decisor (CFO, CTO, liderança)',
        'Usar cases de referência por perfil de decisor',
      ],
      automation: { whatsapp: 'Material personalizado por decisor enviado via WhatsApp' },
    },
    {
      id: 'consenso-fechamento',
      name: 'Consenso e Fechamento',
      objetivo: 'Conceder ao decisor a permissão social para agir.',
      criterioAvanco: 'Consenso confirmado e proposta pronta para fechamento.',
      sla: 'A definir',
      atividades: [
        'Conceder permissão social para agir',
        'Associar o fechamento à identidade de líder orientado a resultado',
      ],
    },
    {
      id: 'ganho-perdido',
      name: 'Ganho ou Perdido',
      objetivo: 'Registrar o resultado final da oportunidade.',
      criterioAvanco: 'Resultado registrado no Playbook Vivo.',
      sla: 'A definir',
      atividades: [
        'Ganho: formalizar passagem de conta para a entrega',
        'Perdido: registrar motivo real para ajustar scripts do Playbook Vivo',
      ],
      automation: { email: 'E-mail de boas-vindas (ganho) ou pesquisa de motivo (perdido) enviado' },
    },
  ],

  parceiros: [
    {
      id: 'mapeamento',
      name: 'Mapeamento',
      objetivo: 'Identificar e qualificar candidatos a parceiro antes de qualquer abordagem.',
      criterioAvanco: 'Candidato qualificado com decisor identificado e tipo de parceria definido.',
      sla: '3 a 5 dias úteis',
      atividades: [
        'Levantar hubs e plataformas dos nichos prioritários (Agro, Fintech, Educação)',
        'Verificar base de clientes e decisor via LinkedIn ou site',
        'Confirmar encaixe com o perfil de parceiro OBI.TEC',
        'Registrar sinais de entrada (indicação, evento, inbound)',
      ],
    },
    {
      id: 'agenda-feita',
      name: 'Agenda Feita',
      objetivo: 'Confirmar o primeiro contato com o decisor.',
      criterioAvanco: 'Reunião agendada e confirmada com o decisor.',
      sla: 'até 10 dias úteis',
      atividades: [
        'Enviar abordagem personalizada via LinkedIn ou email',
        'Confirmar reunião com data e participantes',
        'Preparar briefing da reunião com contexto do candidato',
      ],
      automation: { email: 'Convite de reunião enviado ao decisor' },
    },
    {
      id: 'reagendamento-parceiros',
      name: 'Reagendamento',
      objetivo: 'Manter o processo ativo quando a agenda inicial não se concretiza.',
      criterioAvanco: 'Nova data confirmada ou candidato movido para Nutrição após limite de tentativas.',
      sla: '5 dias úteis para nova proposta',
      atividades: [
        'Registrar motivo do reagendamento',
        'Enviar nova proposta de data',
        'Avaliar reclassificação de tipo (Tipo 1 ou Tipo 2)',
      ],
    },
    {
      id: 'em-negociacao',
      name: 'Em Negociação',
      objetivo: 'Apresentar e validar o modelo de parceria com o decisor.',
      criterioAvanco: 'Proposta recebida positivamente e próximos passos acordados com data.',
      sla: 'reunião em até 5 dias úteis',
      atividades: [
        'Reunião de apresentação do Método Evolutiva',
        'Apresentar o case Blackboard como prova social',
        'Construir business case adaptado ao ecossistema do candidato',
      ],
      automation: { whatsapp: 'Material do case Blackboard enviado via WhatsApp' },
    },
    {
      id: 'negociacao-avancada',
      name: 'Negociação Avançada',
      objetivo: 'Alinhar os termos técnicos e comerciais antes da formalização.',
      criterioAvanco: 'Termos acordados e minuta enviada ao Jurídico para revisão.',
      sla: 'até 15 dias úteis',
      atividades: [
        'Definir escopo da integração técnica ou comercial',
        'Alinhar modelo de receita (revenue share ou projeto)',
        'Submeter rascunho dos termos ao Jurídico',
      ],
    },
    {
      id: 'formalizacao-contrato',
      name: 'Formalização de Contrato',
      objetivo: 'Concluir a formalização jurídica da parceria.',
      criterioAvanco: 'Contrato assinado e parceria oficialmente ativa.',
      sla: 'até 20 dias úteis',
      atividades: [
        'Jurídico conduz revisão e negociação contratual',
        'Registrar as datas de envio, retorno e assinatura no CRM',
        'Comunicar internamente após assinatura',
      ],
      automation: { email: 'Contrato enviado para assinatura' },
    },
    {
      id: 'plano-de-acao',
      name: 'Plano de Ação',
      objetivo: 'Ativar a parceria com plano de trabalho individual definido.',
      criterioAvanco: 'Parceria gerando acesso qualificado com regularidade. Plano de ação revisado.',
      sla: 'contínuo, revisão trimestral',
      atividades: [
        'Habilitar integração técnica ou acesso ao ecossistema do parceiro',
        'Capacitar equipe do parceiro sobre o Método Evolutiva',
        'Definir metas de volume de leads qualificados e receita esperada',
      ],
      automation: { email: 'Kit de onboarding do parceiro enviado' },
    },
  ],
}

function card(
  id: string,
  title: string,
  empresa: string,
  contato: string,
  fonte: string,
  valor: number,
  stageId: string,
  tarefaStatus: KanbanCard['tarefaStatus'] = null,
  diasNaEtapa: number = 1,
): KanbanCard {
  return {
    id,
    title,
    empresa,
    contato,
    contatos: [{ id: `${id}-contato-1`, nome: contato, cargo: 'Contato principal' }],
    fonte,
    valor,
    stageId,
    tarefaStatus,
    produtos: [],
    tarefas: [],
    camposPersonalizados: [],
    criadoEm: '2026-08-06',
    diasNaEtapa,
  }
}

// Cards de exemplo (dados fictícios de demonstração, não são negócios reais).
export const SAMPLE_DEALS: Record<PipelineSlug, KanbanCard[]> = {
  gdq: [
    card('gdq-1', 'Cooperativa Agro Vale Rico', 'Agro Vale Rico', 'Marina Souza', 'Indicação', 0, 'novo-lead'),
    card('gdq-2', 'FinPay Serviços Financeiros', 'FinPay', 'Diego Ramos', 'Prospecção LinkedIn', 0, 'enriquecimento', 'overdue'),
    card('gdq-3', 'EduConecta Plataforma EAD', 'EduConecta', 'Renata Alves', 'Evento setorial', 0, 'abordagem-ativa'),
    card('gdq-4', 'AgroTech Insumos SA', 'AgroTech Insumos', 'Paulo Ferreira', 'Parceiro ativo', 25000, 'engajamento', 'completed'),
    card('gdq-5', 'Crédito Rural Fintech', 'Crédito Rural', 'Bianca Nogueira', 'Formulário de diagnóstico', 18000, 'agendamento-diagnostico'),
  ],
  nutricao: [
    card('nut-1', 'LMS Aprender+', 'Aprender+', 'Carlos Vieira', 'GDQ (sem timing)', 0, 'novo-na-nutricao'),
    card('nut-2', 'Fintech PagFácil', 'PagFácil', 'Juliana Prado', 'GDQ (reagendamentos)', 0, 'em-nutricao'),
    card('nut-3', 'AgroDados ERP', 'AgroDados', 'Eduardo Lima', 'GDQ (sinal de engajamento)', 0, 'sinal-de-vida'),
  ],
  oportunidades: [
    card('opp-1', 'Grupo Vequis', 'Grupo Vequis', 'Fernanda Costa', 'GDQ', 32000, 'oportunidade-recebida'),
    card('opp-2', 'Já Entendi Agro', 'Já Entendi Agro', 'Rodrigo Martins', 'GDQ', 41000, 'diagnostico-enquadramento', 'overdue'),
    card('opp-3', 'iugu Infraestrutura', 'iugu', 'Camila Rocha', 'GDQ', 58000, 'apresentacao-multipla'),
  ],
  parceiros: [
    card('par-1', 'Instituto Caldeira', 'Instituto Caldeira', 'Bruno Andrade', 'Mapeamento ativo', 0, 'mapeamento'),
    card('par-2', 'AGS Hub de Inovação', 'AGS', 'Larissa Teixeira', 'Indicação de rede', 0, 'agenda-feita'),
    card('par-3', 'AgroConect Plataforma', 'AgroConect', 'Vinícius Barros', 'Prospecção ativa', 0, 'em-negociacao', 'completed'),
  ],
}
