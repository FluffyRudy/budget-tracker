import { useSummeryStore } from "../states/Budget";
import { SummeryPanel } from "./SummeryPanel";
import React from "react";

const MemoizedSummeryPanel = React.memo(SummeryPanel);

export default function BudgetSummery() {
  const { summery } = useSummeryStore();
  return (
    <div className='budget-summery-container'>
      <MemoizedSummeryPanel
        label='Total Income'
        value={summery.totalIncome}
      />
      <MemoizedSummeryPanel
        label='Total Expenses'
        value={summery.totalExpenses}
      />
      <MemoizedSummeryPanel
        label='Balance'
        value={summery.balance}
      />
    </div>
  );
}
