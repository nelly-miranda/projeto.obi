---
title: ICP Definidor
section: agentes
slug: icp-definidor
description: Define o Perfil de Cliente Ideal de cada pipeline e classifica um lead ou parceiro específico contra os critérios documentados.
status: active
icon: Target
order: 2
owner: Claude Code (agente de projeto)
objective: Aplicar o perfil de cliente ideal documentado em cada pipeline (Perfil A/B do GDQ, Tipo 1/Tipo 2 de parceiros) para classificar um lead, empresa ou candidato específico.
lastUpdated: "2026-08-06"
tags:
  - ICP
  - qualificação
  - GDQ
  - parceiros
---

# ICP Definidor

Agente de IA conectado a este projeto via Claude Code, definido em `.claude/agents/icp-definidor.md`. Ele define e aplica o Perfil de Cliente Ideal (ICP) já documentado para cada pipeline, em vez de inventar um perfil genérico.

## Quando usar

- "Esse lead se encaixa no perfil ideal do GDQ?"
- "Qual o ICP do pipeline de Captação de Parceiros?"
- "Esse candidato é Tipo 1 ou Tipo 2?"
- Ao cadastrar um novo negócio, para ajudar a classificar antes de definir a etapa inicial.

## Onde ele busca informação

- `content/pipelines/gdq.md`, seção "Perfil de Lead Ideal": Perfil A (empresa em movimento nos nichos prioritários), Perfil B (histórico de dor declarada), e os critérios que tiram uma empresa do funil.
- `content/pipelines/parceiros.md`, seção "Tipos de Parceiro": Tipo 1 (Alta Prontidão) vs. Tipo 2 (Plataforma em Maturação), incluindo a tabela comparativa.
- `content/projeto/visao-geral.md`: os três mercados prioritários (Agro, Fintechs, Educação).

## Como ele responde

Ao classificar um lead específico, ele percorre os critérios documentados um a um: cita quais sinais bateram e quais não bateram, em vez de dar só um veredito. Se o lead não se encaixar claramente em nenhum critério, ele diz o que falta em vez de forçar uma classificação.

## Como acionar

No Claude Code, dentro deste repositório, peça por nome ou descreva o lead/empresa que quer classificar: a descrição do agente já orienta o Claude a acioná-lo quando fizer sentido.
