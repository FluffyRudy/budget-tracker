import { create } from "zustand";
import { Budget, BudgetSummery } from "../types/budget";

type BudgetStore = {
  budgets: Array<Budget>;
  addBudgets: (budget: Budget) => void;
  removeBudget: (budgetID: string) => void;
};

type SummeryStore = {
  summery: BudgetSummery;
  addIncome: (amount: Budget["amount"]) => void;
  addExpense: (amount: Budget["amount"]) => void;
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

export const useSummeryStore = create<SummeryStore>()((set) => ({
  summery: { totalIncome: 0, totalExpenses: 0, balance: 0 },
  addIncome: (amount) =>
    set((state) => ({
      summery: {
        ...state.summery,
        totalIncome: state.summery.totalIncome + amount,
      },
    })),
  addExpense: (amount) =>
    set((state) => ({
      summery: {
        ...state.summery,
        totalExpenses: state.summery.totalExpenses + amount,
      },
    })),
}));
