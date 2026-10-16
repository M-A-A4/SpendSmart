
import { useState } from 'react'
import Header from './components/Header'
import SummaryCard from './components/SummaryCard'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { useTransactions } from './hooks/useTransactions'
import type { Transaction } from './types/transaction'

function App() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions()

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null)

  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((total, item) => total + item.amount, 0)

  const expenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((total, item) => total + item.amount, 0)

  const balance = income - expenses

  function handleDelete(id: number) {
    deleteTransaction(id)

    if (editingTransaction?.id === id) {
      setEditingTransaction(null)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <Header />

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            title="Total Balance"
            amount={`${balance.toLocaleString()} AFN`}
            description="Income minus expenses"
            icon="💰"
            color="bg-purple-100"
          />

          <SummaryCard
            title="Total Income"
            amount={`${income.toLocaleString()} AFN`}
            description="Income from all transactions"
            icon="📈"
            color="bg-green-100"
          />

          <SummaryCard
            title="Total Expenses"
            amount={`${expenses.toLocaleString()} AFN`}
            description="Spending from all transactions"
            icon="💳"
            color="bg-red-100"
          />
        </section>

        <TransactionForm
          editingTransaction={editingTransaction}
          onAdd={addTransaction}
          onUpdate={updateTransaction}
          onCancel={() => setEditingTransaction(null)}
        />

        <TransactionList
          transactions={transactions}
          onEdit={setEditingTransaction}
          onDelete={handleDelete}
        />

        <footer className="pb-4 text-center text-sm text-gray-400">
          © 2026 SpendSmart · Manage your money wisely
        </footer>
      </div>
    </main>
  )
}

export default App
