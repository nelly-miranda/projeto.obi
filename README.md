# OBI.TEC · Base de Conhecimento

Web app para gestão de conhecimento comercial. Conteúdo em Markdown + frontmatter, sem banco de dados.

## Stack

- **Next.js 14** (App Router, RSC)
- **TypeScript**
- **Tailwind CSS v3**
- **Shadcn/ui** (Radix UI)
- **Storybook 8** (component explorer)
- **gray-matter** (frontmatter parsing)
- **react-markdown + remark-gfm** (MD rendering)

## Setup

```bash
cd obitec-kb
npm install
npm run dev        # → http://localhost:3000
npm run storybook  # → http://localhost:6006
```

## Estrutura

```
content/
  projeto/
    visao-geral.md       ← cada arquivo = um documento
  pipelines/              ← seção exibida como "CRM" no menu
    nutricao.md
    gdq.md
    oportunidades.md
    parceiros.md
  documentacao/           ← base de conhecimento (briefing, PRD, specs)
    briefing.md
    prd.md
    spec.md
    design-spec.md

src/
  app/
    [section]/[slug]/        ← view mode
    [section]/[slug]/edit/   ← editor mode
    api/content/             ← CRUD API (GET/PUT/DELETE)
  components/
    ui/         ← shadcn components (Button, Card, Badge…)
    layout/     ← Sidebar
    content/    ← ContentCard, ViewToggle
    editor/     ← ContentEditor (frontmatter form + MD textarea + preview)
  lib/
    content.ts  ← read/write .md files via gray-matter
    utils.ts
  types/
    content.ts  ← ContentItem, NavSection, ViewMode…
```

## Frontmatter de um documento

```yaml
---
title: Pipeline GDQ
section: pipelines
slug: gdq
description: Resumo em uma linha
status: active        # draft | review | active | archived
icon: GitBranch       # ícone Lucide
order: 1
owner: Marketing + Pré-vendas
team: Marketing e Pré-vendas integrados
objective: Objetivo principal do documento
lastUpdated: "2026-07-29"
tags:
  - GDQ
  - marketing
---
```

## Adicionar um novo documento

**Via interface:** sidebar → `+ Novo documento` → preenche campos + corpo MD → Salvar

**Via arquivo:** crie `content/<section>/slug.md` com o frontmatter acima.
