
import { useMemo } from "react";
import type { Transaction } from "../types/transaction";
import { formatCurrency } from "../utils/calculations";

interface SpendingBreakdownProps {
  transactions: Transaction[];
}

export default function SpendingBreakdown({
  transactions,
}: SpendingBreakdownProps) {
  const spending = useMemo(() => {
    const totals = new Map<string, number>();

    transactions
      .filter((transaction) => transaction.type === "expense")
      .forEach((transaction) => {
        totals.set(
          transaction.category,
          (totals.get(transaction.category) ?? 0) + transaction.amount,
        );
      });

    return Array.from(totals.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const total = spending.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">
        Spending breakdown
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Where your money is going.
      </p>

      {spending.length === 0 ? (
        <p className="mt-6 rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
          No expenses to display yet.
        </p>
      ) : (
        <div className="mt-6 space-y-5">
          {spending.map((item) => {
            const percentage = total > 0 ? (item.amount / total) * 100 : 0;

            return (
              <div key={item.category}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-700">
                    {item.category}
                  </span>
                  <span className="text-slate-500">
                    {formatCurrency(item.amount)} · {percentage.toFixed(0)}%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-violet-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
