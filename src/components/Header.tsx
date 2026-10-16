
interface HeaderProps {
  onAddTransaction: () => void;
}

export default function Header({
  onAddTransaction,
}: HeaderProps) {
  return (
    <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
          Personal finance
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          SpendSmart
        </h1>
        <p className="mt-2 text-slate-500">
          Make every dollar count.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddTransaction}
        className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
      >
        + Add transaction
      </button>
    </header>
  );
}
