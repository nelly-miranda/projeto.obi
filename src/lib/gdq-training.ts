import type { TrainingTrack } from '@/types/training'

// Trilha elaborada pelos agentes de IA do projeto (.claude/agents/), cada
// módulo escrito na persona do agente responsável por aquele tema, com base
// exclusivamente em content/pipelines/gdq.md, content/projeto/visao-geral.md
// e content/base-conhecimento/plano-marketing-vendas.md.
export const GDQ_TRAINING_TRACK: TrainingTrack = {
  title: 'Trilha de Capacitação: GDQ',
  intro:
    'Bem-vindo à trilha de capacitação do GDQ. Ela tem 5 módulos e foi pensada para quem está começando, mesmo sem nunca ter trabalhado com vendas B2B ou conhecido a OBI.TEC antes. Você pode fazer no seu ritmo: não há prazo, e pode voltar a qualquer módulo quando quiser.',
  prerequisites: [
    'Acesso ao CRM (Bitrix24) já liberado',
    'Ter lido a Visão Geral da OBI.TEC, para entender o contexto de estratégia',
    'Cerca de 40 a 60 minutos livres para passar pelos 5 módulos com atenção',
  ],
  modules: [
    {
      id: 'modulo-1',
      number: '01',
      title: 'Por que o GDQ existe',
      body: `A OBI.TEC não vende só código. Ela se posiciona como parceira estratégica de desenvolvimento: isso quer dizer que, antes de propor qualquer solução técnica, a empresa busca entender o negócio do cliente. Essa forma de atuar é focada em três mercados prioritários: Agro, Fintechs e Educação. Não é qualquer empresa desses setores que interessa, e sim aquelas com um problema de negócio real para resolver.

É aqui que entra o GDQ, o Gerador de Demanda Qualificada. "Demanda" é o fluxo de empresas interessadas em conversar com a OBI.TEC; "qualificada" é a palavra-chave: significa que essa empresa foi verificada antes de chegar ao time comercial. O GDQ é o processo que recebe cada empresa que chega (por automação, indicação, evento ou prospecção), organiza as informações sobre ela e confirma se de fato vale a pena avançar para uma conversa comercial.

Por que isso é necessário? Porque gerar contatos em quantidade, sem esse cuidado, é um desperdício de tempo, tanto do time comercial quanto do próprio cliente em potencial. O objetivo do GDQ não é "quantos leads entraram", mas sim garantir que toda empresa que avança tem um contexto mapeado, um interlocutor (a pessoa certa dentro da empresa) identificado, e uma dor de negócio validada, ou seja, um problema real e confirmado, não suposto.

É assim que o GDQ se conecta com a estratégia da OBI.TEC: ele é a porta de entrada que garante que só chegam ao pipeline seguinte, o de Oportunidades, empresas dos mercados certos, com o problema certo e a pessoa certa identificada. Sem essa etapa bem feita, todo o resto da estratégia perde precisão. O GDQ é o que transforma geração de demanda em previsibilidade comercial.`,
      selfCheck: [
        'O que significa dizer que um lead (uma empresa em potencial) está "qualificado" no contexto do GDQ?',
        'Por que o objetivo do GDQ não é gerar leads em grande quantidade?',
        'Como o GDQ se conecta com o posicionamento da OBI.TEC como parceira estratégica de desenvolvimento?',
      ],
    },
    {
      id: 'modulo-2',
      number: '02',
      title: 'Quem é o lead certo',
      body: `Antes de qualquer contato comercial, a OBI.TEC precisa responder uma pergunta simples: essa empresa faz sentido para a gente? O Pipeline GDQ existe justamente para filtrar isso desde a entrada. Não é sobre falar com o maior número de empresas possível, é sobre garantir que quem chega até o time de vendas já tem contexto, dor identificada e encaixe real. Para isso, a OBI.TEC trabalha com dois perfis de lead ideal.

**Perfil A: empresa em movimento nos nichos prioritários.** É uma empresa que atua em Agro, Fintech ou Educação e está passando por um momento de crescimento, digitalização ou troca de sistemas. Aqui o que qualifica não é o tamanho da empresa, é o momento que ela está vivendo: recebeu um aporte, tem liderança nova, está expandindo a operação, contratando para a área de TI, ou já declarou um problema técnico que está travando esse crescimento.

**Perfil B: empresa com histórico de dor declarada.** Pode ser empresa de qualquer porte, desde que esteja em um dos nichos prioritários, e que já tentou resolver um problema antes e não conseguiu, ou que ainda depende de processos manuais que limitam sua capacidade de crescer. O sinal aqui é a dor mesmo: gargalo operacional, retrabalho, dependência de planilha, sistema que não conversa com outro sistema.

E o que tira uma empresa do funil? Quatro coisas: não atuar em nenhum dos nichos prioritários, não ter um problema de negócio identificado, ter uma demanda que está fora do que a OBI.TEC oferece, ou já ser cliente ativo (nesse caso o caminho é outro: vai para Sucesso do Cliente, não para o GDQ).

Esses leads chegam por quatro canais, e cada canal já entrega um contexto diferente:

- **Parceiros ativos**: vêm da base de parceiros estratégicos, já identificados com o ecossistema de origem, e carregam um sinal de dor implícito só pelo contexto do parceiro.
- **LinkedIn**: resultado de prospecção ativa por perfil e setor, exige sequência estruturada e personalização.
- **Eventos e conteúdo**: leads que interagiram com material ou preencheram formulário de diagnóstico, com intenção mais clara.
- **Indicações**: vêm de clientes ou parceiros, já trazem contexto pronto e têm a conversão mais alta, por isso entram com prioridade na fila.`,
      selfCheck: [
        'Uma empresa grande, fora dos nichos prioritários, mas com uma dor técnica forte: ela se qualifica em algum dos perfis? Por quê?',
        'Qual a diferença entre o sinal de qualificação do Perfil A e do Perfil B?',
        'Por que um lead vindo de indicação recebe prioridade na fila em relação a um lead vindo do LinkedIn?',
      ],
    },
    {
      id: 'modulo-3',
      number: '03',
      title: 'As 7 etapas do GDQ, uma a uma',
      body: `O GDQ tem 7 etapas, e cada uma existe para responder uma pergunta específica sobre o lead: quem é, se vale a pena investir tempo nele e quando ele está pronto para virar oportunidade comercial. Vamos passar por cada uma.

**01. Novo Lead.** É a porta de entrada: todo lead que chega por automação, parceiro ou canal ativo cai aqui primeiro. O objetivo é só registrar direito quem chegou. O critério de avanço é "lead com empresa, setor e canal de entrada registrados", ou seja, sem esses três dados básicos preenchidos, o card não sai do lugar. O SLA é até 24h.

**02. Enriquecimento / Qualificação.** Agora entra trabalho de investigação: completar os dados do decisor e descobrir se existe alguma dor de negócio real por trás daquele lead. O critério de avanço é "decisor identificado com ao menos um sinal de dor mapeado". Se você não sabe quem decide na empresa nem tem nenhuma pista de problema a resolver, o lead ainda não pode avançar. O SLA aqui é de 3 a 5 dias.

**03. Abordagem Ativa.** É a hora do primeiro contato de fato, e-mail, LinkedIn, telefone, tudo registrado. O critério de avanço é "lead respondeu ou confirmou reunião. Sem resposta em 5 tentativas: mover para Nutrição". Isso significa duas coisas: ou o lead te dá um sinal de vida, ou depois de 5 tentativas sem retorno ele sai do funil principal e vai para Nutrição, não fica parado indefinidamente. O SLA é até 10 dias.

**04. Engajamento.** O lead já respondeu, então agora é aprofundar a conversa e marcar o diagnóstico. O critério de avanço é "lead com dor registrada e reunião agendada ou confirmada". Precisa das duas coisas juntas: dor anotada e reunião no calendário. O SLA é de 5 dias úteis.

**05. Agendamento de Diagnóstico.** Aqui a reunião efetivamente acontece. O critério de avanço é "reunião realizada com pelo menos uma dor de negócio documentada", não basta a reunião ter ocorrido, precisa sair dela com pelo menos uma dor registrada por escrito. O SLA é reunião em 5 dias.

**06. Reagendamento.** Existe para quando o diagnóstico não aconteceu no prazo e a reunião precisa ser remarcada. O critério de avanço é "nova data confirmada. Limite: 2 reagendamentos antes de mover para Nutrição", ou seja, você tem duas chances de remarcar; na terceira tentativa sem sucesso, o lead vai para Nutrição. O SLA é de 3 dias para nova proposta.

**07. Encaminhamento.** É a etapa final do GDQ: passar o lead qualificado para o Pipeline de Oportunidades. O critério de avanço é "passagem documentada ao Pipeline de Oportunidades com histórico completo", sem histórico completo registrado, a passagem não está pronta. O SLA é até 24h.

Perceba o padrão: em quase toda etapa existe uma "saída de emergência" para Nutrição (nas etapas 03 e 06). Isso não é falha do processo, é o processo reconhecendo que nem todo lead está pronto agora, e evitando que ele fique represado ocupando espaço no funil principal.`,
      selfCheck: [
        'Um lead está na etapa de Abordagem Ativa, você já tentou contato 6 vezes e não teve resposta nenhuma. O que o critério de avanço documentado diz que deve acontecer?',
        'Qual é a diferença entre o critério de avanço da etapa 04 (Engajamento) e o da etapa 05 (Agendamento de Diagnóstico)?',
        'Um lead passou por 2 reagendamentos e não conseguiu confirmar uma terceira data. Para onde ele deve ir, segundo o critério documentado da etapa 06?',
      ],
    },
    {
      id: 'modulo-4',
      number: '04',
      title: 'Como abordar sem parecer robô',
      body: `No pipeline GDQ, a etapa 03 (Abordagem Ativa) existe para provocar uma resposta do decisor, e a etapa 04 (Engajamento) existe para aprofundar a conversa depois que essa resposta chega. Nenhuma das duas funciona com mensagem de robô. Funciona com contexto.

**Personalize cada toque, não a régua toda.** A régua de abordagem tem e-mail, LinkedIn e telefone. Cada toque precisa carregar uma referência real à empresa: um sinal identificado na etapa de Enriquecimento (aporte recente, nova liderança, expansão, dor declarada), não um gancho genérico do tipo "vi seu perfil e achei interessante". Se você não tem um dado concreto para citar, o lead provavelmente ainda não estava pronto para entrar em Abordagem Ativa: volte e confirme o sinal de dor antes de disparar a sequência.

**Sem resposta em 5 tentativas: mover para Nutrição.** O critério da etapa 03 é objetivo: se o lead não respondeu nem confirmou reunião depois de 5 tentativas, ele sai da Abordagem Ativa e vai para o sub-pipeline de Nutrição. Isso não é desistir do lead, é reconhecer que agora não é o momento dele, e que insistir com mais mensagens frias desgasta a relação. Na Nutrição, ele recebe conteúdo relevante e cadenciado; qualquer sinal de engajamento (abertura, clique) é avaliado para reativação. Registre as 5 tentativas no CRM antes de mover: isso é o que sustenta a decisão e evita reabordagem duplicada mais adiante.

**O Modelo PCP em uma mensagem simples.** O Modelo PCP, Percepção, Contexto, Permissão, não serve só para reuniões fechadas: ele também estrutura a mensagem de prospecção.

- Percepção: nomeie a dor real do momento da empresa, não uma dor genérica de mercado.
- Contexto: tire a conversa do lugar de "fornecedor pedindo orçamento" e coloque no lugar de diagnóstico.
- Permissão: dê um motivo lógico e de baixo risco para responder, um convite a validar uma hipótese, não a comprar algo.

Exemplo ilustrativo (empresa e cenário fictícios, só para praticar a estrutura):

> "Oi, [nome]. Vi que a [empresa] está expandindo a operação de logística este trimestre. Empresas nessa fase costumam sentir o sistema atual travando exatamente quando mais precisam de velocidade. Faz sentido uma conversa rápida de 15 minutos para eu entender se isso já é uma dor real por aí?"

Note que a mensagem cita um sinal específico da empresa (Percepção), não vende nada de cara (Contexto de diagnóstico, não de orçamento) e pede algo pequeno e reversível (Permissão), não um compromisso de compra.`,
      selfCheck: [
        'Antes de disparar o próximo toque, eu consigo apontar um dado real da empresa que estou citando, ou estou reaproveitando um texto genérico?',
        'Se este lead chegar à 5ª tentativa sem resposta hoje, o histórico no CRM já está completo para justificar a passagem para Nutrição?',
        'Na minha mensagem, dá para identificar claramente onde está a Percepção, o Contexto e a Permissão, ou ela ainda parece um pedido de reunião comum?',
      ],
    },
    {
      id: 'modulo-5',
      number: '05',
      title: 'Como saber se está indo bem',
      body: `Chegamos ao ponto em que a pergunta muda de "como funciona o GDQ" para "como sei se o GDQ está funcionando". A resposta está em sete indicadores documentados no processo. Antes de olhar para eles, um aviso importante: esta trilha e a base de conhecimento da OBI.TEC não estão conectadas a dados em tempo real. Nenhum número aqui é "o valor de hoje", são a meta e a frequência de acompanhamento que a documentação define. Buscar o número atual é trabalho do time, feito no CRM e nas reuniões de revisão, não algo que este material informa.

Os sete indicadores são:

1. **Taxa de conversão Novo Lead → Encaminhamento** (meta: acima de 15%, revisão mensal): quantos leads que entram no topo do funil chegam qualificados até o Pipeline de Oportunidades.
2. **Tempo médio por etapa** (meta: menos de 7 dias úteis, revisão semanal): velocidade de movimento do lead entre as sete etapas; sinaliza travamentos.
3. **Leads em Nutrição (%)** (meta: menos de 30%, revisão mensal): proporção do funil que saiu do fluxo ativo por falta de resposta ou timing.
4. **Taxa de reativação (Nutrição → Pipeline)** (meta: acima de 20%, revisão trimestral): quantos leads "pausados" voltam a avançar depois de um sinal de engajamento.
5. **Leads encaminhados por mês** (meta: definida pelo quarter, revisão mensal): volume absoluto entregue ao comercial.
6. **Taxa de aceite pelo vendedor** (meta: acima de 80%, revisão mensal): quantos encaminhamentos são aceitos sem devolução por falta de qualidade.
7. **Tempo total do GDQ, de Novo Lead a Encaminhamento** (meta: menos de 30 dias úteis, revisão mensal): o ciclo completo, do primeiro registro à entrega qualificada.

Note que cada indicador tem uma frequência própria: alguns exigem olhar semanal (tempo por etapa), outros mensal (a maioria) e um é trimestral (reativação). Isso não é acaso, reflete o ritmo em que cada fenômeno muda de forma relevante.

**Cadência e governança.** Toda semana, pré-vendas e marketing se reúnem para revisar o pipeline juntos. O foco não é repetir os números: é discutir leads travados, entender motivos de perda e ajustar scripts de abordagem. É essa reunião que transforma indicador em ação.

**Sub-pipeline de Nutrição.** Leads que saem do funil principal, por falta de resposta ou timing errado, não são descartados. Entram automaticamente em Nutrição, recebem conteúdo relevante em sequência automatizada e, a cada sinal de engajamento (abertura, clique), são reavaliados para reativação. É esse mecanismo que alimenta o indicador 4.`,
      selfCheck: [
        'Qual indicador do GDQ tem frequência de revisão trimestral, e por que ele é diferente dos demais?',
        'O que acontece com um lead que entra no sub-pipeline de Nutrição até ele ser reativado?',
        'Se você quisesse saber o valor atual da taxa de aceite pelo vendedor, onde buscaria essa informação, e por que não pode vir deste material?',
      ],
    },
  ],
  faq: [
    {
      question: 'Preciso já saber de vendas para começar essa trilha?',
      answer: 'Não. A trilha foi escrita para quem nunca trabalhou com vendas B2B nem conhece a OBI.TEC. Todo termo técnico é explicado na hora em que aparece.',
    },
    {
      question: 'Quanto tempo leva para terminar?',
      answer: 'Entre 40 e 60 minutos lendo com atenção. Não há prazo: você pode fazer em uma sentada só ou dividir entre os 5 módulos ao longo de alguns dias.',
    },
    {
      question: 'O que eu faço depois de terminar os 5 módulos?',
      answer: 'Acompanhe o Plano de Trabalho do GDQ e o quadro Kanban de tarefas, que organizam o mesmo conteúdo em fases e ações do dia a dia. Esta trilha é a base; o plano de trabalho é a execução.',
    },
    {
      question: 'Onde eu tiro dúvidas que a trilha não respondeu?',
      answer: 'Use o assistente Obi (o botão flutuante no canto da tela): ele responde com base na mesma documentação que fundamenta esta trilha.',
    },
  ],
}
