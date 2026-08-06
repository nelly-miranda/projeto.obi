'use client'

import React, { useState } from 'react'
import { X, Plus, Building2, User, Trash2, ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { KanbanCard, KanbanContact, CustomField } from '@/types/kanban'

interface NewDealModalProps {
  stageId: string
  stageName: string
  onClose: () => void
  onCreate: (card: KanbanCard) => void
}

type TipoCliente = 'empresa' | 'pessoaFisica'

interface ContactRow {
  rowId: string
  nome: string
  cargo: string
  telefone: string
  email: string
}

function generateId(prefix: string): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${prefix}-${Math.random().toString(36).slice(2)}`
}

function emptyContactRow(): ContactRow {
  return { rowId: generateId('contato'), nome: '', cargo: '', telefone: '', email: '' }
}

const inputClass =
  'h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-obi-400 focus:ring-1 focus:ring-obi-100'

const SEGMENTOS = ['Agro', 'Fintechs', 'Educação', 'Outro']

const STEPS = [
  { id: 'quem', title: 'Quem é o cliente?', subtitle: 'Empresa ou pessoa física envolvida no negócio' },
  { id: 'negocio', title: 'Detalhes do negócio', subtitle: 'Valor, origem e contexto da oportunidade' },
  { id: 'contatos', title: 'Contatos', subtitle: 'Quem vamos falar com, do lado do cliente' },
  { id: 'revisao', title: 'Revisão', subtitle: 'Confira antes de criar o negócio' },
] as const

function FieldContainer({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-medium text-slate-500">{label}</label>
      {children}
    </div>
  )
}

export function NewDealModal({ stageId, stageName, onClose, onCreate }: NewDealModalProps) {
  const [step, setStep] = useState(0)

  const [tipo, setTipo] = useState<TipoCliente>('empresa')
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [segmento, setSegmento] = useState('')
  const [site, setSite] = useState('')
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [cpf, setCpf] = useState('')
  const [profissao, setProfissao] = useState('')

  const [tituloNegocio, setTituloNegocio] = useState('')
  const [valor, setValor] = useState('')
  const [fonte, setFonte] = useState('')
  const [previsaoFechamento, setPrevisaoFechamento] = useState('')
  const [observacoes, setObservacoes] = useState('')

  const [contatos, setContatos] = useState<ContactRow[]>([emptyContactRow()])
  const [error, setError] = useState('')

  const nome = tipo === 'empresa' ? nomeEmpresa.trim() : nomeCompleto.trim()
  const isLastStep = step === STEPS.length - 1

  const addContactRow = () => setContatos((prev) => [...prev, emptyContactRow()])
  const removeContactRow = (rowId: string) => setContatos((prev) => prev.filter((c) => c.rowId !== rowId))
  const updateContactRow = (rowId: string, field: keyof Omit<ContactRow, 'rowId'>, value: string) => {
    setContatos((prev) => prev.map((c) => (c.rowId === rowId ? { ...c, [field]: value } : c)))
  }

  const goNext = () => {
    if (step === 0 && !nome) {
      setError(tipo === 'empresa' ? 'Informe o nome da empresa para continuar.' : 'Informe o nome completo para continuar.')
      return
    }
    setError('')
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const goBack = () => {
    setError('')
    setStep((s) => Math.max(s - 1, 0))
  }

  const handleCreate = () => {
    if (!nome) {
      setStep(0)
      setError(tipo === 'empresa' ? 'Informe o nome da empresa.' : 'Informe o nome completo.')
      return
    }

    const contatosValidos: KanbanContact[] = contatos
      .filter((c) => c.nome.trim() || c.cargo.trim() || c.telefone.trim() || c.email.trim())
      .map((c) => ({
        id: c.rowId,
        nome: c.nome.trim(),
        cargo: c.cargo.trim() || undefined,
        telefone: c.telefone.trim() || undefined,
        email: c.email.trim() || undefined,
      }))

    const camposExtra: CustomField[] = [
      tipo === 'empresa' && segmento ? { id: generateId('field'), label: 'Segmento', value: segmento } : null,
      tipo === 'empresa' && site.trim() ? { id: generateId('field'), label: 'Site', value: site.trim() } : null,
      tipo === 'pessoaFisica' && profissao.trim() ? { id: generateId('field'), label: 'Profissão', value: profissao.trim() } : null,
      previsaoFechamento ? { id: generateId('field'), label: 'Previsão de fechamento', value: previsaoFechamento } : null,
      observacoes.trim() ? { id: generateId('field'), label: 'Observações', value: observacoes.trim() } : null,
    ].filter((f): f is CustomField => f !== null)

    const card: KanbanCard = {
      id: generateId('deal'),
      title: tituloNegocio.trim() || nome,
      empresa: tipo === 'empresa' ? nome : '',
      cnpj: tipo === 'empresa' ? (cnpj.trim() || undefined) : undefined,
      pessoaFisica: tipo === 'pessoaFisica' ? nome : undefined,
      cpf: tipo === 'pessoaFisica' ? (cpf.trim() || undefined) : undefined,
      contato: contatosValidos[0]?.nome ?? '',
      contatos: contatosValidos,
      fonte: fonte.trim(),
      valor: Number(valor) || 0,
      stageId,
      tarefaStatus: null,
      produtos: [],
      tarefas: [],
      camposPersonalizados: camposExtra,
      criadoEm: new Date().toISOString().slice(0, 10),
      diasNaEtapa: 0,
    }

    onCreate(card)
    onClose()
  }

  function formatCurrency(value: string): string {
    const n = Number(value)
    if (!n) return 'R$0'
    return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[92vh] min-h-[640px] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-card-lg">
        {/* Header */}
        <div className="border-b border-slate-100 px-8 py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={step === 0 ? onClose : goBack}
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
                aria-label="Voltar"
                title="Voltar"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h2 className="text-2xl font-bold leading-tight text-slate-900">{STEPS[step].title}</h2>
                <p className="mt-1 text-[13px] text-slate-400">{STEPS[step].subtitle} · {stageName}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Barra de progresso */}
          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-slate-400">
              <span>Passo {step + 1} de {STEPS.length}</span>
              <span>{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-obi-500 transition-all duration-300 ease-out"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-5">
            {step === 0 && (
              <>
                <div className="inline-flex rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setTipo('empresa')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors',
                      tipo === 'empresa' ? 'bg-white text-obi-600 shadow-sm' : 'text-slate-500 hover:text-slate-700',
                    )}
                  >
                    <Building2 className="h-3.5 w-3.5" /> Empresa
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipo('pessoaFisica')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors',
                      tipo === 'pessoaFisica' ? 'bg-white text-obi-600 shadow-sm' : 'text-slate-500 hover:text-slate-700',
                    )}
                  >
                    <User className="h-3.5 w-3.5" /> Pessoa física
                  </button>
                </div>

                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {tipo === 'empresa' ? 'Dados da empresa' : 'Dados da pessoa física'}
                  </p>
                  {tipo === 'empresa' ? (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <FieldContainer label="Nome da empresa *">
                          <input
                            value={nomeEmpresa}
                            onChange={(e) => setNomeEmpresa(e.target.value)}
                            placeholder="Razão social ou nome fantasia"
                            className={inputClass}
                          />
                        </FieldContainer>
                      </div>
                      <FieldContainer label="CNPJ">
                        <input value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="00.000.000/0000-00" className={inputClass} />
                      </FieldContainer>
                      <FieldContainer label="Segmento">
                        <select value={segmento} onChange={(e) => setSegmento(e.target.value)} className={cn(inputClass, 'text-slate-700')}>
                          <option value="">Selecionar</option>
                          {SEGMENTOS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </FieldContainer>
                      <div className="col-span-2">
                        <FieldContainer label="Site">
                          <input value={site} onChange={(e) => setSite(e.target.value)} placeholder="www.empresa.com.br" className={inputClass} />
                        </FieldContainer>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <FieldContainer label="Nome completo *">
                          <input value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} placeholder="Nome completo" className={inputClass} />
                        </FieldContainer>
                      </div>
                      <FieldContainer label="CPF">
                        <input value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" className={inputClass} />
                      </FieldContainer>
                      <div className="col-span-2">
                        <FieldContainer label="Profissão">
                          <input value={profissao} onChange={(e) => setProfissao(e.target.value)} placeholder="Ex: Diretor comercial" className={inputClass} />
                        </FieldContainer>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {step === 1 && (
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Dados do negócio</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-3">
                    <FieldContainer label="Título do negócio">
                      <input
                        value={tituloNegocio}
                        onChange={(e) => setTituloNegocio(e.target.value)}
                        placeholder={nome || 'Ex: Implantação CRM'}
                        className={inputClass}
                      />
                    </FieldContainer>
                  </div>
                  <FieldContainer label="Valor do negócio">
                    <input value={valor} onChange={(e) => setValor(e.target.value)} placeholder="0" inputMode="numeric" className={inputClass} />
                  </FieldContainer>
                  <FieldContainer label="Fonte">
                    <input value={fonte} onChange={(e) => setFonte(e.target.value)} placeholder="Indicação, LinkedIn, site..." className={inputClass} />
                  </FieldContainer>
                  <FieldContainer label="Previsão de fechamento">
                    <input type="date" value={previsaoFechamento} onChange={(e) => setPrevisaoFechamento(e.target.value)} className={inputClass} />
                  </FieldContainer>
                  <div className="col-span-3">
                    <FieldContainer label="Observações">
                      <textarea
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        placeholder="Contexto adicional sobre esse negócio"
                        rows={4}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-obi-400 focus:ring-1 focus:ring-obi-100"
                      />
                    </FieldContainer>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Contatos</p>
                <div className="space-y-3">
                  {contatos.map((c) => (
                    <div key={c.rowId} className="flex items-start gap-2 rounded-xl border border-slate-200 p-3">
                      <div className="grid flex-1 grid-cols-4 gap-2.5">
                        <input value={c.nome} onChange={(e) => updateContactRow(c.rowId, 'nome', e.target.value)} placeholder="Nome" className={inputClass} />
                        <input value={c.cargo} onChange={(e) => updateContactRow(c.rowId, 'cargo', e.target.value)} placeholder="Cargo" className={inputClass} />
                        <input value={c.telefone} onChange={(e) => updateContactRow(c.rowId, 'telefone', e.target.value)} placeholder="Telefone" className={inputClass} />
                        <input value={c.email} onChange={(e) => updateContactRow(c.rowId, 'email', e.target.value)} placeholder="Email" className={inputClass} />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeContactRow(c.rowId)}
                        className="mt-1 shrink-0 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                        aria-label="Remover contato"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addContactRow}
                    className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-[11px] font-medium text-slate-600 hover:bg-slate-200"
                  >
                    <Plus className="h-3 w-3" /> Adicionar contato
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {tipo === 'empresa' ? 'Empresa' : 'Pessoa física'}
                    </p>
                    <p className="text-sm font-medium text-slate-800">{nome || 'Não informado'}</p>
                    {tipo === 'empresa' && cnpj && <p className="mt-1 text-xs text-slate-500">CNPJ: {cnpj}</p>}
                    {tipo === 'empresa' && segmento && <p className="text-xs text-slate-500">Segmento: {segmento}</p>}
                    {tipo === 'pessoaFisica' && cpf && <p className="mt-1 text-xs text-slate-500">CPF: {cpf}</p>}
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Negócio</p>
                    <p className="text-sm font-medium text-slate-800">{tituloNegocio.trim() || nome || 'Não informado'}</p>
                    <p className="mt-1 text-xs text-slate-500">Valor: {formatCurrency(valor)}</p>
                    {fonte && <p className="text-xs text-slate-500">Fonte: {fonte}</p>}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Contatos</p>
                  {contatos.filter((c) => c.nome.trim()).length === 0 ? (
                    <p className="text-xs text-slate-400">Nenhum contato informado.</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-1.5">
                      {contatos.filter((c) => c.nome.trim()).map((c) => (
                        <p key={c.rowId} className="text-xs text-slate-600">
                          {c.nome}{c.cargo ? `, ${c.cargo}` : ''}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-8 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3.5 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            Cancelar
          </button>

          {isLastStep ? (
            <button
              type="button"
              onClick={handleCreate}
              className="flex items-center gap-1.5 rounded-lg bg-obi-500 px-5 py-2.5 text-xs font-medium text-white hover:bg-obi-600"
            >
              <Check className="h-3.5 w-3.5" /> Criar negócio
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-1.5 rounded-lg bg-obi-500 px-5 py-2.5 text-xs font-medium text-white hover:bg-obi-600"
            >
              Continuar <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
