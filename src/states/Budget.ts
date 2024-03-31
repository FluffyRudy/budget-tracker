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
          summery: summeryUpdater(null, budget, state.summery),
        };
      }
      return state;
    }),
  removeBudget: (budgetID) =>
    set((state) => {
      const budgetToRemove = state.budgets.find(
        (budget) => budget.id === budgetID
      );
      if (!budgetToRemove) {
        return state;
      }
      return {
        budgets: state.budgets.filter((elem) => elem.id !== budgetID),
        summery: summeryUpdater(budgetToRemove, null, state.summery),
      };
    }),
  updateBudget: (budgetId: string, updatedBudget: Budget) =>
    set((state) => {
      const oldBudget = state.budgets.find((budget) => budget.id === budgetId);
      if (!oldBudget) {
        return state;
      }
      return {
        budgets: state.budgets.map((budget) =>
          budget.id === budgetId ? { ...budget, ...updatedBudget } : budget
        ),
        summery: summeryUpdater(oldBudget, updatedBudget, state.summery),
      };
    }),
}));

function summeryUpdater(
  oldBudget: Budget | null,
  newBudget: Budget | null,
  prevSummery: Summery
): Summery {
  let summery: Summery = { ...prevSummery };
  if (oldBudget) {
    summery = adjustSummery(oldBudget, summery, -1);
  }
  if (newBudget) {
    summery = adjustSummery(newBudget, summery, 1);
  }
  return summery;
}

function adjustSummery(
  budget: Budget,
  summery: Summery,
  operation: number
): Summery {
  const amount = operation * budget.amount;
  if (budget.type === "income") {
    summery.income += amount;
    summery.balance += amount;
  } else if (budget.type === "expense") {
    summery.expenses += amount;
    summery.balance -= amount;
  }
  return summery;
}
