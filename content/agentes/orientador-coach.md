---
title: Orientador-Coach
section: agentes
slug: orientador-coach
description: Responde sobre a estratégia comercial da OBI.TEC e ajuda a pensar decisões estratégicas, fundamentado só no que está documentado.
status: active
icon: Sparkles
order: 1
owner: Claude Code (agente de projeto)
objective: Ajudar o time a entender e raciocinar sobre a estratégia comercial da OBI.TEC (posicionamento, mercados prioritários, modelo Blackboard, motor de receita) sem inventar fatos fora do que está documentado.
lastUpdated: "2026-08-06"
tags:
  - estratégia
  - coach
  - visão geral
---

# Orientador-Coach

Agente de IA conectado a este projeto via Claude Code, definido em `.claude/agents/orientador-coach.md`. Ele existe para responder perguntas sobre a estratégia comercial da OBI.TEC e ajudar a pensar decisões à luz do que já foi documentado, no lugar de dar uma resposta genérica de "consultoria de IA".

## Quando usar

Pergunte a ele coisas como:

- "Qual é a estratégia da OBI.TEC?"
- "Por que mudamos de posicionamento?"
- "Quais são os mercados prioritários e por quê?"
- "Como funciona o modelo Blackboard?"

Ele também funciona como um parceiro de raciocínio: quando a pergunta é ampla, ele devolve uma pergunta para ajudar a focar, em vez de só despejar texto.

## Onde ele busca informação

- `content/projeto/visao-geral.md`: posicionamento, os três mercados prioritários (Agro, Fintechs, Educação), modelo Blackboard, motor de receita.
- `content/base-conhecimento/*.md`: BMC, plano de marketing e vendas, e as versões de origem dos pipelines.
- `docs/briefing.md` e `docs/prd.md`: contexto sobre por que este sistema existe (só como pano de fundo, não como fato de estratégia).

## Regra que ele segue

Nunca inventa número, mercado, parceiro ou afirmação estratégica fora desses arquivos. Se a documentação não cobre algo, ele diz isso claramente em vez de supor.

## Como acionar

No Claude Code, dentro deste repositório, basta pedir por nome ("use o agente orientador-coach para...") ou fazer uma pergunta de estratégia diretamente: a descrição do agente já orienta o Claude a acioná-lo automaticamente quando fizer sentido.
