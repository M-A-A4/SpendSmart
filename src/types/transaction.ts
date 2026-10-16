
export type TransactionType = "income" | "expense";
export type TransactionFilter = "all" | TransactionType;

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
}

export interface TransactionInput {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
}
