import type { Meta, StoryObj } from '@storybook/react'
import { ContentCard } from '@/components/content/ContentCard'
import type { ContentItem } from '@/types/content'

const mockItem: ContentItem = {
  frontmatter: {
    title: 'Pipeline GDQ',
    section: 'pipelines',
    slug: 'gdq',
    description: 'Gerador de Demanda Qualificada — do primeiro contato à qualificação',
    status: 'active',
    icon: 'GitBranch',
    order: 1,
    owner: 'Marketing + Pré-vendas',
    team: 'Marketing e Pré-vendas integrados',
    objective: 'Transformar leads de campanhas e eventos em oportunidades qualificadas.',
    lastUpdated: '2026-07-29',
    tags: ['GDQ', 'marketing', 'qualificação'],
  },
  body: '# Pipeline GDQ\n\nConteúdo aqui.',
  slug: 'gdq',
  section: 'pipelines',
  filePath: '/content/pipelines/gdq.md',
}

const meta: Meta<typeof ContentCard> = {
  title: 'Content/ContentCard',
  component: ContentCard,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    mode: { control: 'radio', options: ['grid', 'list'] },
  },
  decorators: [
    (Story) => (
      <div className="rounded-4xl bg-canvas p-8">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ContentCard>

export const Grid: Story = {
  args: { item: mockItem, mode: 'grid' },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
}

export const List: Story = {
  args: { item: mockItem, mode: 'list' },
  decorators: [(Story) => <div className="w-full max-w-2xl"><Story /></div>],
}

export const Draft: Story = {
  args: {
    item: { ...mockItem, frontmatter: { ...mockItem.frontmatter, status: 'draft' } },
    mode: 'grid',
  },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
}

export const GridLayout: Story = {
  name: 'Grid — multiple cards',
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {(['active', 'draft', 'review'] as const).map((status) => (
        <ContentCard
          key={status}
          item={{ ...mockItem, frontmatter: { ...mockItem.frontmatter, status } }}
          mode="grid"
        />
      ))}
    </div>
  ),
}

export const ListLayout: Story = {
  name: 'Lista — estilo transações',
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      {(['active', 'review', 'draft', 'archived'] as const).map((status) => (
        <ContentCard
          key={status}
          item={{ ...mockItem, frontmatter: { ...mockItem.frontmatter, status } }}
          mode="list"
        />
      ))}
    </div>
  ),
}
