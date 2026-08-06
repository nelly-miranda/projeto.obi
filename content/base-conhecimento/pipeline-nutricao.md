---
title: "Nutrição — Documento de Referência"
section: base-conhecimento
slug: pipeline-nutricao
description: "Documento-fonte completo do sub-pipeline de Nutrição do GDQ: as 4 etapas, gatilhos de entrada e saída, trilhas de conteúdo por setor e métricas."
status: active
icon: GitBranch
order: 4
owner: Marketing (Nutrição)
pipeline: nutricao
lastUpdated: "2026-08-06"
tags:
  - pipeline
  - nutrição
  - sub-pipeline
  - GDQ
objective: "Servir de base de conhecimento completa do sub-pipeline de Nutrição para consulta humana e para os agentes de IA que apoiam pré-vendas e marketing."
sourceUrl: "https://docs.google.com/document/d/1HxpEL_OfLeUSJtX24WN49TNYkE3ltRzWz0WWg8p1wTg/edit"
---

# Pipeline de Nutrição

**Sub-pipeline GDQ / Nutrição Automatizada**

*Leads com potencial sem timing. Sequência automatizada de conteúdo relevante, nenhum lead com potencial é desperdiçado.*

## O que é o Pipeline de Nutrição

O sub-pipeline de Nutrição é o destino dos leads que saem do GDQ principal sem timing para avançar agora, mas que não devem ser descartados. O processo reconhece que o momento certo raramente é hoje, e que o contato certo no momento certo vale mais do que dez contatos no momento errado.

A Nutrição não é um arquivo morto. É uma fila ativa, gerenciada por automação e revista periodicamente. Quando o lead dá um sinal de engajamento, o processo reage e avalia a reativação.

## Quando um lead entra na Nutrição

**Gatilhos de entrada**

Um lead é movido para Nutrição quando:

- Não responde após 5 tentativas na Abordagem Ativa
- Atinge o limite de 2 reagendamentos na etapa Reagendamento
- Declara explicitamente falta de timing ou prioridade no momento
- É qualificado no Enriquecimento mas não tem urgência imediata

**Importante**

*O lead que entra na Nutrição não foi descartado, foi pausado. O GDQ principal só recebe leads com timing real. A Nutrição garante que o potencial não se perde enquanto o timing não chega.*

## Visão Geral (4 Etapas)

| # | Etapa | Critério de Avanço | SLA |
|---|-------|---------------------|-----|
| 01 | Novo na Nutrição | Sequência iniciada com primeiro conteúdo enviado | Até 48h |
| 02 | Em Nutrição | Sequência ativa sem sinal de saída. Revisar base a cada 90 dias. | Contínuo |
| 03 | Sinal de Vida | Decisão documentada: reativar no GDQ ou manter na nutrição | Avaliar em 48h |
| 04 | Reativado | Lead reativado e visível no Pipeline GDQ na etapa correta | Reinserção em 24h |

## Etapas Detalhadas

*Cada etapa com objetivo, atividades e critério de avanço.*

### 01. Novo na Nutrição

**Objetivo**: Registrar o lead e iniciar a sequência automatizada de nutrição

**Atividades**:
- Confirmar e registrar o motivo de saída do funil principal no CRM
- Iniciar sequência de emails com conteúdo relevante ao setor
- Definir trilha de conteúdo (Agro, Fintech ou Educação)

**Critério de avanço**: Sequência iniciada com primeiro conteúdo enviado

**SLA**: Até 48h

### 02. Em Nutrição

**Objetivo**: Manter presença relevante com conteúdo automatizado e de baixa frequência

**Atividades**:
- Enviar conteúdo setorial a cada 15 dias
- Monitorar aberturas, cliques e respostas
- Registrar engajamentos no CRM para avaliação futura
- Revisar toda a base de Nutrição a cada 90 dias

**Critério de avanço**: Sequência ativa sem sinal de saída. Revisar base a cada 90 dias.

**SLA**: Contínuo

### 03. Sinal de Vida

**Objetivo**: Reagir ao engajamento do lead e avaliar se o momento mudou

**Atividades**:
- Identificar o sinal (abertura, clique, resposta, menção em evento)
- Avaliar se o contexto da empresa mudou desde a saída do funil
- Decidir: retornar ao GDQ (etapa correta) ou manter na nutrição
- Documentar a decisão e o racional no CRM

**Critério de avanço**: Decisão documentada: reativar no GDQ ou manter na nutrição

**SLA**: Avaliar em 48h

### 04. Reativado

**Objetivo**: Reinserir o lead no Pipeline GDQ principal com contexto atualizado

**Atividades**:
- Documentar motivo da reativação e o sinal que a triggou
- Inserir no GDQ na etapa correta (não necessariamente Novo Lead)
- Registrar histórico de nutrição completo para uso no Engajamento
- Briefar o responsável pelo contato com o contexto acumulado

**Critério de avanço**: Lead reativado e visível no Pipeline GDQ na etapa correta

**SLA**: Reinserção em 24h

## Trilhas de Conteúdo por Setor

**Agro — Trilha de Nutrição**

Conteúdo focado em eficiência operacional, digitalização de processos agrícolas, gestão de insumos e rastreabilidade. Exemplos de formatos: artigos sobre integração de ERP com operações de campo, cases de automatização de packing, tendências de agritech.

**Fintech — Trilha de Nutrição**

Conteúdo sobre compliance, segurança de dados, integração de sistemas financeiros e escalabilidade de plataformas. Exemplos: guias de integração de APIs financeiras, boas práticas de Open Finance, gestão de fraude em plataformas digitais.

**Educação — Trilha de Nutrição**

Conteúdo sobre plataformas de aprendizagem, LMS, personalização de ensino e escalabilidade digital. Exemplos: tendências em EduTech, cases de plataformas que migraram para ambiente digital, gestão de cursos em escala.

## Regras de Operação

**Frequência de envio**

Um conteúdo a cada 15 dias. Frequência maior gera opt-out; frequência menor perde relevância.

**Revisão da base**

A cada 90 dias, o responsável pelo GDQ revisa toda a base de Nutrição: lead ainda tem potencial? Contexto da empresa mudou? Reativar, manter ou encerrar.

**Encerramento de Nutrição**

Um lead sai da Nutrição quando:

- É reativado para o GDQ principal
- Solicita opt-out
- A empresa fecha, é adquirida ou perde fit definitivamente
- Permanece 12 meses sem nenhum sinal de engajamento

## Métricas do Sub-pipeline

| Indicador | Meta | Freq. |
|-----------|------|-------|
| Total de leads na Nutrição | < 30% do GDQ principal | Mensal |
| Taxa de reativação | ≥ 20% | Trimestral |
| Taxa de opt-out | < 5% | Mensal |
| Tempo médio até reativação | 90 a 180 dias | Trimestral |
| Taxa de encerramento definitivo | < 15% da base | Semestral |
