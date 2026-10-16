
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useBudget() {
  const [budget, setBudget] = useLocalStorage<number>(
    "spendsmart-monthly-budget",
    1000,
  );

  const updateBudget = useCallback(
    (amount: number) => {
      if (Number.isFinite(amount) && amount >= 0) {
        setBudget(amount);
      }
    },
    [setBudget],
  );

  return { budget, updateBudget };
}
