
import type { Transaction } from '../types/transaction'

type TransactionItemProps = {
  transaction: Transaction
  onEdit: (transaction: Transaction) => void
  onDelete: (id: number) => void
}

function TransactionItem({
  transaction,
  onEdit,
  onDelete,
}: TransactionItemProps) {
  return (
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate font-semibold text-gray-800">
          {transaction.title}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {transaction.category} · {transaction.date}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <p
          className={`font-bold ${
            transaction.type === 'income'
              ? 'text-green-600'
              : 'text-red-500'
          }`}
        >
          {transaction.type === 'income' ? '+' : '-'}
          {transaction.amount.toLocaleString()} AFN
        </p>

        <button
          type="button"
          onClick={() => onEdit(transaction)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(transaction.id)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TransactionItem
