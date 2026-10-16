
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type {
  Transaction,
  TransactionInput,
} from "../types/transaction";

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "spendsmart-transactions",
    [],
  );

  const addTransaction = useCallback(
    (input: TransactionInput) => {
      const newTransaction: Transaction = {
        ...input,
        id: crypto.randomUUID(),
      };

      setTransactions((current) => [newTransaction, ...current]);
    },
    [setTransactions],
  );

  const editTransaction = useCallback(
    (id: string, input: TransactionInput) => {
      setTransactions((current) =>
        current.map((transaction) =>
          transaction.id === id
            ? { ...input, id }
            : transaction,
        ),
      );
    },
    [setTransactions],
  );

  const deleteTransaction = useCallback(
    (id: string) => {
      setTransactions((current) =>
        current.filter((transaction) => transaction.id !== id),
      );
    },
    [setTransactions],
  );

  return {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
  };
}
