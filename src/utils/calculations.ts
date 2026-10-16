
import type { Transaction } from "../types/transaction";

export function calculateTotals(transactions: Transaction[]) {
  return transactions.reduce(
    (totals, transaction) => {
      if (transaction.type === "income") {
        totals.income += transaction.amount;
      } else {
        totals.expenses += transaction.amount;
      }

      return totals;
    },
    { income: 0, expenses: 0 },
  );
}

export function calculateBalance(
  income: number,
  expenses: number,
) {
  return income - expenses;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function getCurrentMonthTransactions(
  transactions: Transaction[],
) {
  const now = new Date();

  return transactions.filter((transaction) => {
    const date = new Date(`${transaction.date}T00:00:00`);

    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    );
  });
}
