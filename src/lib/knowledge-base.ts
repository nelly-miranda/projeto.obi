import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const DOCS_DIR = path.join(process.cwd(), 'docs')

const KNOWLEDGE_SECTIONS = ['projeto', 'pipelines', 'base-conhecimento'] as const

function readMarkdownDir(dir: string): { title: string; body: string }[] {
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data, content } = matter(raw)
      return { title: data.title ?? file.replace('.md', ''), body: content.trim() }
    })
}

/**
 * Junta todo o conteúdo de content/ (projeto, pipelines, base de conhecimento)
 * em um único bloco de texto para servir de contexto ao chat. Lido a cada
 * request: os arquivos .md são pequenos e podem ser editados pelo time.
 */
export function buildKnowledgeBaseContext(): string {
  const blocks: string[] = []

  for (const section of KNOWLEDGE_SECTIONS) {
    const docs = readMarkdownDir(path.join(CONTENT_DIR, section))
    for (const doc of docs) {
      blocks.push(`### [${section}] ${doc.title}\n\n${doc.body}`)
    }
  }

  if (fs.existsSync(DOCS_DIR)) {
    const briefing = path.join(DOCS_DIR, 'briefing.md')
    if (fs.existsSync(briefing)) {
      blocks.push(`### [docs] briefing (contexto interno do projeto, não é fato de estratégia comercial)\n\n${fs.readFileSync(briefing, 'utf-8').trim()}`)
    }
  }

  return blocks.join('\n\n---\n\n')
}
