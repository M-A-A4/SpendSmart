
import { useState } from "react";
import { formatCurrency } from "../utils/calculations";

interface BudgetCardProps {
  budget: number;
  spent: number;
  onUpdateBudget: (amount: number) => void;
}

export default function BudgetCard({
  budget,
  spent,
  onUpdateBudget,
}: BudgetCardProps) {
  const [newBudget, setNewBudget] = useState(String(budget));
  const [error, setError] = useState("");

  const percentage =
    budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

  function handleUpdate() {
    const amount = Number(newBudget);

    if (newBudget.trim() === "" || !Number.isFinite(amount) || amount < 0) {
      setError("Enter a valid budget of zero or more.");
      return;
    }

    onUpdateBudget(amount);
    setError("");
  }

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Monthly budget</h2>
          <p className="mt-1 text-sm text-slate-500">
            Track your expenses against your target.
          </p>
        </div>
        <span className="rounded-xl bg-violet-100 px-3 py-2 text-violet-700">
          $
        </span>
      </div>

      <div className="mt-6 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">Spent this month</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {formatCurrency(spent)}
          </p>
        </div>
        <p className="text-sm text-slate-500">
          of {formatCurrency(budget)}
        </p>
      </div>

      <div
        className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label="Monthly budget used"
        aria-valuemin={0}
        aria-valuemax={budget || 1}
        aria-valuenow={Math.min(spent, budget)}
      >
        <div
          className={`h-full rounded-full transition-all ${spent > budget ? "bg-rose-500" : "bg-violet-600"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className={`mt-3 text-sm ${spent > budget ? "font-semibold text-rose-600" : "text-slate-500"}`}>
        {budget === 0
          ? "Set a budget to track your spending."
          : spent > budget
            ? `You are ${formatCurrency(spent - budget)} over budget.`
            : `${formatCurrency(budget - spent)} remaining in your budget.`}
      </p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <input
          type="number"
          min="0"
          step="0.01"
          value={newBudget}
          onChange={(event) => setNewBudget(event.target.value)}
          aria-label="New monthly budget"
          className="form-input"
        />
        <button
          type="button"
          onClick={handleUpdate}
          className="shrink-0 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-700"
        >
          Update
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-2 text-sm text-rose-600">
          {error}
        </p>
      )}
    </section>
  );
}
