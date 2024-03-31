import { create } from "zustand";
import { Budget, Summery } from "../types/budget";

type BudgetStore = {
  budgets: Array<Budget>;
  summery: Summery;
  addBudgets: (budget: Budget) => void;
  removeBudget: (budgetID: string) => void;
  updateBudget: (budgetID: string, updatedBudget: Budget) => void;
};

export const useBudgetStore = create<BudgetStore>()((set) => ({
  budgets: [],
  summery: {
    income: 0,
    expenses: 0,
    balance: 0,
  },
  addBudgets: (budget) =>
    set((state) => {
      const isDuplicate = state.budgets.some((elem) => elem.id === budget.id);
      if (!isDuplicate) {
        return {
          budgets: [...state.budgets, budget],
          summery: summeryUpdater(budget, state.summery),
        };
      }
      return state;
    }),
  removeBudget: (budgetID) =>
    set((state) => ({
      budgets: state.budgets.filter((elem) => elem.id != budgetID),
    })),

  updateBudget: (budgetId: string, updateBudget: Budget) =>
    set((state) => {
      const isDuplicate = state.budgets.some(
        (elem) => elem.id === updateBudget.id
      );
      if (isDuplicate) return state;
      return {
        budgets: state.budgets.map((budget) =>
          budget.id === budgetId ? { ...budget, ...updateBudget } : budget
        ),
        summery: state.summery,
      };
    }),
}));

function summeryUpdater(budget: Budget, prevSummery: Summery) {
  const summery: Summery = { ...prevSummery };
  switch (budget["type"]) {
    case "income":
      summery.income += budget.amount;
      summery.balance += budget.amount;
      break;
    case "expense":
      summery.expenses += budget.amount;
      summery.balance -= budget.amount;
      break;
  }
  return summery;
}
