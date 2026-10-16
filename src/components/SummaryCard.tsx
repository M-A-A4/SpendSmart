
import { memo } from "react";
import { formatCurrency } from "../utils/calculations";

interface SummaryCardProps {
  title: string;
  amount: number;
  description: string;
  icon: string;
  color: "violet" | "green" | "red";
}

const colorClasses = {
  violet: "bg-violet-100 text-violet-700",
  green: "bg-emerald-100 text-emerald-700",
  red: "bg-rose-100 text-rose-700",
};

function SummaryCard({
  title,
  amount,
  description,
  icon,
  color,
}: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {formatCurrency(amount)}
          </p>
        </div>

        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">{description}</p>
    </article>
  );
}

export default memo(SummaryCard);
