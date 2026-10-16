
import { useState } from 'react'
import type { Transaction } from '../types/transaction'

const initialTransactions: Transaction[] = [
  {
    id: 1,
    title: 'Monthly Salary',
    category: 'Salary',
    date: '2026-10-15',
    amount: 45000,
    type: 'income',
  },
  {
    id: 2,
    title: 'Grocery Shopping',
    category: 'Food',
    date: '2026-10-14',
    amount: 2500,
    type: 'expense',
  },
  {
    id: 3,
    title: 'Internet Bill',
    category: 'Utilities',
    date: '2026-10-12',
    amount: 1200,
    type: 'expense',
  },
  {
    id: 4,
    title: 'Freelance Work',
    category: 'Freelance',
    date: '2026-10-10',
    amount: 8000,
    type: 'income',
  },
]

export function useTransactions() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions)

  function addTransaction(data: Omit<Transaction, 'id'>) {
    const newTransaction: Transaction = {
      ...data,
      id: Date.now(),
    }

    setTransactions((previous) => [newTransaction, ...previous])
  }

  function updateTransaction(updated: Transaction) {
    setTransactions((previous) =>
      previous.map((transaction) =>
        transaction.id === updated.id ? updated : transaction,
      ),
    )
  }

  function deleteTransaction(id: number) {
    setTransactions((previous) =>
      previous.filter((transaction) => transaction.id !== id),
    )
  }

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  }
}
