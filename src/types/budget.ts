export interface Budget {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: string;
  occurance: string;
}

export interface Summery {
  income: number;
  expenses: number;
  balance: number;
}
