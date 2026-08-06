# Briefing: Sistema de Inteligência Comercial OBI.TEC

**Documento:** briefing de produto/negócio (não é PRD, não é spec técnica)
**Projeto:** extensão do `obitec-kb` (Next.js + Markdown/frontmatter + gray-matter, já em construção)
**Data:** 2026-08-06
**Dono do produto:** Mauro Pires (sócio, OBI.TEC)

---

## 1. Contexto

O Diagnóstico Comercial da OBI.TEC (conduzido pela Traevo, Módulo Fundamento, Semana 1 em andamento) identificou seis pontos críticos na operação atual. Três deles apontam diretamente para o mesmo problema de fundo: **a informação estratégica do negócio não tem um lugar único, estruturado e acessível.**

- **Concentração comercial total em Mauro Pires**: vendas, RH, marketing e negócios passam por uma única pessoa. Enquanto isso for verdade, qualquer sistema de decisão comercial só tem valor se for o sistema que essa pessoa usa todos os dias: não uma ferramenta paralela que alguém "preenche depois".
- **Ausência de métricas comerciais formalizadas**: não há conversão por etapa, ticket médio, CAC, tempo de fechamento ou volume de oportunidades ativas consolidados em um lugar. As poucas informações existentes estão espalhadas em Word, Excel e um HTML de base de conhecimento dentro da pasta `Documentos/`, sem versionamento e sem estrutura comum.
- **Canais de aquisição pouco estruturados e marketing/vendas desconectados**: sem ICP definido, sem funil estruturado (planilhas soltas), sem critério de passagem entre áreas. Esse tipo de lacuna só se fecha com um repositório vivo de contexto de negócio (pipelines, ICP, playbook) que é consultado e atualizado com a mesma frequência com que a operação muda.

Ao mesmo tempo, a OBI.TEC está adotando IA como parte ativa do desenvolvimento comercial: não como ferramenta de redação pontual, mas como agentes que precisam operar com contexto real do negócio (produtos, pipelines, métricas, posicionamento). Hoje esse contexto não existe em formato consumível por IA: está em documentos estáticos, sem estrutura, sem histórico de mudança. Não existe hoje um lugar onde humano e IA leem e escrevem a mesma fonte de verdade.

O projeto `obitec-kb` já resolve parte disso: conteúdo em Markdown + frontmatter para as seções "Projeto" e "Pipelines", com leitura e edição via interface web. Este briefing define o que vem a seguir: estender esse projeto para ser não apenas um repositório de conteúdo, mas o sistema de inteligência que Mauro usa para tocar a estratégia comercial: e que os agentes de IA usam como fonte de contexto.

## 2. Visão do produto

**Uma frase:** O sistema de inteligência comercial da OBI.TEC é o lugar único onde a estratégia do negócio é escrita, consultada e atualizada: por Mauro e pelos agentes de IA que trabalham com ele.

Não é uma wiki. Uma wiki é passiva: alguém escreve, outro alguém lê depois. Este sistema tem dois consumidores ativos e simultâneos do mesmo conteúdo: o humano, que edita páginas de negócio (verticais, pipelines, ICP, métricas, playbook) pela interface; e os agentes de IA, que leem esse mesmo Markdown/frontmatter como contexto operacional para ajudar no desenvolvimento comercial (qualificação, criação de materiais por decisor, análise de pipeline, sugestão de próximos passos). Quando Mauro corrige um dado (um número de ticket médio, uma etapa de pipeline, uma definição de ICP), a mudança fica imediatamente disponível para os agentes, sem retrabalho de "atualizar o prompt" ou "explicar de novo para a IA". O frontmatter carrega metadados de negócio (status, owner, objective, tags) precisamente para que a IA saiba o que está lendo, não só o que está escrito.

## 3. Objetivos

1. **Unificar a fonte de verdade comercial**: consolidar em Markdown/frontmatter estruturado o conteúdo hoje espalhado em Word, Excel e HTML dentro de `Documentos/` (verticais, diagnóstico, pipelines, playbook), verificável por: zero documentos de negócio "oficiais" vivendo fora do `obitec-kb` ao final da migração.
2. **Dar a Mauro um lugar para editar a estratégia sem depender de terceiros**: páginas de edição para cada seção de negócio (hoje: Projeto e Pipelines; a estender conforme o TO-BE da consultoria), verificável por: Mauro consegue criar/editar/publicar um documento de negócio sem pedir ajuda técnica.
3. **Tornar o conteúdo de negócio legível por agentes de IA**: estrutura de frontmatter suficiente (metadados de status, dono, objetivo, tags) para que um agente saiba distinguir o que é vigente do que é rascunho ou hipótese não validada, verificável por: cada documento de pipeline/ICP/playbook tem campo de status e esse status é exposto de forma que um agente consumindo o conteúdo o respeite.
4. **Preparar o terreno para persistência e colaboração multiusuário**: arquitetura de conteúdo hoje em arquivo, mas desenhada de forma que a migração futura para Supabase não exija reescrever o modelo de dados, verificável por: o formato dos documentos (frontmatter + corpo) é o mesmo que seria usado em uma tabela/coluna Supabase, sem acoplamento à leitura direta de arquivo.
5. **Registrar formalmente as decisões e hipóteses em aberto do diagnóstico comercial**: inclusive divergências ainda não resolvidas (ex.: pipelines oficiais vs. propostas alternativas), verificável por: cada hipótese não validada está identificada como tal no conteúdo, não misturada com fato consolidado.

## 4. Para quem é

- **Usuário e dono principal: Mauro Pires.** É quem hoje concentra vendas, marketing, RH e negócios. O sistema é feito para o fluxo de trabalho dele (editar, consultar, decidir), não para uma equipe comercial que ainda não existe em escala.
- **Outros sócios (Jonatas Saraiva, Rubens Albuquerque):** stakeholders com visibilidade sobre o conteúdo estratégico, mesmo não sendo os editores primários hoje.
- **Futura equipe comercial:** o sistema precisa suportar o momento em que a OBI.TEC deixar de depender só de Mauro para vendas: quando isso acontecer, novos usuários herdam o mesmo repositório de contexto, sem reconstrução.
- **Traevo, como parceira de implementação durante o Módulo Fundamento:** contribui com o conteúdo estruturado do diagnóstico (AS-IS, TO-BE, pipelines, playbook) que alimenta o sistema: mas não é usuária operacional do sistema no dia a dia.

## 5. O que o sistema NÃO é (não-objetivos)

- **Não é o CRM operacional.** O Bitrix24 continua sendo o sistema de execução de vendas: leads, negociações, tarefas, follow-up. Este sistema guarda a *estratégia e o contexto* do negócio, não o operacional de cada oportunidade.
- **Não é, nesta fase, uma ferramenta de execução automática de agentes.** A camada de agentes de IA está sendo especificada e estruturada (o conteúdo em Markdown/frontmatter é o contexto que esses agentes vão consumir), mas a execução real de agentes atuando sobre o negócio é etapa futura, fora do escopo deste briefing.
- **Não substitui o processo de consultoria em andamento com a Traevo.** O sistema é destino do que a consultoria produz (AS-IS, TO-BE, ICP, Playbook), não um atalho para pular etapas do diagnóstico ou da metodologia Método Evolutiva®.
- **Não é um sistema multiusuário com controle de permissões neste momento.** Foi desenhado para o uso de uma pessoa concentrando a decisão comercial; controle de acesso por papel é preocupação futura, ligada à evolução da equipe.

## 6. Escopo desta fase vs. futuro

**Nesta fase:**
- Webapp Next.js (App Router), estendendo o `obitec-kb` já existente, com shadcn/ui e Storybook.
- Conteúdo em arquivo: Markdown + frontmatter (gray-matter), sem banco de dados. Leitura e escrita via sistema de arquivos, com API própria (`src/app/api/content`).
- Escopo de seções a estender além de "Projeto" e "Pipelines" definido conforme o conteúdo disponível hoje em `Documentos/` e os entregáveis futuros da consultoria (TO-BE, ICP, Playbook, KPIs).
- Camada de agentes de IA: **especificação e estrutura de dados**, não execução. Isto significa garantir que o frontmatter e a organização do conteúdo sejam suficientes para que um agente consiga consumir o contexto de forma confiável: não construir os agentes em si nem integrá-los operacionalmente ao sistema.

**Futuro (fora deste escopo, mas planejado):**
- **Supabase como camada de persistência.** Quando o volume de conteúdo, a necessidade de histórico de versões ou o número de editores simultâneos justificar, o conteúdo migra de arquivo para banco. O modelo de frontmatter foi pensado para tornar essa migração direta (campos estruturados hoje mapeiam para colunas depois).
- **Execução real de agentes de IA** integrados ao sistema, atuando sobre o conteúdo (não só lendo-o): por exemplo, sugerindo atualizações de pipeline ou gerando materiais por decisor a partir do conteúdo vigente.
- **Multiusuário e controle de acesso**, quando a equipe comercial deixar de ser uma única pessoa.

## 7. Riscos e dependências

- **Duas versões de pipeline coexistindo.** O diagnóstico comercial define três pipelines operacionais oficiais: GDQ, Nutrição e Captação de Parceiros. Um documento HTML de base de conhecimento propõe, em paralelo, um quarto pipeline ("Oportunidades Qualificadas"), explicitamente descrito ali como não decidido ("ainda não está definido se será desenvolvido ou adotado"). **Isso já está refletido no conteúdo atual do `obitec-kb`:** `content/pipelines/oportunidades.md` está com `status: active` e o documento `content/projeto/visao-geral.md` lista "GDQ, Oportunidades, Parceiros" como os três pipelines do motor de receita: sem mencionar Nutrição. Ou seja, a divergência entre fonte oficial e proposta não validada já entrou no sistema como se fosse fato consolidado. Isso precisa ser resolvido (harmonizando com o diagnóstico oficial ou marcando explicitamente como hipótese em aberto) antes que agentes de IA consumam esse conteúdo como contexto confiável.
- **Mapeamento AS-IS formal ainda não produzido.** A Semana 1 da consultoria Traevo está em andamento; o entregável de fluxo BPM com swimlanes ainda não existe. O conteúdo atual sobre o AS-IS é uma síntese, não o mapeamento formal: o sistema deve estar preparado para receber e substituir essa síntese quando o entregável real chegar.
- **Consultoria em andamento: a informação de negócio pode mudar.** As semanas seguintes do Módulo Fundamento (TO-BE, ICP/validação, Playbook/KPIs/especificação de CRM, consolidação) ainda não aconteceram. Qualquer conteúdo estruturado agora sobre estratégia, ICP ou métricas é provisório por definição e deve ser tratado como tal (campo `status: draft` ou `review`, não `active`) até validação.
- **Dependência de disciplina de atualização.** Como o sistema não tem hoje controle multiusuário nem fluxo de revisão, sua utilidade para os agentes de IA depende inteiramente de Mauro manter o conteúdo atualizado. Conteúdo desatualizado é pior que ausência de conteúdo, porque os agentes vão tratá-lo como verdade.

## 8. Critérios de sucesso

- Mauro consulta o sistema, não os arquivos originais em `Documentos/`, quando precisa lembrar um número, uma etapa de pipeline ou uma definição estratégica.
- Toda edição de conteúdo de negócio relevante passa a acontecer no sistema, não em Word/Excel paralelos.
- Um agente de IA, ao ser apontado para o conteúdo do `obitec-kb`, consegue diferenciar o que é vigente do que é hipótese não validada, sem intervenção manual de curadoria a cada consulta.
- A divergência entre pipelines oficiais e a proposta não validada de "Oportunidades Qualificadas" está resolvida ou explicitamente sinalizada no conteúdo: não silenciosamente presente como fato.
- Quando os entregáveis das próximas semanas da consultoria Traevo chegarem (AS-IS formal, TO-BE, ICP, Playbook), existe um caminho claro para incorporá-los ao sistema sem redesenhar a estrutura de conteúdo.
- A estrutura de frontmatter atual é suficiente para, no futuro, mapear diretamente para um schema Supabase: sem exigir uma reescrita do modelo de dados quando essa migração acontecer.
