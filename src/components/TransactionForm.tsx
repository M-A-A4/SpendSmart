
import { useEffect, useState } from "react";
import type {
  Transaction,
  TransactionInput,
  TransactionType,
} from "../types/transaction";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../constants/categories";

interface TransactionFormProps {
  editingTransaction: Transaction | null;
  onSubmit: (input: TransactionInput) => void;
  onCancelEdit: () => void;
}

const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function TransactionForm({
  editingTransaction,
  onSubmit,
  onCancelEdit,
}: TransactionFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(today());
  const [error, setError] = useState("");

  const categories =
    type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(String(editingTransaction.amount));
      setType(editingTransaction.type);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
    } else {
      setTitle("");
      setAmount("");
      setType("expense");
      setCategory("Food");
      setDate(today());
    }

    setError("");
  }, [editingTransaction]);

  useEffect(() => {
    if (!categories.includes(category)) {
      setCategory(categories[0]);
    }
  }, [category, categories]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const numericAmount = Number(amount);

    if (!trimmedTitle) {
      setError("Please enter a transaction title.");
      return;
    }

    if (amount.trim() === "" || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }

    if (!category || !categories.includes(category)) {
      setError("Please select a valid category.");
      return;
    }

    if (!date || Number.isNaN(new Date(`${date}T00:00:00`).getTime())) {
      setError("Please select a valid date.");
      return;
    }

    onSubmit({
      title: trimmedTitle,
      amount: numericAmount,
      type,
      category,
      date,
    });

    setError("");

    if (!editingTransaction) {
      setTitle("");
      setAmount("");
      setType("expense");
      setCategory("Food");
      setDate(today());
    }
  }

  return (
    <section
      id="transaction-form"
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
    >
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">
          {editingTransaction ? "Edit transaction" : "Add a transaction"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Keep your income and expenses up to date.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="transaction-title" className="mb-1 block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="transaction-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Grocery shopping"
            maxLength={100}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="transaction-amount" className="mb-1 block text-sm font-medium text-slate-700">
            Amount ($)
          </label>
          <input
            id="transaction-amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="0.00"
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="transaction-type" className="mb-1 block text-sm font-medium text-slate-700">
            Type
          </label>
          <select
            id="transaction-type"
            value={type}
            onChange={(event) => setType(event.target.value as TransactionType)}
            className="form-input"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label htmlFor="transaction-category" className="mb-1 block text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            id="transaction-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="form-input"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="transaction-date" className="mb-1 block text-sm font-medium text-slate-700">
            Date
          </label>
          <input
            id="transaction-date"
            type="date"
            value={date}
            max={today()}
            onChange={(event) => setDate(event.target.value)}
            className="form-input"
          />
        </div>

        {error && (
          <p role="alert" className="sm:col-span-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button type="submit" className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700">
            {editingTransaction ? "Save changes" : "Add transaction"}
          </button>

          {editingTransaction && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
