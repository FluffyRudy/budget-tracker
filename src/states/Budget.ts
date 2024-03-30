import { create } from "zustand";
import { Budget } from "../types/budget";

type BudgetStore = {
  budgets: Array<Budget>;
  addBudgets: (budget: Budget) => void;
  removeBudget: (budgetID: string) => void;
};

export const useBudgetStore = create<BudgetStore>()((set) => ({
  budgets: [],
  addBudgets: (budget) =>
    set((state) => {
      const isDuplicate = state.budgets.some((elem) => elem.id === budget.id);
      if (!isDuplicate) {
        return { budgets: [...state.budgets, budget] };
      }
      return state;
    }),
  removeBudget: (budgetID) =>
    set((state) => ({
      budgets: state.budgets.filter((elem) => elem.id != budgetID),
    })),
}));
