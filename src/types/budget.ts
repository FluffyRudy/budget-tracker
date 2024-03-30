export interface Budget {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: string;
  occurance: string;
}

export interface BudgetSummery {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}
