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
    set((state) => ({ budgets: [...state.budgets, budget] })),
  removeBudget: (budgetID) =>
    set((state) => ({
      budgets: state.budgets.filter((elem) => elem.id != budgetID),
    })),
}));
