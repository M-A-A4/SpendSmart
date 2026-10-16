
export type TransactionType = 'income' | 'expense'

export type Transaction = {
  id: number
  title: string
  category: string
  date: string
  amount: number
  type: TransactionType
}
