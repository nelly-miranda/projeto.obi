import type { Meta, StoryObj } from '@storybook/react'
import { Search, Bell, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Buscar">
        <Search />
      </Button>
    </div>
  ),
}

export const IconButtons: Story = {
  name: 'Icon — busca/sino',
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="icon" variant="secondary" aria-label="Buscar" className="rounded-full bg-slate-100 text-slate-600 shadow-none hover:bg-slate-200">
        <Search />
      </Button>
      <Button size="icon" variant="secondary" aria-label="Notificações" className="rounded-full bg-slate-100 text-slate-600 shadow-none hover:bg-slate-200">
        <Bell />
      </Button>
    </div>
  ),
}

export const WithIconAndLabel: Story = {
  name: 'Primário com ícone',
  render: () => (
    <Button>
      <Plus />
      Nova transação
    </Button>
  ),
}
