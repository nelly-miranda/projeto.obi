import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ViewToggle } from '@/components/content/ViewToggle'
import type { ViewMode } from '@/types/content'

const meta: Meta<typeof ViewToggle> = {
  title: 'Content/ViewToggle',
  component: ViewToggle,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center rounded-4xl bg-canvas p-10">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ViewToggle>

export const Default: Story = {
  render: () => {
    const [mode, setMode] = useState<ViewMode>('grid')
    return <ViewToggle value={mode} onChange={setMode} />
  },
}

export const ListSelected: Story = {
  name: 'Selecionado — Lista',
  render: () => {
    const [mode, setMode] = useState<ViewMode>('list')
    return <ViewToggle value={mode} onChange={setMode} />
  },
}

export const InHeaderContext: Story = {
  name: 'Em contexto — header de card',
  render: () => {
    const [mode, setMode] = useState<ViewMode>('grid')
    return (
      <div className="flex w-96 items-center justify-between rounded-3xl bg-white p-4 shadow-card">
        <span className="text-sm font-semibold text-slate-900">Pipelines</span>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200">
            <span className="sr-only">Buscar</span>
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <ViewToggle value={mode} onChange={setMode} />
        </div>
      </div>
    )
  },
}
