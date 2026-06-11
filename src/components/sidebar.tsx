interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden lg:flex w-64 h-screen bg-white border-r border-gray-100 flex-col p-4">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-2xl">💰</span>
        <h1 className="text-xl font-semibold text-gray-800">FinTrack</h1>
      </div>

      <nav className="flex flex-col gap-1">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentPage === 'dashboard'
              ? 'bg-green-50 text-green-700'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => onNavigate('transactions')}
          className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentPage === 'transactions'
              ? 'bg-green-50 text-green-700'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Transações
        </button>

        <button
          onClick={() => onNavigate('add')}
          className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentPage === 'add'
              ? 'bg-green-50 text-green-700'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Nova transação
        </button>
      </nav>
    </aside>
  )
}