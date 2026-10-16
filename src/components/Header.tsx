
function Header() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
          My Finances
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
          S
        </div>
      </div>
    </header>
  )
}

export default Header
