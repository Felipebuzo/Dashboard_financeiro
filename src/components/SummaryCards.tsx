import type { Summary } from '../types'

interface SummaryCardsProps {
  summary: Summary
  dollarRate: number
}

export function SummaryCards({ summary, dollarRate }: SummaryCardsProps) {
  function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <p className="text-xs text-gray-500 mb-1">Saldo atual</p>
        <p className={`text-xl font-semibold ${summary.balance >= 0 ? 'text-green-600' : 'text-red-500'}`}>
          {formatCurrency(summary.balance)}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <p className="text-xs text-gray-500 mb-1">Receitas</p>
        <p className="text-xl font-semibold text-gray-800">
          {formatCurrency(summary.totalIncome)}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <p className="text-xs text-gray-500 mb-1">Despesas</p>
        <p className="text-xl font-semibold text-red-500">
          {formatCurrency(summary.totalExpense)}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <p className="text-xs text-gray-500 mb-1">Dólar hoje</p>
        <p className="text-xl font-semibold text-blue-600">
          {dollarRate ? formatCurrency(dollarRate) : 'Carregando...'}
        </p>
      </div>
    </div>
  )
}