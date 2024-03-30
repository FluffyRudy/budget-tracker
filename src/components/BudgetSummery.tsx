import { SummeryPanel } from "./SummeryPanel";
import { useBudgetStore } from "../states/Budget";
import React from "react";

const MemoizedSummeryPanel = React.memo(SummeryPanel);

export default function BudgetSummery() {
  const { summery } = useBudgetStore();
  return (
    <div className='budget-summery-container'>
      <MemoizedSummeryPanel
        label='Total Income'
        value={summery.income}
      />
      <MemoizedSummeryPanel
        label='Total Expenses'
        value={summery.expenses}
      />
      <MemoizedSummeryPanel
        label='Balance'
        value={summery.balance}
      />
    </div>
  );
}
