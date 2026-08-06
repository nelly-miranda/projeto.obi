---
title: Validador de Pipeline
section: agentes
slug: validador-pipeline
description: Checa se um negócio cumpre o critério de avanço documentado antes de mudar de etapa, e se o código do Kanban está sincronizado com a documentação.
status: active
icon: ShieldCheck
order: 3
owner: Claude Code (agente de projeto)
objective: Validar se um negócio tem informação suficiente para avançar de etapa em um pipeline, e verificar se as etapas/SLAs no código do Kanban ainda refletem a documentação.
lastUpdated: "2026-08-06"
tags:
  - validação
  - processo
  - SLA
---

# Validador de Pipeline

Agente de IA conectado a este projeto via Claude Code, definido em `.claude/agents/validador-pipeline.md`. Ele existe para checar se um negócio, ou a própria configuração do pipeline no código, está de acordo com o processo documentado, nunca para aprovar algo que a documentação não sustente.

## Quando usar

- "Esse negócio pode passar para a próxima etapa?"
- "O que falta pra avançar esse card?"
- "Os SLAs configurados no Kanban ainda batem com a documentação?"

## Como ele valida um negócio

1. Identifica o pipeline e a etapa atual/destino.
2. Lista o "Critério de avanço" documentado para essa etapa, literalmente.
3. Percorre o que foi informado sobre o negócio, marcando cada critério como atendido, não atendido, ou não informado.
4. Dá um veredito claro (pode avançar, ainda não pode, ou informação insuficiente) com a justificativa.

## Onde ele busca informação

- `content/pipelines/gdq.md`, `nutricao.md`, `oportunidades.md` e `parceiros.md`: critério de avanço e SLA de cada etapa.
- `src/lib/pipelines-kanban.ts`: as etapas (`KANBAN_STAGES`) usadas de fato no quadro Kanban do app, para comparar com a documentação.

Atenção: `content/pipelines/oportunidades.md` é o único pipeline sem documento formal de origem (é uma hipótese ainda não validada, segundo `docs/briefing.md`). O agente sinaliza essa ressalva sempre que valida algo contra ele.

## Como acionar

No Claude Code, dentro deste repositório, descreva o negócio e a etapa que quer validar, ou peça para comparar o Kanban com a documentação.
