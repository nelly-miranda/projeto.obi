import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

const meta: Meta = {
  title: 'UI/FormControls',
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

export const MiniForm: Story = {
  render: () => (
    <div className="w-96 space-y-4 rounded-3xl bg-white p-6 shadow-card">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700" htmlFor="nome">
          Nome
        </label>
        <Input id="nome" placeholder="Digite seu nome" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700" htmlFor="categoria">
          Categoria
        </label>
        <Select>
          <SelectTrigger id="categoria">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="receita">Receita</SelectItem>
            <SelectItem value="despesa">Despesa</SelectItem>
            <SelectItem value="transferencia">Transferência</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700" htmlFor="observacoes">
          Observações
        </label>
        <Textarea id="observacoes" placeholder="Escreva uma observação..." />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline">Cancelar</Button>
        <Button>Salvar</Button>
      </div>
    </div>
  ),
}
