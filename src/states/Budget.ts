import { create } from "zustand";
import { Budget } from "../types/budget";

type BudgetState = {
  budgets: Budget[];
  allBudgetsId: string[];
  addBudget: (budget: Budget) => void;
  removeBudget: (id: Budget["id"]) => void;
  addBudgetId: (id: Budget["id"]) => void;
};

export const useBudgetStore = create<BudgetState>()((set) => ({
  budgets: [],
  allBudgetsId: [],
  addBudget: (budget: Budget) =>
    set((state) => ({ budgets: [...state.budgets, budget] })),
  removeBudget: (id: Budget["id"]) =>
    set((state) => ({
      budgets: state.budgets.filter((budget) => budget.id != id),
    })),
  addBudgetId: (id: Budget["id"]) =>
    set((state) => ({ allBudgetsId: [...state.allBudgetsId, id] })),
}));
