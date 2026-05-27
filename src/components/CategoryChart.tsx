import { useTransactions } from '../context/TransactionContext'

export function CategoryChart() {
  const { transactions } = useTransactions()

  const expenses = transactions.filter(t => t.type === 'expense')

  const data = expenses.reduce((acc: { category: string; total: number }[], transaction) => {
    const existing = acc.find(item => item.category === transaction.category)
    if (existing) {
      existing.total += transaction.amount
    } else {
      acc.push({ category: transaction.category, total: transaction.amount })
    }
    return acc
  }, [])

  const maxTotal = Math.max(...data.map(d => d.total), 1)

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
        <p className="text-gray-400 text-sm">Nenhuma despesa registrada ainda.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Gastos por categoria</h2>
      <div className="flex flex-col gap-3">
        {data.map(item => (
          <div key={item.category}>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{item.category}</span>
              <span>{item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(item.total / maxTotal) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}