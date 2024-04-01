import { Outlet } from "react-router-dom";
import { UserState } from "../states/User";
import HeaderAndSummery from "../components/HeaderAndSummery";
import BudgetDisplay from "../components/BudgetsDisplay";

export default function Dashboard() {
  const userState = UserState();
  return (
    <div className=''>
      <HeaderAndSummery />
      <Outlet />
      <BudgetDisplay />
    </div>
  );
}
