
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { Transaction, TransactionType } from '../types/transaction'

type TransactionFormProps = {
  editingTransaction: Transaction | null
  onAdd: (data: Omit<Transaction, 'id'>) => void
  onUpdate: (transaction: Transaction) => void
  onCancel: () => void
}

function TransactionForm({
  editingTransaction,
  onAdd,
  onUpdate,
  onCancel,
}: TransactionFormProps) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState('')
  const [type, setType] = useState<TransactionType>('expense')
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title)
      setAmount(String(editingTransaction.amount))
      setCategory(editingTransaction.category)
      setDate(editingTransaction.date)
      setType(editingTransaction.type)
    } else {
      setTitle('')
      setAmount('')
      setCategory('Food')
      setDate('')
      setType('expense')
    }

    setError('')
  }, [editingTransaction])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cleanTitle = title.trim()
    const numericAmount = Number(amount)

    if (!cleanTitle) {
      setError('Please enter a transaction title.')
      return
    }

    if (!amount.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Amount must be a valid number greater than zero.')
      return
    }

    if (!category.trim()) {
      setError('Please select a category.')
      return
    }

    if (!date || Number.isNaN(Date.parse(date))) {
      setError('Please select a valid date.')
      return
    }

    const data = {
      title: cleanTitle,
      amount: numericAmount,
      category,
      date,
      type,
    }

    if (editingTransaction) {
      onUpdate({ ...data, id: editingTransaction.id })
    } else {
      onAdd(data)
    }

    setTitle('')
    setAmount('')
    setCategory('Food')
    setDate('')
    setType('expense')
    setError('')
  }

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-lg font-bold text-gray-900">
        {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-gray-700">
          Transaction title
          <input
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Grocery shopping"
            required
          />
        </label>

        <label className="text-sm font-medium text-gray-700">
          Amount (AFN)
          <input
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter amount"
            required
          />
        </label>

        <label className="text-sm font-medium text-gray-700">
          Category
          <select
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Utilities">Utilities</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="text-sm font-medium text-gray-700">
          Date
          <input
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </label>

        <label className="text-sm font-medium text-gray-700 sm:col-span-2">
          Transaction type
          <select
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
            value={type}
            onChange={(event) =>
              setType(event.target.value as TransactionType)
            }
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-600 sm:col-span-2">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button
            type="submit"
            className="rounded-lg bg-purple-600 px-5 py-2.5 font-semibold text-white hover:bg-purple-700"
          >
            {editingTransaction ? 'Save Changes' : 'Add Transaction'}
          </button>

          {editingTransaction && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default TransactionForm
