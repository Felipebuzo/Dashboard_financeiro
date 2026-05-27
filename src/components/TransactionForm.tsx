import { useState } from 'react'
import { useTransactions } from '../context/TransactionContext'
import type { Transaction } from '../types'

export function TransactionForm() {
  const { addTransaction } = useTransactions()

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  function handleSubmit() {
    if (!description || !amount || !category || !date) return

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      description,
      amount: Number(amount),
      type,
      category,
      date
    }

    addTransaction(newTransaction)
    setDescription('')
    setAmount('')
    setCategory('')
    setDate('')
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Nova transação</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setType('expense')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === 'expense' ? 'bg-red-50 text-red-600' : 'text-gray-400 hover:bg-gray-50'
          }`}
        >
          Despesa
        </button>
        <button
          onClick={() => setType('income')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === 'income' ? 'bg-green-50 text-green-600' : 'text-gray-400 hover:bg-gray-50'
          }`}
        >
          Receita
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
        />
        <input
          type="text"
          placeholder="Categoria (ex: Moradia)"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Adicionar
        </button>
      </div>
    </div>
  )
}