import type { MarketingPhase, MarketingTaskCard } from '@/types/marketing-plan'

// Conteúdo baseado em content/base-conhecimento/plano-marketing-vendas.md
// (Capítulo 3, "O Plano em 5 Fases"), reescrito em linguagem direta e sem
// jargão, para qualquer pessoa do time entender o plano sem precisar
// conhecer termos de marketing. Nenhuma meta ou fato novo foi inventado.
export const MARKETING_PHASES: MarketingPhase[] = [
  {
    id: 'fase-1',
    number: '01',
    title: 'Concepção e Fundamentação',
    intro:
      'Antes de rodar qualquer campanha, esta fase define a base: por que o jeito antigo de vender parou de funcionar, e como a OBI.TEC vai se diferenciar. Hoje, a maioria dos clientes já pesquisa e compara fornecedores usando inteligência artificial antes de falar com qualquer vendedor. Por isso, o marketing precisa mostrar prova real, não só chamar atenção.',
    pillars: [
      'A forma de comprar mudou: antes de falar com a OBI.TEC, o cliente já pesquisou e comparou opções sozinho, muitas vezes usando IA. Por isso o marketing precisa mostrar provas concretas, não só anúncios chamativos.',
      'A parceria com a Blackboard mostra, na prática, que esse tipo de parceria funciona: hoje ela representa cerca de 35% da receita da OBI.TEC. A meta é repetir esse tipo de parceria em outros setores, e não copiar a Blackboard em si.',
      'O marketing vai parar de falar só sobre o software e passar a mostrar como o cliente (quem decidiu contratar a OBI.TEC) resolveu um problema real de negócio.',
    ],
    actions: [
      {
        id: 'f1-a1',
        title: 'Mapear e Participar de Comunidades do Setor',
        description:
          'Escolher de 3 a 5 associações, polos de inovação ou grupos de nicho onde estão as empresas de Agro, Fintechs e Educação que a OBI.TEC quer atingir (por exemplo: Instituto Caldeira, AGS, associações do agronegócio). Em vez de só patrocinar eventos, participar de forma ativa: organizar pequenos jantares, mesas redondas ou workshops fechados com foco em diagnóstico de negócio, não em venda direta. Isso coloca a OBI.TEC dentro do grupo antes mesmo do primeiro contato comercial.',
      },
      {
        id: 'f1-a2',
        title: 'Produzir Vídeos e Posts com Cases Reais',
        description:
          'Escolher os clientes mais representativos das áreas em que a OBI.TEC já entrega bons resultados (por exemplo: iugu, Grupo Vequis, Já Entendi Agro). Gravar vídeos curtos e criar posts para LinkedIn contando a história em três partes simples: 1) qual era o problema antes da OBI.TEC, 2) o que mudou com a entrada da OBI.TEC, 3) qual é o resultado hoje. Esse formato mostra prova real em vez de apenas descrever o serviço.',
      },
      {
        id: 'f1-a3',
        title: 'Propor Integrações a Outras Plataformas',
        description:
          'Junto com o time de pré-vendas, montar uma apresentação comercial para levar a outras plataformas de software que já atendem os mesmos setores (por exemplo, ERPs usados no Agro ou sistemas usados por bancos). A proposta é integrar ou desenvolver funcionalidades em conjunto, do mesmo jeito que já acontece com a Blackboard: em troca, a OBI.TEC ganha acesso à base de clientes daquela plataforma parceira.',
      },
    ],
  },
  {
    id: 'fase-2',
    number: '02',
    title: 'Identidade e Posicionamento',
    intro:
      'Esta fase define, de forma simples, o que a OBI.TEC realmente vende. Entregar no prazo e com qualidade já é o mínimo esperado por qualquer cliente, isso deixou de ser um diferencial. O que a OBI.TEC vende de fato é a segurança de que o projeto vai dar certo, e de que quem contratou não vai se arrepender dessa escolha.',
    pillars: [
      'O cliente não está comprando só código, está comprando tranquilidade: a certeza de que o projeto vai funcionar e de que a pessoa responsável pela decisão não vai ter problema por isso depois.',
      'Não dá para tentar atender todo mundo: focar em um público bem definido (empresas de Agro, Fintechs e Educação) e ser realmente bom para esse público específico funciona melhor do que uma mensagem genérica para qualquer empresa.',
      'Quando outras empresas do mesmo ecossistema já usam a OBI.TEC, contratar a OBI.TEC passa a ser visto como a decisão normal e segura, não como um risco.',
    ],
    actions: [
      {
        id: 'f2-a1',
        title: 'Redesenhar Como a OBI.TEC se Apresenta',
        description:
          'Montar um comparativo simples mostrando como a OBI.TEC quer ser vista: de um lado, "empresa que só executa tarefas técnicas"; do outro, "consultora que ajuda a resolver o negócio". A OBI.TEC deve se posicionar sempre do lado de consultoria e retorno financeiro (ROI). Todo material (site, LinkedIn, apresentações) precisa refletir essa posição: falar de resultado de negócio antes de falar de tecnologia.',
      },
      {
        id: 'f2-a2',
        title: 'Mostrar o Custo de Não Agir',
        description:
          'Em vez de só elogiar a OBI.TEC, os materiais (artigos, e-mails, webinars) devem mostrar quanto custa continuar como está: por exemplo, "quanto custa manter um sistema antigo funcionando mal por mais 6 meses". Mostrar esse risco de não mudar cria a urgência que faz o cliente procurar a OBI.TEC agora, em vez de só saber que ela existe.',
      },
      {
        id: 'f2-a3',
        title: 'Deixar Claro Quem NÃO é Cliente da OBI.TEC',
        description:
          'Escrever com clareza, na comunicação, quem a OBI.TEC não atende bem: por exemplo, "se você só quer contratar horas de programação mais baratas, a OBI.TEC não é para você". Isso pode parecer que afasta clientes, mas na prática atrai exatamente quem se encaixa (empresas de Agro, Fintechs e Educação que precisam de mais do que só código) e aumenta a confiança de quem contrata.',
      },
      {
        id: 'f2-a4',
        title: 'Oferecer um Diagnóstico Gratuito',
        description:
          'Criar uma ferramenta simples e gratuita de diagnóstico (por exemplo, uma calculadora de risco de sistemas que não escalam) baseada no serviço de Discovery da OBI.TEC, e oferecer isso de graça para os ecossistemas parceiros. Quando a OBI.TEC identifica o problema do cliente antes mesmo dele pedir ajuda, isso prova competência sem cobrar nada ainda.',
      },
    ],
  },
  {
    id: 'fase-3',
    number: '03',
    title: 'Como Vender: o Método PCP na Prática',
    intro:
      'Como o cliente já chega com boa parte da decisão formada, o que faz diferença na hora de vender é a conversa humana. O método usado pela OBI.TEC se chama PCP e tem três passos simples: Percepção (mostrar que você entende o medo do cliente), Contexto (definir o tom da conversa) e Permissão (dar segurança para ele decidir).',
    pillars: [
      'Percepção: dizer em voz alta o que o cliente já pensa mas não fala (por exemplo, o medo de contratar um projeto de TI que atrasa). Isso cria confiança rápido, porque o cliente sente que foi entendido.',
      'Contexto: quem fala primeiro define o tom da reunião. Se o vendedor entra como quem só vai dar um orçamento, o cliente trata a conversa como preço. Se entra como consultor, a conversa vira sobre resultado de negócio.',
      'Permissão: depois de mostrar que entende o problema e definir o tom certo, o vendedor ajuda o cliente a se sentir seguro para decidir, mostrando que a escolha combina com o tipo de gestor que ele quer ser: organizado, responsável, que não deixa dinheiro na mesa.',
    ],
    actions: [
      {
        id: 'f3-a1',
        title: 'Manter um Manual de Vendas Vivo',
        description:
          'Criar um documento vivo, dentro do CRM, com os melhores scripts de venda usados pela equipe. Todo mês, revisar esse documento com base nas gravações das reuniões que realmente fecharam negócio, em vez de usar um roteiro fixo que nunca muda.',
      },
      {
        id: 'f3-a2',
        title: 'Falar com Cada Decisor de Forma Diferente',
        description:
          'Em vendas grandes, geralmente mais de uma pessoa decide (por exemplo, o diretor financeiro e o diretor de tecnologia). Preparar uma mensagem diferente para cada um: para quem cuida do financeiro, falar de economia e previsibilidade; para quem cuida da tecnologia, falar de sistemas mais modernos e seguros.',
      },
      {
        id: 'f3-a3',
        title: 'Treinar com Simulações de Venda',
        description:
          'Fazer, toda semana, uma simulação de venda dentro da própria equipe, praticando os três passos do método PCP. O objetivo é treinar a escuta: identificar o que o cliente está pensando mas não disse, e responder de um jeito que faça sentido para ele.',
      },
      {
        id: 'f3-a4',
        title: 'Usar o Método PCP também nas Mensagens',
        description:
          'Aplicar o mesmo método PCP nas mensagens de prospecção (LinkedIn, e-mail): começar mostrando que entende a dor real do setor do cliente, e já trazer um dado concreto (por exemplo, "ajudamos a empresa X a reduzir isso em 20%"), em vez de usar frases genéricas de vendas.',
      },
    ],
  },
  {
    id: 'fase-4',
    number: '04',
    title: 'Pipelines de Marketing: Operações de Receita',
    intro:
      'Marketing, pré-vendas e sucesso do cliente deixam de trabalhar separados e passam a compartilhar as mesmas metas e os mesmos dados. Essa integração é chamada de Operações de Receita. Se o marketing traz um lead errado, a pré-venda perde tempo; se a pré-venda desperdiça um bom lead, o marketing perdeu o investimento. Por isso os dois times ganham e perdem juntos.',
    pillars: [
      'Metas compartilhadas: os dois times acompanham juntos quanto custa conquistar um cliente (CAC) e quanto esse cliente vale ao longo do tempo (CLV), em vez de cada time olhar só para o próprio número.',
      'A mesma linguagem: se uma campanha de marketing fala sobre o problema de sistemas antigos, a pré-venda precisa usar exatamente essa mesma linguagem na conversa, para o cliente sentir continuidade.',
      'Apoio de dados: o marketing identifica sinais de oportunidade (por exemplo, uma empresa do Agro que acabou de receber um investimento) e passa essa informação já pronta para a pré-venda abordar com contexto real.',
    ],
    actions: [
      {
        id: 'f4-a1',
        title: 'Povoar o Pipeline com Leads de Campanhas e Eventos',
        description:
          'Este é o coração da geração de demanda: rodar campanhas digitais e participar de eventos dos setores de Agro, Fintechs e Educação para captar leads qualificados e colocá-los direto no início do pipeline do GDQ (Gerador de Demanda Qualificada). Cada campanha e cada evento deve ter uma meta clara de quantos leads qualificados entram no GDQ por mês, para o time comercial sempre ter o que trabalhar.',
      },
      {
        id: 'f4-a2',
        title: 'Trabalhar Também Listas Frias',
        description:
          'Além dos leads que chegam prontos por campanha ou evento, montar e manter listas frias: contatos de empresas dos nichos prioritários que ainda não demonstraram interesse, levantadas a partir de associações, diretórios do setor e bases públicas. Essas listas alimentam a prospecção ativa quando o volume de leads quentes não é suficiente, garantindo que o funil do GDQ nunca fique vazio.',
      },
      {
        id: 'f4-a3',
        title: 'Pipeline por Nichos: Vendas de Alto Valor',
        description:
          'Para contratos maiores e mais complexos, o marketing organiza jantares e mesas redondas exclusivas dentro dos hubs de inovação mapeados na Fase 1. Como a decisão nesses casos envolve várias pessoas, a pré-venda prepara materiais diferentes para cada decisor: uma análise financeira e de risco para quem cuida do orçamento, e uma prova técnica de arquitetura para quem cuida da tecnologia.',
      },
      {
        id: 'f4-a4',
        title: 'Pipeline de Produto Próprio (Obi.Edu)',
        description:
          'Para o produto próprio da OBI.TEC voltado a Instituições de Ensino, rodar campanhas de conteúdo e anúncios sobre um problema comum a esse público: o risco de perder o credenciamento pelo MEC por falta de organização de documentos. Em seguida, a pré-venda oferece um diagnóstico gratuito da situação documental da instituição, criando um caminho rápido até o fechamento.',
      },
      {
        id: 'f4-a5',
        title: 'Pipeline de Parcerias: Conquistar Novos Parceiros',
        description:
          'Esse pipeline não busca o cliente final, e sim outras empresas de tecnologia que já atendem o mesmo público (por exemplo, os maiores ERPs de gestão rural ou sistemas bancários). A pré-venda aborda diretamente os responsáveis por essas plataformas, e o marketing prepara uma apresentação mostrando como a OBI.TEC pode desenvolver integrações que aumentam o valor do produto do parceiro, do mesmo jeito que já funciona com a Blackboard. Ao fechar com uma plataforma parceira, a OBI.TEC ganha acesso a milhares de usuários de uma vez.',
      },
      {
        id: 'f4-a6',
        title: 'Adotar Metas Compartilhadas entre Marketing e Pré-vendas',
        description:
          'Definir, junto com o time comercial, as mesmas metas de CAC (custo para conquistar um cliente) e CLV (quanto esse cliente gera de receita ao longo do tempo) para os dois times, revisando os números juntos todo mês. Isso substitui a lógica antiga de cada time olhar só para o próprio número, como volume de leads de um lado e reuniões marcadas do outro.',
      },
    ],
  },
  {
    id: 'fase-5',
    number: '05',
    title: 'Plano de Campanhas e Parcerias: a Execução',
    intro:
      'Com a base pronta, aqui entra a execução: quatro frentes de trabalho para gerar leads, fechar parcerias, falar com a pessoa certa e manter tudo funcionando, sem depender de um único vendedor ou de um único sócio.',
    pillars: [
      'Frente 1, Ensinar antes de vender: mostrar ao cliente algo novo e útil sobre o próprio negócio dele, em vez de falar sobre a tecnologia da OBI.TEC.',
      'Frente 2, Expandir parcerias: repetir, em novos setores, o tipo de parceria que já funciona bem com a Blackboard.',
      'Frente 3, Falar com a pessoa certa: uma compra grande de tecnologia costuma envolver de 10 a 15 pessoas decidindo juntas, cada uma com uma preocupação diferente.',
      'Frente 4, Manter tudo funcionando: revisar mensalmente o que está e não está dando resultado, sem depender de um roteiro engessado.',
    ],
    actions: [
      {
        id: 'f5-a1',
        title: 'Eventos de Diagnóstico Gratuito',
        description:
          'Organizar webinars ou pequenos eventos presenciais para a liderança das empresas-alvo, com foco total no problema (por exemplo, o custo escondido de sistemas desorganizados), sem falar da OBI.TEC até o final do evento. Esse formato ensina algo de valor real antes de qualquer venda, aplicando na prática o princípio de sempre ensinar o cliente antes de vender.',
      },
      {
        id: 'f5-a2',
        title: 'Relatórios sobre o Custo de Não Agir',
        description:
          'Publicar relatórios e materiais para Agro e Finanças mostrando, com números, quanto custa continuar com sistemas antigos ou desorganizados. Ajudar o cliente a calcular esse custo sozinho, antes mesmo de considerar contratar a OBI.TEC, reforça a mesma lógica de ensinar primeiro para ganhar confiança depois.',
      },
      {
        id: 'f5-a3',
        title: 'Mapear Plataformas para Novas Parcerias',
        description:
          'Identificar sistemas grandes (ERPs de Agro, sistemas usados por bancos) que têm uma falha ou uma necessidade de integração, e propor a OBI.TEC como a desenvolvedora oficial dessa integração, ganhando acesso à base de usuários daquele sistema.',
      },
      {
        id: 'f5-a4',
        title: 'Fortalecer Presença nos Hubs de Inovação',
        description:
          'Em vez de só patrocinar eventos do Instituto Caldeira e da AGS, criar grupos fechados de discussão liderados pela OBI.TEC, dando destaque aos parceiros que já têm bons resultados, para eles se tornarem defensores da marca dentro desses hubs.',
      },
      {
        id: 'f5-a5',
        title: 'Mensagem Diferente para Cada Decisor',
        description:
          'Usar dados para identificar, dentro de uma empresa-alvo, quem são as pessoas envolvidas na decisão, e enviar conteúdo diferente para cada uma: para quem cuida do financeiro, foco em economia e previsibilidade; para quem cuida da tecnologia, foco em segurança e arquitetura moderna.',
      },
      {
        id: 'f5-a6',
        title: 'Materiais Fáceis de Compartilhar Internamente',
        description:
          'Criar conteúdos simples que a própria equipe do cliente, não só quem decide, possa compartilhar internamente, ajudando a gerar apoio de outras pessoas da empresa antes da decisão final.',
      },
      {
        id: 'f5-a7',
        title: 'Revisar o Manual de Vendas Todo Mês',
        description:
          'Junto com o time de vendas, revisar mensalmente quais scripts e argumentos realmente funcionaram, com base em dados reais de conversão, ajustando o que não está dando resultado.',
      },
      {
        id: 'f5-a8',
        title: 'Conteúdo Gratuito e Contínuo para Instituições de Ensino',
        description:
          'Para Instituições de Ensino interessadas nos produtos da OBI.TEC, enviar por e-mail, de forma regular e gratuita, informações úteis sobre regras do MEC e organização documental. Aos poucos, essa entrega de valor gratuito constrói confiança suficiente para oferecer o produto final sem parecer uma venda forçada.',
      },
    ],
  },
]

function task(id: string, title: string, description: string, phaseId: string, owner: string): MarketingTaskCard {
  return {
    id,
    title,
    description,
    phaseId,
    owner,
    participants: [],
    status: 'pendente',
    dueDate: undefined,
    messages: [],
  }
}

// Uma tarefa por ação do plano: ponto de partida para o time de marketing
// arrastar entre as fases conforme o trabalho avança.
export const MARKETING_TASKS: MarketingTaskCard[] = MARKETING_PHASES.flatMap((phase) =>
  phase.actions.map((action) =>
    task(action.id, action.title, action.description, phase.id, 'Marketing'),
  ),
)
