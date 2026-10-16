
import TransactionItem from './TransactionItem'
import type { Transaction } from '../types/transaction'

type TransactionListProps = {
  transactions: Transaction[]
  onEdit: (transaction: Transaction) => void
  onDelete: (id: number) => void
}

function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          Recent Transactions
        </h2>
        <span className="text-sm text-gray-500">
          {transactions.length} records
        </span>
      </div>

      {transactions.length === 0 ? (
        <p className="py-8 text-center text-gray-500">
          No transactions yet. Add your first transaction above.
        </p>
      ) : (
        <div className="divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default TransactionList
