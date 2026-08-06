import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'active', 'draft', 'review', 'archived', 'outline'],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center rounded-4xl bg-canvas p-10">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Badge>

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="active">Ativo</Badge>
      <Badge variant="draft">Rascunho</Badge>
      <Badge variant="review">Em revisão</Badge>
      <Badge variant="archived">Arquivado</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="default">Default</Badge>
    </div>
  ),
}

export const DotStyleOnCard: Story = {
  name: 'Estilo dot — lista de transações',
  render: () => (
    <div className="w-80 rounded-3xl bg-white p-2 shadow-card">
      <ul className="divide-y divide-slate-100">
        <li className="flex items-center justify-between px-3 py-3">
          <span className="text-sm text-slate-700">Assinatura SaaS</span>
          <Badge variant="active">Recebido</Badge>
        </li>
        <li className="flex items-center justify-between px-3 py-3">
          <span className="text-sm text-slate-700">Proposta CFA/CRAs</span>
          <Badge variant="review">Em revisão</Badge>
        </li>
        <li className="flex items-center justify-between px-3 py-3">
          <span className="text-sm text-slate-700">Onboarding Coreplan</span>
          <Badge variant="draft">Rascunho</Badge>
        </li>
        <li className="flex items-center justify-between px-3 py-3">
          <span className="text-sm text-slate-700">Relatório Q1</span>
          <Badge variant="archived">Arquivado</Badge>
        </li>
      </ul>
    </div>
  ),
}

export const SingleDots: Story = {
  name: 'Dots isolados',
  render: () => (
    <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-card">
      <Badge variant="active">Recebido</Badge>
      <Badge variant="review">Em análise</Badge>
      <Badge variant="draft">Pendente</Badge>
      <Badge variant="archived">Estornado</Badge>
    </div>
  ),
}
