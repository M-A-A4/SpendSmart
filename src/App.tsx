
import Header from './components/Header'
import SummaryCard from './components/SummaryCard'
import TransactionList, {
  type Transaction,
} from './components/TransactionList'

const transactions: Transaction[] = [
  {
    id: 1,
    title: 'Monthly Salary',
    category: 'Salary',
    date: 'Oct 15, 2026',
    amount: 45000,
    type: 'income',
  },
  {
    id: 2,
    title: 'Grocery Shopping',
    category: 'Food',
    date: 'Oct 14, 2026',
    amount: 2500,
    type: 'expense',
  },
  {
    id: 3,
    title: 'Internet Bill',
    category: 'Utilities',
    date: 'Oct 12, 2026',
    amount: 1200,
    type: 'expense',
  },
  {
    id: 4,
    title: 'Freelance Work',
    category: 'Freelance',
    date: 'Oct 10, 2026',
    amount: 8000,
    type: 'income',
  },
]

function App() {
  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((total, item) => total + item.amount, 0)

  const expenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((total, item) => total + item.amount, 0)

  const balance = income - expenses

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <Header />

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            title="Total Balance"
            amount={`${balance.toLocaleString()} AFN`}
            description="Income minus expenses"
            icon="💰"
            color="bg-purple-100"
          />

          <SummaryCard
            title="Total Income"
            amount={`${income.toLocaleString()} AFN`}
            description="Income from all listed transactions"
            icon="📈"
            color="bg-green-100"
          />

          <SummaryCard
            title="Total Expenses"
            amount={`${expenses.toLocaleString()} AFN`}
            description="Spending from all listed transactions"
            icon="💳"
            color="bg-red-100"
          />
        </section>

        <TransactionList transactions={transactions} />

        <footer className="pb-4 text-center text-sm text-gray-400">
          © 2026 SpendSmart · Manage your money wisely
        </footer>
      </div>
    </main>
  )
}

export default App
