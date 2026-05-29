import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Transaction } from '../types'

interface TransactionContextType {
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
  deleteTransaction: (id: string) => void
}

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined)



export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
  const saved = localStorage.getItem('fintrack-transactions')
  return saved ? JSON.parse(saved) : []
})

useEffect(() => {
  localStorage.setItem('fintrack-transactions', JSON.stringify(transactions))
}, [transactions])

  function addTransaction(transaction: Transaction) {
    setTransactions(prev => [...prev, transaction])
  }

  function deleteTransaction(id: string) {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext)
  if (!context) throw new Error('useTransactions deve ser usado dentro do TransactionProvider')
  return context
}