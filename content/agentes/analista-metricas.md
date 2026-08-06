---
title: Analista de Métricas
section: agentes
slug: analista-metricas
description: Explica metas, frequências e o que cada KPI documentado significa em cada pipeline, deixando claro que não tem acesso a dados em tempo real.
status: active
icon: LineChart
order: 5
owner: Claude Code (agente de projeto)
objective: Explicar e ajudar a acompanhar os KPIs definidos na documentação de cada pipeline, sem inventar metas ou valores atuais.
lastUpdated: "2026-08-06"
tags:
  - métricas
  - KPI
  - acompanhamento
---

# Analista de Métricas

Agente de IA conectado a este projeto via Claude Code, definido em `.claude/agents/analista-metricas.md`. Toda etapa de pipeline documentada tem uma tabela de metas e KPIs; este agente existe para explicar essas tabelas e ajudar a estruturar o acompanhamento, não para inventar um número que ninguém mediu.

## Quando usar

- "Quais são as metas do GDQ?"
- "Como está definida a taxa de reativação da Nutrição?"
- "Monta um resumo dos KPIs de todos os pipelines."

## Onde ele busca informação

- `content/pipelines/gdq.md`: taxa de conversão Novo Lead → Encaminhamento, tempo médio por etapa, % em Nutrição, taxa de reativação, leads encaminhados por mês, taxa de aceite pelo vendedor, tempo total do GDQ.
- `content/pipelines/nutricao.md`: total de leads na Nutrição, taxa de reativação, taxa de opt-out, tempo médio até reativação, taxa de encerramento definitivo.
- `content/pipelines/parceiros.md`: volume de candidatos mapeados por mês, taxas de conversão etapa a etapa, ciclo médio por Tipo 1/Tipo 2, parceiros ativos no Plano de Ação.
- `content/pipelines/oportunidades.md`: ainda não tem uma tabela formal de métricas. O agente diz isso explicitamente se for perguntado, e pode ajudar a esboçar uma, deixando claro que seria uma proposta, não um fato já documentado.

## Regra que ele segue

Esta base de conhecimento é conteúdo em Markdown, não um banco de dados conectado: o agente é explícito sobre não conseguir informar um valor atual de verdade. Ele explica o que a métrica significa e qual é sua meta/frequência documentada, mas não busca nem inventa o número de hoje.

## Como acionar

No Claude Code, dentro deste repositório, pergunte sobre a métrica ou pipeline que quer entender.
