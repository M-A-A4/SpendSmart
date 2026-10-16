
type SummaryCardProps = {
  title: string
  amount: string
  description: string
  icon: string
  color: string
}

function SummaryCard({
  title,
  amount,
  description,
  icon,
  color,
}: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            {amount}
          </h2>
        </div>

        <div className={`rounded-xl p-3 text-2xl ${color}`}>
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        {description}
      </p>
    </article>
  )
}

export default SummaryCard
