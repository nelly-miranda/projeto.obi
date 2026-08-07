'use client'

import React, { useEffect, useState } from 'react'
import { Plus, Trash2, RotateCcw } from 'lucide-react'
import type { CatalogItem } from '@/types/catalog'

const STORAGE_KEY = 'obitec-catalogo-produtos'

interface CatalogTableProps {
  initialItems: CatalogItem[]
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

let idCounter = 0

export function CatalogTable({ initialItems }: CatalogTableProps) {
  const [items, setItems] = useState<CatalogItem[]>(initialItems)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        // ignora JSON corrompido e mantém os itens iniciais
      }
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, loaded])

  const updateItem = (id: string, patch: Partial<CatalogItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const addItem = () => {
    idCounter += 1
    setItems((prev) => [
      ...prev,
      {
        id: `novo-${idCounter}`,
        category: '',
        name: 'Novo produto ou serviço',
        description: '',
        quantity: 1,
        unitValue: 0,
      },
    ])
  }

  const resetToOriginal = () => {
    if (window.confirm('Restaurar a lista original? Isso descarta as edições salvas.')) {
      setItems(initialItems)
    }
  }

  const total = items.reduce((sum, item) => sum + item.quantity * item.unitValue, 0)

  return (
    <div className="rounded-3xl border border-slate-100 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              <th className="px-4 py-3">Vertical</th>
              <th className="px-4 py-3">Produto / Serviço</th>
              <th className="px-4 py-3">Descrição</th>
              <th className="w-24 px-4 py-3">Qtd.</th>
              <th className="w-36 px-4 py-3">Valor unitário</th>
              <th className="w-36 px-4 py-3">Subtotal</th>
              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-slate-50 align-top hover:bg-slate-50/60">
                <td className="px-4 py-2.5">
                  <input
                    value={item.category}
                    onChange={(e) => updateItem(item.id, { category: e.target.value })}
                    placeholder="Vertical"
                    className="w-28 rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-xs font-medium text-obi-600 focus:border-obi-300 focus:bg-white focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2.5">
                  <input
                    value={item.name}
                    onChange={(e) => updateItem(item.id, { name: e.target.value })}
                    placeholder="Nome do produto ou serviço"
                    className="w-56 rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-sm font-medium text-slate-800 focus:border-obi-300 focus:bg-white focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2.5">
                  <textarea
                    value={item.description}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    placeholder="Descrição"
                    rows={2}
                    className="w-64 resize-none rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-xs leading-relaxed text-slate-500 focus:border-obi-300 focus:bg-white focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2.5">
                  <input
                    type="number"
                    min={0}
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) || 0 })}
                    className="w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-700 focus:border-obi-300 focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2.5">
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={item.unitValue}
                    onChange={(e) => updateItem(item.id, { unitValue: Number(e.target.value) || 0 })}
                    className="w-28 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-700 focus:border-obi-300 focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2.5 text-xs font-semibold text-slate-700">
                  {formatCurrency(item.quantity * item.unitValue)}
                </td>
                <td className="px-4 py-2.5">
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500"
                    aria-label="Remover linha"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total
              </td>
              <td className="px-4 py-3 text-sm font-bold text-obi-700">{formatCurrency(total)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-4 py-3">
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1.5 rounded-full border border-dashed border-slate-300 px-3.5 py-2 text-xs font-medium text-slate-500 hover:border-obi-300 hover:text-obi-600"
        >
          <Plus className="h-3.5 w-3.5" />
          Nova linha
        </button>

        <button
          type="button"
          onClick={resetToOriginal}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-50 hover:text-slate-600"
        >
          <RotateCcw className="h-3 w-3" />
          Restaurar lista original
        </button>
      </div>
    </div>
  )
}
