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
          summery: summeryUpdater(budget, state.summery, "add"),
        };
      }
      return state;
    }),
  removeBudget: (budgetID) =>
    set((state) => ({
      budgets: state.budgets.filter((elem) => elem.id != budgetID),
      summery: summeryUpdater(
        state.budgets.find((budget) => budget.id === budgetID)!,
        state.summery,
        "remove"
      ),
    })),

  updateBudget: (budgetId: string, updateBudget: Budget) =>
    set((state) => {
      const isDuplicate = state.budgets.some(
        (elem) => elem.id === updateBudget.id
      );
      return {
        budgets: state.budgets.map((budget) =>
          budget.id === (isDuplicate ? updateBudget.id : budgetId)
            ? { ...budget, ...updateBudget }
            : budget
        ),
        summery: summeryUpdater(updateBudget, state.summery, "update"),
      };
    }),
}));

function summeryUpdater(budget: Budget, prevSummery: Summery, action?: string) {
  const summery: Summery = { ...prevSummery };
  if (budget.type === "income") {
    if (action === "add" || action === "update") {
      summery.income += budget.amount;
      summery.balance += budget.amount;
    } else if (action === "remove") {
      summery.income -= budget.amount;
      summery.balance -= budget.amount;
    }
  } else if (budget.type === "expense") {
    if (action === "add" || action === "update") {
      summery.expenses += budget.amount;
      summery.balance -= budget.amount;
    } else if (action === "remove") {
      summery.expenses -= budget.amount;
      summery.balance += budget.amount;
    }
  }
  return summery;
}
