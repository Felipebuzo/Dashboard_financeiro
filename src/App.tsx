import { useState, useEffect } from 'react'
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

  const [dollarRate, setDollarRate] = useState(0)

useEffect(() => {
  fetch('https://economia.awesomeapi.com.br/last/USD-BRL')
    .then(res => res.json())
    .then(data => {
      setDollarRate(Number(data.USDBRL.bid))
    })
    .catch(() => setDollarRate(0))
}, [])

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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-1 overflow-y-auto p-8">
        {currentPage === 'dashboard' && (
          <div>
            <h1 className="text-lg font-semibold text-gray-800 mb-6">Dashboard</h1>
           <SummaryCards summary={summary} dollarRate={dollarRate} />
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


      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-3">
  <button onClick={() => setCurrentPage('dashboard')} className={`text-xs flex flex-col items-center gap-1 ${currentPage === 'dashboard' ? 'text-green-600' : 'text-gray-400'}`}>
    <span>📊</span>Dashboard
  </button>
  <button onClick={() => setCurrentPage('transactions')} className={`text-xs flex flex-col items-center gap-1 ${currentPage === 'transactions' ? 'text-green-600' : 'text-gray-400'}`}>
    <span>📋</span>Transações
  </button>
  <button onClick={() => setCurrentPage('add')} className={`text-xs flex flex-col items-center gap-1 ${currentPage === 'add' ? 'text-green-600' : 'text-gray-400'}`}>
    <span>➕</span>Adicionar
  </button>
</nav>
    </div>
  )
}