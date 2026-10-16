
export type Transaction = {
  id: number
  title: string
  category: string
  date: string
  amount: number
  type: 'income' | 'expense'
}

type TransactionListProps = {
  transactions: Transaction[]
}

function TransactionList({ transactions }: TransactionListProps) {
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
          No transactions yet.
        </p>
      ) : (
        <div className="divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between gap-3 py-4"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-800">
                  {transaction.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {transaction.category} · {transaction.date}
                </p>
              </div>

              <p
                className={`shrink-0 font-bold ${
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-500'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {transaction.amount.toLocaleString()} AFN
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default TransactionList
