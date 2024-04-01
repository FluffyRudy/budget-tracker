import { Outlet } from "react-router-dom";
import HeaderAndSummery from "../components/HeaderAndSummery";
import BudgetDisplay from "../components/BudgetsDisplay";

export default function Dashboard() {
  return (
    <div className=''>
      <HeaderAndSummery />
      <Outlet />
      <BudgetDisplay />
    </div>
  );
}
