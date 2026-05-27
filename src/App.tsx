import { useState } from 'react'
import { Sidebar } from './components/sidebar'
import { SummaryCards } from './components/SummaryCards'
import { TransactionList } from './components/TransactionList'
import { TransactionForm } from './components/TransactionForm'
import { CategoryChart } from './components/CategoryChart'
import { useTransactions } from './context/TransactionContext'
import type { Summary } from './types'

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { transactions } = useTransactions()

  const summary: Summary = {
    totalIncome: transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0),
    totalExpense: transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0),
    balance: transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0) -
      transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-1 overflow-y-auto p-8">
        {currentPage === 'dashboard' && (
          <div>
            <h1 className="text-lg font-semibold text-gray-800 mb-6">Dashboard</h1>
            <SummaryCards summary={summary} dollarRate={0} />
            <CategoryChart />
          </div>
        )}

        {currentPage === 'transactions' && (
          <div>
            <h1 className="text-lg font-semibold text-gray-800 mb-6">Transações</h1>
            <TransactionList />
          </div>
        )}

        {currentPage === 'add' && (
          <div className="max-w-md">
            <h1 className="text-lg font-semibold text-gray-800 mb-6">Nova transação</h1>
            <TransactionForm />
          </div>
        )}
      </main>
    </div>
  )
}