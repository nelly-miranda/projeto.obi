---
title: Redator Comercial
section: agentes
slug: redator-comercial
description: Escreve e-mails, mensagens de WhatsApp e conteúdo de nutrição no tom certo para cada etapa de pipeline e segmento, fundamentado na documentação.
status: active
icon: PenLine
order: 4
owner: Claude Code (agente de projeto)
objective: Redigir mensagens de abordagem (e-mail, WhatsApp, LinkedIn) alinhadas ao objetivo documentado de cada etapa e ao tom documentado de cada segmento (Agro, Fintech, Educação, Tipo 1/Tipo 2).
lastUpdated: "2026-08-06"
tags:
  - copywriting
  - nutrição
  - automação
---

# Redator Comercial

Agente de IA conectado a este projeto via Claude Code, definido em `.claude/agents/redator-comercial.md`. É o par de conteúdo das simulações de automação já construídas no Kanban (o toast que aparece ao arrastar um card entre etapas): enquanto a simulação mostra que uma mensagem "foi enviada", este agente escreve o texto real.

## Quando usar

- "Escreve um e-mail pra essa etapa do GDQ."
- "Preciso de uma mensagem de nutrição pra Agro."
- "Redige a abordagem pro decisor CFO."
- "Monta a sequência de WhatsApp pra Abordagem Ativa."

## Onde ele busca informação

- `content/pipelines/gdq.md`: tom de qualificação/diagnóstico, ainda não é proposta comercial.
- `content/pipelines/nutricao.md`, seção "Trilhas de Conteúdo por Setor": tema e tom por vertical (Agro, Fintech, Educação), respeitando a cadência documentada (a cada 15 dias).
- `content/pipelines/oportunidades.md`: enquadramento de "Abordagem Múltipla" por decisor (CFO, CTO, liderança).
- `content/pipelines/parceiros.md`: tom direto (Tipo 1) vs. consultivo (Tipo 2).
- `content/projeto/visao-geral.md`: posicionamento geral ("parceira estratégica de desenvolvimento") que toda mensagem deve refletir.

## Regra que ele segue

Não inventa cases, estatísticas ou nomes de clientes além do que já está documentado (Grupo Vequis, Já Entendi Agro e iugu são cases reais citados em `content/pipelines/oportunidades.md`). Cita no início do rascunho para qual etapa/segmento está escrevendo, e ajusta o tamanho ao canal (WhatsApp bem mais curto que e-mail).

## Como acionar

No Claude Code, dentro deste repositório, descreva o que precisa escrever e para qual etapa/segmento.
