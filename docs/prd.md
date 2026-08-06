# PRD: OBI.TEC Base de Conhecimento (obitec-kb)

**Versão:** 1.0
**Data:** 2026-08-06
**Autor:** Nelly Miranda (consultoria de processos) para Mauro Pires / OBI.TEC
**Status:** rascunho para validação com o dono do produto

---

## 1. Resumo do produto

O `obitec-kb` é um webapp interno da OBI.TEC que funciona como a camada de "inteligência do negócio" e sistema de tomada de decisão para a estratégia comercial da empresa: um lugar único onde Mauro Pires edita as informações que hoje vivem espalhadas em documentos (`Documentos/01_Estrategia`, `02_BMC`, `03_Pipelines`, `04_Base_Conhecimento`) e onde múltiplos agentes de IA e skills leem exatamente esse mesmo conteúdo para colaborar no desenvolvimento comercial. Cada documento é um arquivo Markdown com frontmatter estruturado: o frontmatter e o corpo MD não são apresentação, são o contexto que os agentes consomem; editar na interface é editar o que a IA lê. Esta versão não introduz banco de dados nem motor de execução de agentes: o objetivo é consolidar a arquitetura de informação (seções e páginas), o schema de conteúdo e a superfície de produto para "Agentes & Skills", usando cards com alternância grid/lista como padrão de listagem em todo o app. Este PRD assume e estende o `obitec-kb` já existente (Next.js 14 + Markdown/frontmatter via `gray-matter`, sem banco de dados): não propõe reescrevê-lo.

---

## 2. Arquitetura de informação

Princípio geral: a ordem e o agrupamento das seções seguem a ordem já estabelecida pelo dono do produto em `Documentos/` (`01_Estrategia` → `02_BMC` → `03_Pipelines` → `04_Base_Conhecimento`), precedida pela seção `projeto` que já existe hoje e sucedida por uma nova seção `agentes` que não tem equivalente em pasta porque é uma capacidade nova do próprio webapp. `ContentSection` (hoje `'projeto' | 'pipelines'` em `src/types/content.ts`) precisa crescer para `'projeto' | 'estrategia' | 'bmc' | 'pipelines' | 'base-conhecimento' | 'agentes'`.

### 2.1 `projeto` (já existe: complementar)

Objetivo para o usuário: contexto de por que este projeto de transformação comercial existe e onde ele está no calendário. É a porta de entrada do app.

Itens:
- **Visão Geral** (`visao-geral.md`, já existe): posicionamento, verticais, modelo de receita.
- **Diagnóstico e Contexto Atual** (novo, `diagnostico-contexto.md`): os 6 pontos críticos atuais (concentração comercial em uma pessoa, dependência de 35% da receita num único parceiro, canais de aquisição não estruturados, lógicas de mercado diferentes por produto, ausência de métricas comerciais formalizadas, marketing e vendas desconectados). Serve de justificativa permanente para por que os pipelines e BMCs existem.
- **Cronograma do Projeto** (novo, `cronograma.md`): espelha `Documentos/03_Pipelines/obitec_cronograma.xlsx`. Fica em `projeto` (não em `pipelines`) porque é cronograma do projeto de transformação como um todo, não de um pipeline específico; ver seção 7 sobre a decisão de não trazer uma ferramenta de diagramação/Gantt nesta versão: aqui o corpo MD carrega marcos e fases como lista/tabela simples.

### 2.2 `estrategia` (nova)

Objetivo: onde vivem as decisões estruturais do negócio: o que a empresa é, para quem, e como se posiciona: espelhando `Documentos/01_Estrategia/`.

Itens (um por `.docx` de origem):
- **Canvas de Modelo de Negócio** (`canvas-modelo-negocio.md`): de `Canvas_Modelo_Negocio_OBI.TEC.docx`.
- **Cultura e Identidade de Marca** (`cultura-identidade-marca.md`): de `Cultura_Identidade_Marca_OBI.TEC.docx`.
- **Diagnóstico Comercial** (`diagnostico-comercial.md`): de `Diagnostico_Comercial_OBI.TEC.docx`. Não confundir com "Diagnóstico e Contexto Atual" de `projeto`: este é o diagnóstico comercial formal e detalhado (documento de origem próprio); aquele é o resumo executivo dos 6 pontos críticos usado como contexto rápido do projeto.
- **Plano de Marketing e Vendas** (`plano-marketing-vendas.md`): de `Plano_Marketing_Vendas_OBI.TEC.docx`.

### 2.3 `bmc` (nova)

Objetivo: um BMC por pipeline comercial operacional: o modelo de negócio específico de cada motor de aquisição/relacionamento, espelhando `Documentos/02_BMC/`.

Itens:
- **BMC Captação de Parceiros** (`bmc-captacao-parceiros.md`): de `BMC_Captacao_Parceiros_OBI.TEC.docx`.
- **BMC Pipeline GDQ** (`bmc-gdq.md`): de `BMC_Pipeline_GDQ_OBI.TEC.docx`.
- **BMC Pipeline Nutrição** (`bmc-nutricao.md`): de `BMC_Pipeline_Nutricao_OBI.TEC.docx`.

Não há um 4º BMC para "Oportunidades Qualificadas" na pasta `Documentos/02_BMC/`: reforça que esse pipeline é hipótese não validada (ver 2.4 e seção 7), não um pipeline operacional com modelo de negócio formalizado.

### 2.4 `pipelines` (já existe: preencher gap)

Objetivo: o processo operacional passo a passo de cada motor comercial: etapas, responsáveis, SLAs, critérios de avanço, métricas. Espelha `Documentos/03_Pipelines/`.

Itens:
- **Pipeline GDQ** (`gdq.md`, já existe, mas hoje documenta 5 etapas com objetivo institucional descrito de forma mais genérica): deve ser revisado para refletir as **7 etapas** confirmadas em `Pipeline_GDQ_OBI.TEC.docx` antes de considerar este item "fonte de verdade". Registrar esse ajuste como tarefa de conteúdo, não de produto.
- **Pipeline Nutrição** (novo, `nutricao.md`): **gap confirmado**: existe BMC (`BMC_Pipeline_Nutricao_OBI.TEC.docx`) e pipeline formal (`Pipeline_Nutricao_OBI.TEC.docx`, 4 etapas) na documentação, mas não existia nenhum arquivo em `content/pipelines/` até esta versão. Era a lacuna de conteúdo mais visível deste PRD; a primeira versão do conteúdo já foi escrita como `content/pipelines/nutricao.md` e segue como `status: draft` até validação contra o `.docx` formal.
- **Pipeline Captação de Parceiros** (arquivo existente `parceiros.md` deve ser renomeado/realinhado para `captacao-parceiros.md` e revisado): hoje está com `status: draft` e objetivo "a redefinir", com uma estrutura de 4 etapas genérica. A documentação formal (`Pipeline_Captacao_Parceiros_OBI.TEC.docx`) descreve **7 etapas**. Este item precisa de uma revisão de conteúdo para alinhar com as 7 etapas formais antes de saltar para `status: active`.
- **Cronograma**: já tratado em 2.1 dentro de `projeto`, não duplicar aqui. Se no futuro o cronograma for entendido como parte específica de um pipeline (ex.: marcos por pipeline), reavaliar.

**Sobre "Oportunidades Qualificadas":** o arquivo `oportunidades.md` já existe em `content/pipelines/` e está com `status: active`, mas ele não corresponde a nenhum `.docx` em `Documentos/03_Pipelines/` nem a um BMC em `02_BMC/`: só aparece descrito no HTML de referência (`Base_Conhecimento_OBI.TEC.html`, "Pipeline 2 · Oportunidades Qualificadas") ao lado de GDQ e Captação de Parceiros, num conjunto de 3 pipelines diferente do conjunto formal (GDQ, Nutrição, Captação de Parceiros) que tem BMC e docx dedicados. Ou seja, há duas versões concorrentes de "quais são os pipelines" circulando no material de origem, e isso ainda não foi resolvido pelo dono do produto. Tratamento proposto nesta versão: manter `oportunidades.md` como está (não apagar, não promover), sinalizar seu `status` como algo a revisar com Mauro, e **não** criar uma nova página formal de "Oportunidades Qualificadas" dentro de `bmc` até essa hipótese ser validada: ver seção 7 (fora de escopo).

### 2.5 `base-conhecimento` (nova)

Objetivo: índice de referência consolidado: o material de apoio (cases, dados de mercado, argumentários) que sustenta os outros documentos, sem ser ele próprio um documento operacional. Espelha `Documentos/04_Base_Conhecimento/`.

Itens propostos (a estrutura interna do HTML de origem é rica; nesta versão, tratar como um índice, não replicar o HTML inteiro página a página):
- **Índice da Base de Conhecimento** (`indice.md`): sumário com links/resumos das seções do `Base_Conhecimento_OBI.TEC.html` (ex.: cases citados: Grupo Vequis, Já Entendi Agro, iugu; dados de mercado como "71% dos compradores exigem interações hiperpersonalizadas", Modelo PCP, conceito de Pontes Largas). Cada bloco relevante pode virar um item próprio (`## `) dentro deste arquivo em vez de uma página separada, para não fragmentar demais nesta primeira versão.
- Se o volume crescer, dividir depois em itens como `cases-referencia.md`, `modelo-pcp.md`, `pontes-largas.md`: mas não fazer essa divisão nesta versão sem necessidade concreta (evitar página vazia por antecipação).

### 2.6 `agentes` (nova: capacidade do produto, não documento de origem)

Objetivo: onde Mauro vê quais agentes de IA e skills estão conectados ao app, o que cada um faz, e confirma que eles leem o mesmo conteúdo que ele edita. Detalhado na seção 4.

Itens (páginas dentro da seção, análogas a um "item" de conteúdo: também em Markdown+frontmatter, pelo mesmo padrão das outras seções):
- **Painel de Agentes** (`painel.md` ou página especial `/agentes` que lista os agentes registrados como cards): visão geral.
- Um item por agente/skill conectado (ex.: `agente-comercial.md`, `skill-diagnostico.md`), cada um com frontmatter descrevendo o que o agente faz, quais seções ele lê/edita, e histórico de última leitura/alteração (ver seção 4).

### Resumo da árvore final de `content/`

```
content/
  projeto/
    visao-geral.md              (existe)
    diagnostico-contexto.md     (novo)
    cronograma.md                (novo)
  estrategia/                    (nova seção)
    canvas-modelo-negocio.md
    cultura-identidade-marca.md
    diagnostico-comercial.md
    plano-marketing-vendas.md
  bmc/                           (nova seção)
    bmc-captacao-parceiros.md
    bmc-gdq.md
    bmc-nutricao.md
  pipelines/
    gdq.md                       (existe, revisar p/ 7 etapas)
    nutricao.md                  (existe: preenche o gap, status draft)
    captacao-parceiros.md        (existe como parceiros.md, revisar p/ 7 etapas)
    oportunidades.md             (existe, manter em observação: não validado)
  base-conhecimento/             (nova seção)
    indice.md
  agentes/                       (nova seção)
    painel.md
    <um arquivo por agente/skill>
```

---

## 3. Schema de conteúdo (frontmatter) por seção

Base atual (`src/types/content.ts`):

```ts
interface ContentFrontmatter {
  title: string
  section: ContentSection
  slug: string
  description?: string
  status: ContentStatus   // 'draft' | 'review' | 'active' | 'archived'
  icon?: string
  order?: number
  owner?: string
  lastUpdated?: string
  tags?: string[]
  pipeline?: string
  team?: string
  objective?: string
}
```

Decisão geral: **manter o frontmatter raso e mover estrutura complexa para o corpo Markdown como seções `##`/`###`**, em vez de aninhar objetos grandes em YAML. Motivos: (1) o editor atual (`ContentEditor.tsx`) é um formulário de frontmatter + textarea de corpo: campos aninhados complexos exigiriam um editor de formulário dinâmico que não existe hoje; (2) Markdown com `##` é o formato que os dois documentos de exemplo (`gdq.md`, `visao-geral.md`) já usam com sucesso; (3) agentes de IA consomem Markdown estruturado tão bem quanto YAML aninhado, e é mais fácil para Mauro editar texto corrido do que preencher 9 campos de canvas num formulário. Frontmatter continua sendo usado apenas para **metadados de indexação e filtragem** (o que aparece em cards, o que ordena listas, o que os agentes usam para decidir "o que ler primeiro").

### 3.1 Campos novos propostos no `ContentFrontmatter` (comuns, opcionais)

- `sourceDoc?: string`: nome do arquivo `.docx`/`.xlsx`/`.html` de origem em `Documentos/`, para rastreabilidade (ex.: `"Canvas_Modelo_Negocio_OBI.TEC.docx"`). Ajuda tanto humanos quanto agentes a saber se o conteúdo já foi conferido contra a fonte. (Nome unificado com `spec.md`: ambos os documentos usam `sourceDoc`.)
- `reviewNeeded?: boolean`: sinaliza itens como `gdq.md` e `captacao-parceiros.md`/`oportunidades.md` que precisam de revisão de conteúdo antes de serem tratados como fonte de verdade pelos agentes.

### 3.2 Seção `estrategia`

Sem campos extras de frontmatter: cada documento é predominantemente narrativo/textual na origem (Canvas de Modelo de Negócio à parte, ver 3.3). Usar `objective` (já existente) para o resumo de uma linha de cada documento. **Decisão explícita a respeitar na spec técnica:** não introduzir campos especulativos como "horizonte" ou "pilar" nesta seção: não há necessidade de produto identificada para eles, e frontmatter extra sem uso concreto é dívida, não flexibilidade.

### 3.3 Seção `bmc`

O Business Model Canvas tem 9 blocos clássicos (Segmentos de Clientes, Proposta de Valor, Canais, Relacionamento com Clientes, Fontes de Receita, Recursos Principais, Atividades-Chave, Parcerias Principais, Estrutura de Custos). Proposta: **não** representar os 9 blocos como 9 campos de frontmatter (tornaria o YAML enorme e frágil a edições parciais), e **não** criar um campo `bmcBlock` por item: cada BMC é um único documento com os 9 blocos no corpo, não 9 documentos. Em vez disso:
- Frontmatter ganha apenas `pipeline?: string` (já existe) para amarrar o BMC ao pipeline correspondente (`gdq` | `nutricao` | `captacao-parceiros`). Nenhum campo de frontmatter específico de bloco é necessário: esta é uma decisão de produto a ser respeitada na spec técnica, não uma sugestão em aberto.
- O corpo Markdown usa 9 seções `## ` fixas, uma por bloco do canvas, nesta ordem (para consistência entre os 3 BMCs e para que agentes saibam onde procurar cada bloco):
  ```
  ## Segmentos de Clientes
  ## Proposta de Valor
  ## Canais
  ## Relacionamento com Clientes
  ## Fontes de Receita
  ## Recursos Principais
  ## Atividades-Chave
  ## Parcerias Principais
  ## Estrutura de Custos
  ```

### 3.4 Seção `pipelines`

Já usa `pipeline`, `team`, `objective`: mantidos. Adicionar:
- `stageCount?: number`: número de etapas do pipeline (ex.: `7` para GDQ e Captação de Parceiros, `4` para Nutrição), usado em cards para mostrar "7 etapas" sem precisar contar `###` no corpo.
- `sla?: string`: SLA-resumo do pipeline como um todo, se existir um agregado (ex.: "qualificação em até 7 dias"), para exibir em card sem abrir o documento.
Estrutura de corpo mantida como já está em `gdq.md`: `## Etapas` com uma `### N. Nome da Etapa` por etapa, cada uma com **Responsável**, texto, **Ações** (lista), **Critério de avanço**; e uma seção final `## Métricas` com tabela de KPIs. Este padrão já é bom e deve ser replicado em `nutricao.md` e `captacao-parceiros.md`.

### 3.5 Seção `base-conhecimento`

Sem campos novos de frontmatter. Corpo organizado em `##` por tema (cases, dados de mercado, modelos/frameworks citados), cada bloco podendo linkar (`[[pipeline/gdq]]` ou link relativo) para os documentos de `pipelines`/`bmc`/`estrategia` que o citam: reforça que a Base de Conhecimento é referência cruzada, não conteúdo duplicado.

### 3.6 Seção `agentes`

Campos novos específicos (só usados quando `section: agentes`):
- `agentKind?: 'skill' | 'llm-agent' | 'automation'`: distingue uma skill/capacidade pontual de um agente autônomo baseado em LLM ou uma automação. (Substitui uma versão anterior mais simples deste campo: unificado com `spec.md`, que já usa esses três valores.)
- `agentStatus?: 'conectado' | 'desconectado' | 'planejado'`: estado da conexão do agente com o sistema (unificado com `spec.md`).
- `readsSections?: ContentSection[]`: lista de seções que este agente lê como contexto (ex.: `['estrategia', 'bmc', 'pipelines']`).
- `writesSections?: ContentSection[]`: seções em que o agente tem permissão de propor/gravar alterações (pode ser vazio, se for só leitura). Mantido como campo **separado** de `readsSections` (em vez de um único `accessScope`) porque o requisito 4 desta seção trata a distinção leitura/escrita como não-negociável: um campo único misturaria as duas permissões.
- `capabilities?: string[]`: lista livre do que o agente sabe fazer (ex.: `["ler-conteudo", "propor-edicao", "resumir"]`), para exibição no card e na página de detalhe.
- `lastRunAt?: string`: timestamp da última execução/leitura registrada.
Corpo Markdown descreve em prosa o que o agente/skill faz, como foi conectado, e (se aplicável) um changelog manual de decisões relevantes que ele influenciou.

---

## 4. Seção "Agentes & Skills": requisitos de produto

1. **Painel com um card por agente/skill conectado**, mostrando pelo menos: nome, tipo (`agentKind`: skill / llm-agent / automation), status (`agentStatus`: conectado / desconectado / planejado), quais seções ele lê (`readsSections`) e quais pode alterar (`writesSections`), e a data/hora da última execução (`lastRunAt`). Segue o mesmo padrão visual de cards das demais seções (ver seção 6): agentes não são uma categoria de UI separada, são conteúdo como qualquer outro item, só que com um schema próprio (3.6).
2. **Página de detalhe por agente** com descrição do que ele faz em linguagem de negócio (não jargão técnico de implementação), meta de uso (ex.: "ajuda a validar consistência entre BMC e Pipeline antes de uma reunião de revisão") e, se houver, os `writesSections` explicados em termos do que ele tem permissão de tocar.
3. **Histórico/log de leitura e alteração por agente**: cada vez que um agente lê ou altera um documento, deve existir um registro simples e auditável: mínimo viável nesta versão: uma lista append-only em Markdown (ex.: `## Histórico` dentro do próprio arquivo do agente, ou um arquivo `agentes/_log.md` compartilhado) com linhas `data · agente · seção/slug · ação (leu/alterou) · resumo de uma linha`. Não é necessário banco de dados para isso: é só mais um arquivo Markdown, consistente com a decisão de não introduzir Supabase nesta versão.
4. **Garantia de fonte única de verdade**: a documentação do produto (e, se possível, um indicador visível na própria página do agente) deve deixar explícito que os agentes leem os mesmos arquivos `.md` em `content/` que o usuário edita pela interface: não uma cópia, não um snapshot exportado. Na prática, isso significa que qualquer agente/skill conectado deve apontar para o mesmo diretório `content/` (ou para a mesma API `src/app/api/content/route.ts`) usado pela interface, e o PRD deve deixar registrado como não-negociável: nenhuma integração de agente nesta versão pode envolver duplicar conteúdo para um formato/lugar separado "só para a IA".
5. **Indicador de conflito/desatualização**: se um agente registra ter lido um documento numa versão e o `lastUpdated` do documento mudou depois disso, o painel deve sinalizar isso (ex.: badge "conteúdo mudou desde a última leitura do agente"): evita que Mauro confie em uma sugestão de agente baseada em informação já editada por ele.

---

## 5. User stories

Todas na perspectiva de Mauro (dono da empresa, principal usuário e editor).

1. Como Mauro, quero editar o Plano de Marketing e Vendas diretamente na interface, para que a mudança fique refletida no arquivo Markdown que tanto eu quanto os agentes de IA consultamos, sem precisar abrir um `.docx` separado.
2. Como Mauro, quero criar um novo documento na seção BMC (ex.: se decidirmos formalizar um BMC de Oportunidades Qualificadas no futuro) preenchendo um formulário com os campos do frontmatter e o corpo em Markdown, para não depender de editar arquivo por fora do app.
3. Como Mauro, quero alternar entre visualização em grade e em lista usando um seletor (select), para escolher a densidade de informação que preciso em cada momento: grade quando quero navegar visualmente, lista quando quero escanear títulos rápido.
4. Como Mauro, quero ver o status de cada um dos três pipelines (GDQ, Nutrição, Captação de Parceiros) de forma visível na listagem, para saber de imediato quais estão ativos, em revisão ou ainda em rascunho, sem abrir cada um.
5. Como Mauro, quero ver, na seção Pipelines, que falta o conteúdo de Nutrição, para priorizar escrevê-lo antes de discutir o pipeline com a equipe.
6. Como Mauro, quero abrir a página de um agente de IA conectado e entender exatamente quais documentos ele lê e quais ele tem permissão de alterar, para confiar (ou não) nas sugestões que ele me trouxer.
7. Como Mauro, quero que, quando eu edito o Diagnóstico Comercial, um agente de IA consiga puxar essa versão atualizada automaticamente na próxima vez que eu pedir a ele para revisar o Plano de Marketing e Vendas, para não ter que copiar e colar contexto manualmente entre uma conversa e outra.
8. Como Mauro, quero ver um histórico simples de quando um agente leu ou alterou um documento, para saber se uma sugestão que recebi já está desatualizada em relação a uma edição minha mais recente.
9. Como Mauro, quero navegar da Visão Geral do projeto direto para o Diagnóstico e Contexto Atual e para o Cronograma, para ter, numa única seção, a "capa" completa do projeto de transformação comercial.
10. Como Mauro, quero que a Base de Conhecimento me mostre, de forma indexada, os cases e dados de mercado (ex.: Grupo Vequis, Já Entendi Agro, iugu, "71% dos compradores exigem interações hiperpersonalizadas") sem precisar abrir o HTML original de 300KB, para usá-los rapidamente numa reunião comercial.

---

## 6. Requisitos de visualização

- **Cards, nunca tabelas**, em toda página de listagem de conteúdo (listagem por seção, ex. `/estrategia`, `/bmc`, `/pipelines`, `/base-conhecimento`, `/agentes`: hoje essas páginas de listagem por seção **não existem** ainda; só existem `/[section]/[slug]` de item individual e edição, então isso é trabalho novo de implementação, não só de conteúdo). Cada card mostra no mínimo: ícone, título, descrição/resumo (`description`), badge de status, e: quando aplicável: `owner`/`team` e tags.
- **Alternância grid/lista via componente `select`**, não par de botões. Isso é uma mudança em relação ao `ViewToggle.tsx` atual (`src/components/content/ViewToggle.tsx`), que hoje implementa dois `<button>` lado a lado ("Grid" / "Lista"): o pedido explícito do usuário foi por um `select`, então o componente deve ser refeito (ou substituído) para usar o `Select` do shadcn/ui já disponível em `src/components/ui/select.tsx`, com duas opções ("Grade" / "Lista"), preservando o tipo `ViewMode` (`'grid' | 'list'`) já existente em `src/types/content.ts`.
- **Badge de status por item**, usando os quatro valores já existentes em `ContentStatus` (`draft`, `review`, `active`, `archived`) com uma cor/rótulo distinto para cada (ex.: rascunho, em revisão, ativo, arquivado): consistente com o rótulo "rascunho" que a `Sidebar.tsx` já exibe para itens em `draft`.
- Cards de pipeline devem exibir o número de etapas (`stageCount`, ver 3.4) e, se presente, o `sla` resumido, para permitir comparação rápida entre GDQ / Nutrição / Captação de Parceiros sem abrir cada um.
- Cards da seção `agentes` seguem o mesmo componente-base de card, mas com campos próprios visíveis: tipo (`agente`/`skill`), seções que lê, e última execução: não é um componente visualmente separado, é o mesmo `ContentCard` com um "perfil" de dados diferente.

---

## 7. Fora de escopo (não-objetivos) desta versão

- **Sem banco de dados real.** Continua tudo em arquivos Markdown + frontmatter em `content/`, lidos e escritos via `gray-matter` (`src/lib/content.ts`), sem persistência em Supabase ou qualquer outro banco. Supabase é plano futuro, tratado em documento próprio quando chegar a hora: este PRD não define schema de banco nem migração.
- **Sem motor de execução real de agentes.** Esta versão define a *estrutura de produto* para agentes e skills (seção `agentes`, schema de frontmatter, painel, histórico/log em Markdown): não implementa a orquestração real de chamadas a modelos de IA, filas de execução, ou integração com APIs de agentes. O painel pode nascer com dados de exemplo/mock até que a integração real seja outro projeto.
- **Sem ferramenta de diagramação BPM.** O "Mapeamento AS IS" mencionado no material de referência (`portal_obitec.html`, item 02 dos entregáveis) permanece como documento textual/narrativo dentro de `estrategia` ou `base-conhecimento` nesta versão: não se constrói um editor visual de fluxogramas/BPMN dentro do app.
- **Sem página formal de "Oportunidades Qualificadas" como 4º pipeline.** Como detalhado na seção 2.4, esse pipeline aparece apenas no HTML de referência, sem BMC e sem `.docx` formal em `Documentos/03_Pipelines/`, e conflita com o conjunto de 3 pipelines que tem documentação completa (GDQ, Nutrição, Captação de Parceiros). O arquivo `oportunidades.md` já existente é mantido como está, sem promovê-lo a um BMC dedicado ou a um lugar de igual peso aos outros três, até Mauro validar explicitamente se esse é um pipeline separado, uma etapa do GDQ, ou uma sobreposição a descartar.

---

## Apêndice: mudanças de implementação implícitas neste PRD (para o time técnico, fora do escopo de decisão de produto)

- Ampliar o union type `ContentSection` em `src/types/content.ts` para incluir `'estrategia' | 'bmc' | 'base-conhecimento' | 'agentes'`.
- Adicionar entradas correspondentes em `sectionMeta` (`src/lib/content.ts`, função `buildNav`) com label e ícone para cada nova seção.
- Criar as páginas de listagem por seção (hoje inexistentes) que consomem `getSectionItems` e renderizam cards com o `ViewToggle` (refeito como `select`).
- Estender `ContentFrontmatter` com os campos novos da seção 3 (`sourceDoc`, `reviewNeeded`, `stageCount`, `sla`, `agentKind`, `agentStatus`, `readsSections`, `writesSections`, `capabilities`, `lastRunAt`), todos opcionais para não quebrar os documentos já existentes. Ver `spec.md` seção 3.2 para a interface TypeScript completa e já reconciliada com este PRD.
