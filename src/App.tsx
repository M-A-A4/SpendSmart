
import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import BudgetCard from "./components/BudgetCard";
import SpendingBreakdown from "./components/SpendingBreakdown";
import { useTransactions } from "./hooks/useTransactions";
import { useBudget } from "./hooks/useBudget";
import type {
  Transaction,
  TransactionInput,
} from "./types/transaction";
import {
  calculateBalance,
  calculateTotals,
  getCurrentMonthTransactions,
} from "./utils/calculations";

export default function App() {
  const {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
  } = useTransactions();

  const { budget, updateBudget } = useBudget();

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const totals = useMemo(
    () => calculateTotals(transactions),
    [transactions],
  );

  const balance = useMemo(
    () => calculateBalance(totals.income, totals.expenses),
    [totals],
  );

  const currentMonthTransactions = useMemo(
    () => getCurrentMonthTransactions(transactions),
    [transactions],
  );

  const currentMonthTotals = useMemo(
    () => calculateTotals(currentMonthTransactions),
    [currentMonthTransactions],
  );

  const handleSubmit = useCallback(
    (input: TransactionInput) => {
      if (editingTransaction) {
        editTransaction(editingTransaction.id, input);
        setEditingTransaction(null);
      } else {
        addTransaction(input);
      }
    },
    [editingTransaction, addTransaction, editTransaction],
  );

  const handleEdit = useCallback((transaction: Transaction) => {
    setEditingTransaction(transaction);

    document
      .getElementById("transaction-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingTransaction(null);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      deleteTransaction(id);

      if (editingTransaction?.id === id) {
        setEditingTransaction(null);
      }
    },
    [deleteTransaction, editingTransaction],
  );

  const handleAddTransaction = useCallback(() => {
    setEditingTransaction(null);

    document
      .getElementById("transaction-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Header onAddTransaction={handleAddTransaction} />

        <section
          aria-label="Financial summary"
          className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <SummaryCard
            title="Total balance"
            amount={balance}
            description="Income minus expenses"
            icon="💰"
            color="violet"
          />

          <SummaryCard
            title="Total income"
            amount={totals.income}
            description="All recorded income"
            icon="↙"
            color="green"
          />

          <SummaryCard
            title="Total expenses"
            amount={totals.expenses}
            description="All recorded expenses"
            icon="↗"
            color="red"
          />
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <TransactionForm
            editingTransaction={editingTransaction}
            onSubmit={handleSubmit}
            onCancelEdit={handleCancelEdit}
          />

          <div className="grid content-start gap-6">
            <BudgetCard
              budget={budget}
              spent={currentMonthTotals.expenses}
              onUpdateBudget={updateBudget}
            />

            <SpendingBreakdown
              transactions={currentMonthTransactions}
            />
          </div>
        </section>

        <TransactionList
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <footer className="py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} SpendSmart. Manage your money wisely.
        </footer>
      </div>
    </main>
  );
}
