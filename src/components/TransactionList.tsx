import type { Transaction } from '../types'
import { useTransactions } from '../context/TransactionContext'

export function TransactionList() {
  const { transactions, deleteTransaction } = useTransactions()

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
        <p className="text-gray-400 text-sm">Nenhuma transação encontrada.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      {transactions.map((transaction: Transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 border-b border-gray-50 last:border-none"
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              transaction.type === 'income'
                ? 'bg-green-50 text-green-600'
                : 'bg-red-50 text-red-500'
            }`}>
              {transaction.type === 'income' ? '↑' : '↓'}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{transaction.description}</p>
              <p className="text-xs text-gray-400">{transaction.category} · {transaction.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p className={`text-sm font-semibold ${
              transaction.type === 'income' ? 'text-green-600' : 'text-red-500'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}
              {Number(transaction.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </p>
            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="text-gray-300 hover:text-red-400 transition-colors text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}