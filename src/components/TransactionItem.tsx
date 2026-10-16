
import { memo } from "react";
import type { Transaction } from "../types/transaction";
import { formatCurrency } from "../utils/calculations";

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

function TransactionItem({
  transaction,
  onEdit,
  onDelete,
}: TransactionItemProps) {
  const isIncome = transaction.type === "income";

  return (
    <article className="flex flex-col gap-3 border-b border-slate-100 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${isIncome ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
          {isIncome ? "↙" : "↗"}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-800">
            {transaction.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {transaction.category} · {transaction.date}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span className={`font-bold ${isIncome ? "text-emerald-600" : "text-rose-600"}`}>
          {isIncome ? "+" : "−"}{formatCurrency(transaction.amount)}
        </span>

        <button
          type="button"
          onClick={() => onEdit(transaction)}
          aria-label={`Edit ${transaction.title}`}
          className="rounded-lg px-3 py-2 text-sm font-medium text-violet-700 hover:bg-violet-50"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => {
            if (window.confirm(`Delete "${transaction.title}"?`)) {
              onDelete(transaction.id);
            }
          }}
          aria-label={`Delete ${transaction.title}`}
          className="rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default memo(TransactionItem);
