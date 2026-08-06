# OBI.TEC KB: Especificação Técnica (spec.md)

> Documento de especificação técnica para a extensão do projeto `obitec-kb`. Esta fase é **só spec**: nenhum código foi criado, editado ou executado como parte deste documento. A implementação é a fase seguinte (ver seção 8).
>
> **Nota de atualização:** desde a escrita original deste documento, o dev server já foi executado com sucesso e `content/pipelines/nutricao.md` já foi criado (`status: draft`), fechando o gap #5 descrito na seção 2. As demais referências a esse gap ao longo do texto ficam registradas como estavam no momento da spec.

---

## 1. Visão geral da arquitetura

O `obitec-kb` já é um projeto Next.js funcional em nível de código-fonte (nunca rodado: `node_modules/` não existe). Confirmado por leitura direta dos arquivos:

- **Next.js 14.2.5**, App Router (`src/app/`), React 18, TypeScript 5.
- **Tailwind CSS v3.4** (`tailwind.config.ts`) com paleta de marca `obi` (indigo) e variáveis CSS de shadcn em `src/app/globals.css`.
- **shadcn/ui** configurado via `components.json`: `style: "default"`, `baseColor: "slate"`, RSC habilitado, aliases `@/components`, `@/lib`, `@/components/ui`, `@/hooks`. Componentes já gerados: `badge`, `button`, `card`, `input`, `select`, `separator`, `textarea` (em `src/components/ui/`).
- **Storybook 8.2.6** (`@storybook/nextjs`), configurado em `.storybook/main.ts` e `.storybook/preview.ts`, com stories em `stories/` (`Badge.stories.tsx`, `ContentCard.stories.tsx`, `ViewToggle.stories.tsx`).
- **gray-matter 4.0.3** para parsing de frontmatter YAML, **react-markdown 9 + remark-gfm** para renderização, **date-fns** para datas.
- **Sem banco de dados.** Toda a persistência atual é arquivo `.md` em `content/`, lido/escrito via `fs` em `src/lib/content.ts`.

Esta especificação trata **exclusivamente de estender esse projeto existente**. Não há criação de um novo projeto, novo repositório, novo `package.json` ou nova stack. Toda proposta abaixo parte das convenções e arquivos já presentes no código (tipos em `src/types/content.ts`, funções em `src/lib/content.ts`, rotas em `src/app/`, componentes em `src/components/`).

O design visual (cores, tipografia, espaçamento) **não é definido aqui**: é responsabilidade do `design-spec.md`, escrito em paralelo. Onde esta spec menciona classes Tailwind ou tokens CSS existentes, é apenas para descrever o estado atual, não para prescrever a aparência final.

---

## 2. Estado atual (auditoria)

### O que já existe e funciona (em nível de código, não testado em runtime)

| Peça | Arquivo | Status |
|---|---|---|
| Modelo de tipos de conteúdo | `src/types/content.ts` | `ContentSection`, `ContentFrontmatter`, `ContentItem`, `NavSection`, `NavItem`, `ViewMode` definidos |
| Leitura/escrita de `.md` | `src/lib/content.ts` | `getContentDir`, `getAllSections`, `getSectionItems`, `getContentItem`, `saveContentItem`, `deleteContentItem`, `buildNav` |
| Rota de item | `src/app/[section]/[slug]/page.tsx` | Renderiza um documento (frontmatter + corpo MD via `ReactMarkdown`) |
| Rota de edição | `src/app/[section]/[slug]/edit/page.tsx` | Usa `ContentEditor` |
| API CRUD | `src/app/api/content/route.ts` | `GET` (lista por `section` ou item por `section`+`slug`), `PUT` (salva), `DELETE` |
| Editor de conteúdo | `src/components/editor/ContentEditor.tsx` | Formulário de frontmatter + textarea MD + preview, salva via `PUT /api/content` |
| Card de item | `src/components/content/ContentCard.tsx` | Suporta `mode: 'grid' | 'list'`, mas **não é referenciado por nenhuma página**: só existe a story `ContentCard.stories.tsx` |
| Alternador de visualização | `src/components/content/ViewToggle.tsx` | Par de botões (Grid/Lista): também **não é referenciado por nenhuma página** |
| Navegação lateral | `src/components/layout/Sidebar.tsx` | Constrói o menu a partir de `buildNav()`, com `sectionMeta` fixo |
| Conteúdo real | `content/projeto/visao-geral.md`, `content/pipelines/{gdq,oportunidades,parceiros}.md` | 4 documentos MD existentes, frontmatter consistente com `ContentFrontmatter` |
| Home | `src/app/page.tsx` | `redirect('/projeto/visao-geral')`: não há página de índice geral |

### GAPS concretos (o que falta para atender aos requisitos do usuário)

1. **Não existe rota de listagem por seção** (`app/[section]/page.tsx`). Este é o gap mais importante: `ContentCard` e `ViewToggle` foram construídos e têm stories no Storybook, mas nenhuma página real os importa ou os conecta a `getSectionItems()`. Hoje, navegar para `/pipelines` (sem slug) resulta em 404, porque a única rota dinâmica existente é `[section]/[slug]`.
2. **`ContentSection` é um union type fechado** (`'projeto' | 'pipelines'`) em `src/types/content.ts`. Isso trava estaticamente a adição de `estrategia`, `bmc`, `base-conhecimento`, `agentes`: qualquer código que faça `switch`/`Record<ContentSection, …>` (como `sectionMeta` em `buildNav()`) precisa ser atualizado em conjunto com o tipo.
3. **`sectionMeta` em `buildNav()` (`src/lib/content.ts`, linhas 78-81) é um `Record<ContentSection, …>` hardcoded** apenas com `projeto` e `pipelines`. Novas seções cairiam no fallback `meta ?? { label: section, icon: 'Folder' }` (linha 87): funcional, mas sem rótulo/ícone corretos até que o mapa seja atualizado.
4. **Faltam conteúdos `.md` para as novas seções.** `content/` hoje só tem `projeto/` e `pipelines/` (3 itens: `gdq.md`, `oportunidades.md`, `parceiros.md`). Não existem as pastas `content/estrategia/`, `content/bmc/`, `content/base-conhecimento/`, `content/agentes/`. O material de origem está em `Documentos/01_Estrategia/`, `Documentos/02_BMC/`, `Documentos/03_Pipelines/`, `Documentos/04_Base_Conhecimento/` (formato `.docx`, ainda não convertido para MD).
5. **Dentro de `pipelines`, faltava o pipeline de Nutrição.** O conteúdo original cobria apenas GDQ, Oportunidades e Parceiros (os "três pipelines interdependentes" citados em `content/projeto/visao-geral.md`). Gap já fechado: `content/pipelines/nutricao.md` foi criado como primeiro pipeline da seção, com `status: draft` até validação contra a documentação formal.
6. **`ViewToggle` é um par de botões, não um `Select`.** O requisito do usuário pede um único componente `select` para escolher entre grid/lista; a implementação atual usa dois `<button>` (linhas 16-39 de `ViewToggle.tsx`). O `Select` do shadcn já está disponível (`src/components/ui/select.tsx`, usado em `ContentEditor.tsx`), mas `ViewToggle` não o consome.
7. **Não há superfície de acesso para agentes de IA além do filesystem e da API parcial.** `GET /api/content` hoje exige `section` como parâmetro obrigatório (retorna 400 sem ele) e nunca retorna um índice completo de todas as seções: não é um manifesto agregado.
8. **`node_modules/` não está instalado**: o projeto nunca foi executado (`npm install` nunca rodou). Isso é execução, não spec; citado aqui apenas como constatação de estado, tratado como próximo passo na seção 8.

---

## 3. Modelo de conteúdo

### 3.1. Extensão de `ContentSection`

Em `src/types/content.ts`, o union type atual:

```ts
export type ContentSection = 'projeto' | 'pipelines'
```

deve ser estendido para cobrir as quatro novas seções, seguindo a ordem de `Documentos/` (`01_Estrategia`, `02_BMC`, `03_Pipelines`, `04_Base_Conhecimento`) mais a seção `agentes` (camada de agentes, seção 5) e a seção `projeto` já existente:

```ts
export type ContentSection =
  | 'projeto'
  | 'estrategia'
  | 'bmc'
  | 'pipelines'
  | 'base-conhecimento'
  | 'agentes'
```

Observações:
- `base-conhecimento` usa hífen (consistente com o padrão de slugs já usado em `slugify()` de `src/lib/utils.ts` e com o nome de pasta que o Next.js App Router aceita em `[section]`).
- A ordem de exibição no `Sidebar` não é definida pela ordem do union type (TypeScript não garante ordem de iteração de union types), e sim pela ordem de retorno de `getAllSections()`: ver GAP na seção 4 sobre a necessidade de uma ordenação explícita.

### 3.2. Extensão de `ContentFrontmatter`

A interface atual:

```ts
export interface ContentFrontmatter {
  title: string
  section: ContentSection
  slug: string
  description?: string
  status: ContentStatus
  icon?: string
  order?: number
  owner?: string
  lastUpdated?: string
  tags?: string[]
  // pipeline-specific
  pipeline?: string
  team?: string
  objective?: string
}
```

já tem campos genéricos suficientes para a maioria dos casos (`title`, `description`, `status`, `owner`, `tags`, `order`). Faltam campos específicos de BMC e de Pipeline mais completos, e um campo de proveniência para itens migrados de `.docx`. Proposta de extensão (todos opcionais, para não quebrar os documentos MD já existentes):

```ts
export interface ContentFrontmatter {
  title: string
  section: ContentSection
  slug: string
  description?: string
  status: ContentStatus
  icon?: string
  order?: number
  owner?: string
  lastUpdated?: string
  tags?: string[]

  // pipeline-specific (já existentes + novos, ver PRD seção 3.4)
  pipeline?: string
  team?: string
  objective?: string
  stageCount?: number             // nº de etapas do pipeline (ex: 7 para GDQ, 4 para Nutrição)
  sla?: string                    // SLA-resumo do pipeline, para exibir em card

  // bmc-specific
  // Nenhum campo próprio de bloco de canvas (ex.: "bmcBlock"/"relatedBlocks"): decisão de
  // produto explícita no PRD (seção 3.3): cada BMC é UM documento com os 9 blocos do canvas
  // como seções `##` no corpo Markdown, não um item por bloco. O único campo usado aqui é o
  // `pipeline` acima, para amarrar o BMC ao pipeline correspondente.

  // estrategia-specific
  // Nenhum campo extra: decisão de produto explícita no PRD (seção 3.2). Usar `objective`
  // (já existente) para o resumo de uma linha de cada documento.

  // agentes-specific (ver seção 5)
  agentKind?: 'skill' | 'llm-agent' | 'automation'
  agentStatus?: 'conectado' | 'desconectado' | 'planejado'
  readsSections?: ContentSection[]   // seções que o agente lê como contexto
  writesSections?: ContentSection[]  // seções em que o agente pode propor/gravar edição (separado
                                      // de readsSections de propósito: ver PRD seção 3.6, requisito
                                      // de não misturar permissão de leitura e escrita num só campo)
  capabilities?: string[]         // ex: ["ler-conteudo", "propor-edicao", "resumir"]
  lastRunAt?: string               // timestamp da última execução/leitura registrada

  // comum a todas as seções
  sourceDoc?: string               // arquivo de origem em Documentos/, ex: "Canvas_Modelo_Negocio_OBI.TEC.docx"
  reviewNeeded?: boolean           // sinaliza itens a revisar contra a fonte antes de tratar como fato
}
```

Nenhum campo é obrigatório além dos já existentes (`title`, `section`, `slug`, `status`): isso preserva compatibilidade retroativa com `content/projeto/visao-geral.md` e os arquivos em `content/pipelines/`, que continuam válidos sem alteração.

> **Nota de reconciliação:** esta interface foi ajustada após comparação com `prd.md` (seções 3.1, 3.4, 3.6) para eliminar duas divergências: (1) o campo de proveniência estava nomeado `docSource` no PRD e `sourceDoc` aqui: unificado para `sourceDoc` em ambos os documentos; (2) o schema de agentes tinha campos diferentes em cada documento (`agentType`/`writesSections` vs. `agentKind`/`accessScope`): unificado aqui e no PRD para `agentKind` + `agentStatus` + `readsSections` + `writesSections` + `capabilities` + `lastRunAt`. Os campos `bmcBlock`/`relatedBlocks`/`horizonte`/`pilar` de uma versão anterior deste documento foram removidos por contradizerem decisões de produto explícitas do PRD (seções 3.2 e 3.3).

### 3.3. Estrutura de pastas em `content/`

Espelhando `Documentos/` e as seções do tipo estendido:

```
content/
  projeto/                 ← já existe (visao-geral.md)
  estrategia/               ← novo, espelha Documentos/01_Estrategia/
  bmc/                       ← novo, espelha Documentos/02_BMC/
  pipelines/                ← já existe (gdq.md, nutricao.md, oportunidades.md, parceiros.md)
  base-conhecimento/         ← novo, espelha Documentos/04_Base_Conhecimento/
  agentes/                   ← novo, sem equivalente em Documentos/ (nasce nesta spec)
```

`getAllSections()` (em `src/lib/content.ts`, linha 12) já faz `fs.readdirSync(CONTENT_DIR)` e não precisa de alteração de lógica: basta que as pastas existam. O `as ContentSection[]` no retorno (linha 15) passa a ser type-safe de fato quando o union type for estendido (hoje ele é um cast otimista que compila mesmo com nomes de pasta arbitrários).

---

## 4. Rotas e páginas a criar

### 4.1. Rota de listagem por seção: `src/app/[section]/page.tsx` (gap principal)

Não existe hoje. Deve ser criada como Server Component seguindo o padrão de `src/app/[section]/[slug]/page.tsx` (import de `Sidebar`, `buildNav`, mesmo layout de `flex h-screen`), mas usando `getSectionItems(section)` em vez de `getContentItem`. Estrutura proposta:

```tsx
// src/app/[section]/page.tsx
import { getSectionItems, buildNav } from '@/lib/content'
import { Sidebar } from '@/components/layout/Sidebar'
import { ContentCard } from '@/components/content/ContentCard'
import { ViewToggle } from '@/components/content/ViewToggle'
import type { ContentSection, ViewMode } from '@/types/content'

interface PageProps {
  params: { section: string }
}

export default async function SectionPage({ params }: PageProps) {
  const { section } = params
  const nav = buildNav()
  const items = getSectionItems(section as ContentSection)
  // ViewMode: client-side state (grid|list), ver 4.3 sobre ViewToggle
  // renderiza <Sidebar nav={nav} /> + cabeçalho da seção + <ViewToggle /> +
  // grid/lista de <ContentCard item={item} mode={viewMode} />
}
```

Pontos a decidir na implementação (fora do escopo desta spec, mas registrados como decisão de design de rota):
- `ViewMode` precisa de estado no cliente (`useState`) porque `ViewToggle` é `'use client'`: isso implica extrair a lista de cards para um Client Component filho (ex: `SectionContent.tsx`) que recebe `items: ContentItem[]` como prop do Server Component pai, análogo ao padrão já usado em `ContentEditor.tsx` (client) recebendo `item` do `EditPage` (server).
- Itens com `status: 'draft'` devem seguir a mesma convenção visual que já existe no `Sidebar` (marcação "rascunho").

### 4.2. Ajustes em `buildNav()` / `sectionMeta` (`src/lib/content.ts`)

O `sectionMeta` (linhas 78-81) precisa ganhar entradas para as quatro novas seções, com ícones Lucide já mapeados em `ICONS` do `Sidebar.tsx` (`Target`, `BarChart2`, `BookOpen`, `Users` já estão disponíveis; faltaria adicionar um ícone para `agentes`, ex: `Layers` ou um novo, como `Bot` do lucide-react):

```ts
const sectionMeta: Record<ContentSection, { label: string; icon: string }> = {
  projeto: { label: 'Projeto', icon: 'Building2' },
  estrategia: { label: 'Estratégia', icon: 'Target' },
  bmc: { label: 'BMC', icon: 'Layers' },
  pipelines: { label: 'CRM', icon: 'Workflow' },
  'base-conhecimento': { label: 'Base de Conhecimento', icon: 'BookOpen' },
  agentes: { label: 'Agentes', icon: 'Bot' },
}
```

Ao mudar `sectionMeta` para `Record<ContentSection, …>` completo (hoje já é esse tipo, mas incompleto de fato: TypeScript não valida porque o union type atual só tem 2 membros), o compilador passa a forçar que toda seção do union tenha entrada: isso é desejável e deve ser tratado como parte da mesma mudança que estende `ContentSection` (seção 3.1), não como passo separado.

Se a ordem de exibição no Sidebar precisar seguir exatamente `projeto → estrategia → bmc → pipelines → base-conhecimento → agentes` (ordem de `Documentos/` + agentes ao final), `getAllSections()` precisa parar de depender da ordem de `fs.readdirSync` (que é alfabética/dependente do SO) e passar a ordenar por um array explícito de ordem de seções: já implementado como `SECTION_ORDER: ContentSection[]` em `src/lib/content.ts` para as seções atuais (`projeto`, `pipelines`, `documentacao`); ao adicionar `estrategia`, `bmc`, `base-conhecimento`, `agentes`, esse array precisa crescer na mesma ordem.

### 4.3. `ViewToggle` como `Select`

Fora do escopo de implementação desta fase, mas a decisão de rota depende disso: `ViewToggle.tsx` deve ser reescrito para usar `Select`/`SelectTrigger`/`SelectContent`/`SelectItem` de `@/components/ui/select` (o mesmo padrão já usado em `ContentEditor.tsx` para `status` e `icon`), mantendo a mesma prop interface (`value: ViewMode`, `onChange: (mode: ViewMode) => void`) para não exigir mudança nos consumidores futuros.

---

## 5. Camada de agentes e skills (núcleo técnico desta spec)

Requisito do usuário: múltiplos agentes de IA (Claude, outros LLMs, skills locais) devem poder **ler** o mesmo conteúdo que o usuário edita na interface, e **potencialmente propor** edições: trabalhando junto com o usuário. Esta seção especifica só a **superfície de acesso**; não especifica motor de execução, autenticação ou automação real (explicitamente fora de escopo).

### 5.1. Opção A: Acesso direto ao filesystem

Para agentes que rodam no mesmo ambiente do usuário (ex: Claude Code, um agente CLI local, uma skill que roda no mesmo host), o acesso mais simples é ler `content/**/*.md` diretamente:

- Já é a fonte da verdade: nenhuma camada extra, nenhuma sincronização a manter.
- O agente lê o frontmatter YAML com qualquer parser (mesmo formato que `gray-matter` consome).
- Para **propor** uma edição sem gravar diretamente, o padrão recomendado é o agente escrever um arquivo paralelo (ex: `content/<section>/<slug>.proposed.md` ou um diff) em vez de sobrescrever o `.md` original: isso preserva a garantia de que a interface e o usuário são a autoridade final sobre o conteúdo publicado. (A definição exata do mecanismo de proposta/revisão é implementação futura; aqui fixamos apenas o princípio de não-sobrescrita direta.)
- Limitação: não serve para agentes que não têm acesso ao filesystem local (ex: um LLM hospedado externamente, sem mount do repositório).

### 5.2. Opção B: Endpoint/manifesto HTTP

Para agentes sem acesso ao filesystem, `GET /api/content` (`src/app/api/content/route.ts`) precisa evoluir de "lista de uma seção" para um **índice completo**. Hoje:

```ts
// GET /api/content?section=pipelines           → ContentItem[] da seção
// GET /api/content?section=pipelines&slug=gdq   → ContentItem único
// (sem section) → 400 { error: 'section required' }
```

Proposta: adicionar um modo de índice completo quando nenhum `section` é passado, em vez de retornar erro 400:

```ts
// GET /api/content  (sem query params)
// → {
//     sections: { id: ContentSection; label: string; icon: string }[],
//     items: ContentItem[],          // todos os itens de todas as seções
//   }
```

Isso reaproveita `buildNav()` (para `sections`) e `getAllSections()` + `getSectionItems()` (para `items`), sem exigir nenhuma estrutura de dados nova: é uma composição das funções já existentes em `src/lib/content.ts`. O comportamento atual (`GET ?section=X` e `GET ?section=X&slug=Y`) é preservado sem alteração; a mudança é apenas tratar a ausência de `section` como "modo índice" em vez de erro.

Este endpoint é **somente leitura** nesta fase (o `PUT`/`DELETE` existentes continuam servindo exclusivamente a interface do usuário: não há, nesta spec, um contrato de escrita para agentes externos via API).

### 5.3. Seção de conteúdo `agentes`

Consistente com a filosofia "tudo é MD + frontmatter" do projeto: cada agente ou skill (Claude, outro LLM, uma skill local) é representado como um item de conteúdo em `content/agentes/<slug>.md`, usando os campos `agentKind`, `agentStatus`, `capabilities`, `accessScope` propostos na seção 3.2. Exemplo ilustrativo (não é conteúdo real a ser criado nesta fase, apenas exemplo de formato):

```yaml
---
title: Claude (Claude Code)
section: agentes
slug: claude-code
description: Agente de codificação com acesso ao filesystem do projeto
status: active
agentKind: llm-agent
agentStatus: conectado
capabilities:
  - ler-conteudo
  - propor-edicao
readsSections:
  - projeto
  - estrategia
  - bmc
  - pipelines
  - base-conhecimento
writesSections: []
owner: Nelly Miranda
---

Descrição em Markdown do papel deste agente, como ele acessa o conteúdo (Opção A, filesystem direto) e quaisquer observações operacionais.
```

Essa seção `agentes` aparece no Sidebar e na rota de listagem `/agentes` (seção 4.1) como qualquer outra seção: o usuário pode ver, em uma tela só, quais agentes existem, o que cada um pode fazer e se está conectado ou não. Não há, nesta fase, nenhum código que efetivamente conecte um agente a essa entrada: o item MD é documentação/registro, não configuração ativa.

### 5.4. Fora de escopo (explícito)

Não fazem parte desta spec: motor de execução de agentes (orquestração, scheduling, filas), autenticação/autorização de agentes externos, webhooks ou automações que gravem conteúdo automaticamente, e qualquer mecanismo de merge/aprovação de propostas de edição. Esses itens ficam registrados como decisões futuras, a especificar quando a "Camada de agentes" evoluir de superfície de leitura para execução real.

---

## 6. Plano de dados futuro (Supabase): NÃO implementado nesta fase

O filesystem MD (`content/**/*.md`) continua sendo a **única fonte da verdade** no estado atual e ao final desta fase de implementação. O esboço abaixo é documentação de intenção para uma migração futura, quando/se o projeto precisar de: edição concorrente multi-usuário, versionamento de conteúdo, ou consulta estruturada (filtros, busca) que o filesystem não oferece de forma nativa.

Esboço de schema (nomes ilustrativos, sujeitos a revisão quando a migração for de fato especificada):

```sql
-- sections: espelha o union type ContentSection
create table sections (
  id text primary key,              -- 'projeto' | 'estrategia' | 'bmc' | ...
  label text not null,
  icon text,
  sort_order integer not null default 99
);

-- content_items: espelha ContentFrontmatter + corpo (reconciliado com o schema final da seção 3.2)
create table content_items (
  id uuid primary key default gen_random_uuid(),
  section_id text references sections(id),
  slug text not null,
  title text not null,
  description text,
  status text not null,             -- ContentStatus: draft|review|active|archived
  icon text,
  sort_order integer default 99,
  owner text,
  team text,
  objective text,
  tags text[],
  stage_count integer,               -- pipeline-specific
  sla text,                          -- pipeline-specific
  source_doc text,                   -- comum: arquivo de origem em Documentos/
  review_needed boolean default false, -- comum: sinaliza item a revisar contra a fonte
  body_markdown text not null,      -- corpo MD, equivalente ao `content` do gray-matter
  last_updated timestamptz,
  created_at timestamptz not null default now(),
  unique (section_id, slug)
);
-- Nota: sem colunas para blocos de BMC ou "horizonte"/"pilar" de estratégia: decisão de produto
-- do PRD (seções 3.2/3.3) é manter esse conteúdo no corpo Markdown, não em campos estruturados.

-- agents: espelha os itens da seção `agentes` com campos tipados
create table agents (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid references content_items(id),
  agent_kind text,                  -- 'skill' | 'llm-agent' | 'automation'
  agent_status text,                -- 'conectado' | 'desconectado' | 'planejado'
  capabilities text[],
  reads_sections text[],            -- ContentSection[]: separado de writes_sections de propósito
  writes_sections text[],           -- ContentSection[]
  last_run_at timestamptz
);
```

Esse esboço é puramente ilustrativo de mapeamento campo-a-campo com `ContentFrontmatter`; não há decisão tomada sobre ORM, RLS, ou estratégia de sincronização MD↔Supabase nesta fase.

---

## 7. Componentes / Storybook

- `ContentCard.tsx`, `ViewToggle.tsx` e `ContentEditor.tsx` continuam sendo a base de UI para conteúdo: nenhum deles é substituído, apenas conectados (`ContentCard`/`ViewToggle`, gap #1) ou adaptados (`ViewToggle`, seção 4.3).
- `ViewToggle` precisa ser reescrito de par-de-botões para `Select` do shadcn (`@/components/ui/select`), conforme requisito explícito do usuário (item 1 dos requisitos de produto): a interface de props (`value`/`onChange`) deve ser preservada para minimizar o impacto em quem já a consome.
- Toda story em `stories/` deve continuar refletindo o componente real: `ViewToggle.stories.tsx` precisa ser atualizada junto com a reescrita do componente (mesma PR/mudança), e qualquer componente novo (ex: um eventual `SectionContent.tsx` client wrapper da seção 4.1, ou variações de `ContentCard` para a seção `agentes`) deve ganhar sua própria story, seguindo o padrão já estabelecido por `ContentCard.stories.tsx` e `Badge.stories.tsx`.
- Nenhuma cor, espaçamento ou tipografia é definida por esta spec: a implementação visual de qualquer componente novo/alterado segue os tokens definidos em `design-spec.md` (documento paralelo, tokens exatos de paleta e tipografia).

---

## 8. Próximos passos de execução (fora do escopo desta spec)

Checklist para a fase de implementação seguinte:

- [x] Instalar dependências (`npm install` em `obitec-kb/`): primeira execução real do projeto.
- [x] Rodar `npm run dev` para validar que o projeto builda (foi necessário converter `next.config.ts` para `next.config.mjs`, incompatível com Next.js 14.2.5, e completar o mapeamento de cores shadcn em `tailwind.config.ts`).
- [ ] Rodar `npm run storybook` para validar o Storybook no estado atual.
- [ ] Aplicar os tokens visuais definidos em `design-spec.md` (paleta, tipografia, espaçamento) onde hoje há placeholders (paleta `obi`, variáveis `--sidebar-*`, classes `prose-obi`).
- [ ] Estender `ContentSection` e `ContentFrontmatter` em `src/types/content.ts` conforme seção 3 (além de `documentacao`, já adicionada).
- [ ] Criar as pastas `content/estrategia/`, `content/bmc/`, `content/base-conhecimento/`, `content/agentes/`.
- [ ] Criar `src/app/[section]/page.tsx` (rota de listagem) conforme seção 4.1, incluindo o client wrapper necessário para `ViewToggle`.
- [ ] Atualizar `sectionMeta` em `buildNav()` (`src/lib/content.ts`) e o mapa `ICONS` em `Sidebar.tsx` para as novas seções.
- [ ] Reescrever `ViewToggle.tsx` para usar `Select` do shadcn; atualizar `ViewToggle.stories.tsx`.
- [ ] Evoluir `GET /api/content` para o modo de índice completo (seção 5.2).
- [ ] Popular o conteúdo MD das seções `estrategia`, `bmc`, `base-conhecimento` a partir dos `.docx` em `Documentos/01_Estrategia/`, `Documentos/02_BMC/`, `Documentos/04_Base_Conhecimento/` (conversão de conteúdo, não apenas estrutura).
- [x] Criar `content/pipelines/nutricao.md` (pipeline de Nutrição, gap #5 fechado, como primeiro item da seção CRM).
- [ ] Renomear `content/pipelines/parceiros.md` → `captacao-parceiros.md` (slug e frontmatter `slug` correspondentes), alinhado à nomenclatura definida no PRD (seção 2.4), e revisar o conteúdo das 4 etapas atuais para as 7 etapas formais de `Pipeline_Captacao_Parceiros_OBI.TEC.docx`.
- [ ] Criar os itens iniciais de `content/agentes/` (ex: registro do próprio Claude/Claude Code como primeiro agente conectado).

---

*Documento gerado a partir da leitura direta do código-fonte de `obitec-kb/` em 2026-08-06. Nenhum arquivo de código foi criado, editado ou executado nesta fase.*
