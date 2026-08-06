import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'canvas' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <div className="bg-canvas p-10">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Total Income</CardTitle>
          <CardDescription>Resumo do mês atual</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="tabular-figures text-3xl font-bold text-slate-900">
            R$ 12.480<span className="text-slate-400">,00</span>
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            Ver detalhes
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
}
