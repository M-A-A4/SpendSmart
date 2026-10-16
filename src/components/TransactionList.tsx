
import { useMemo, useState } from "react";
import type {
  Transaction,
  TransactionFilter,
} from "../types/transaction";
import { ALL_CATEGORIES } from "../constants/categories";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.title.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query) ||
        transaction.date.includes(query);

      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        transaction.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, search, typeFilter, categoryFilter]);

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">
          Recent transactions
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Search, edit, or remove your transactions.
        </p>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search transactions..."
          aria-label="Search transactions"
          className="form-input sm:col-span-1"
        />

        <select
          value={typeFilter}
          onChange={(event) =>
            setTypeFilter(event.target.value as TransactionFilter)
          }
          aria-label="Filter by transaction type"
          className="form-input"
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          aria-label="Filter by category"
          className="form-input"
        >
          <option value="all">All categories</option>
          {ALL_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {filteredTransactions.length > 0 ? (
        <div>
          {filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 px-4 py-10 text-center">
          <p className="font-semibold text-slate-700">
            {transactions.length === 0
              ? "No transactions yet"
              : "No matching transactions"}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {transactions.length === 0
              ? "Add your first transaction to get started."
              : "Try changing your search or filters."}
          </p>
        </div>
      )}
    </section>
  );
}
