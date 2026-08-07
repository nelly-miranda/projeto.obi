import Anthropic from '@anthropic-ai/sdk'
import { buildKnowledgeBaseContext } from '@/lib/knowledge-base'

export const runtime = 'nodejs'

const MODEL = 'claude-opus-5'

const SYSTEM_PROMPT = `Você é o assistente de estratégia da base de conhecimento comercial da OBI.TEC (obitec-kb). Seu papel é responder perguntas do time sobre a estratégia, os mercados prioritários, o modelo Blackboard e os pipelines do CRM (Nutrição, GDQ, Oportunidades, Captação de Parceiros), usando exclusivamente a documentação abaixo como fonte da verdade.

Regras:
- Nunca invente um número, mercado, parceiro, cliente ou afirmação estratégica que não esteja no conteúdo fornecido. Se a documentação não cobrir algo, diga isso claramente ("isso ainda não está documentado") em vez de supor.
- content/pipelines/oportunidades.md é o único pipeline sem documento formal de origem: é uma hipótese ainda não validada. Sinalize isso se a pergunta tocar esse pipeline.
- Responda em português (pt-BR), em tom objetivo, direto e curto. Sem travessão (—): use vírgula, ponto ou dois pontos.
- Quando fizer sentido, cite de qual documento veio a resposta (ex: "segundo content/pipelines/gdq.md").

Documentação disponível:

${buildKnowledgeBaseContext()}`

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'ANTHROPIC_API_KEY não configurada no servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const { messages } = (await req.json()) as { messages: ChatMessage[] }
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'Nenhuma mensagem enviada.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const client = new Anthropic({ apiKey })

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  })

  const encoder = new TextEncoder()
  const body = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
      } catch (err) {
        controller.enqueue(encoder.encode('\n\n[Erro ao gerar resposta. Tente novamente.]'))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
