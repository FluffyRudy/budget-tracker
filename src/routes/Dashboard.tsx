import { Form, Outlet } from "react-router-dom";
import { UserState } from "../states/User";
import { DataStorage } from "../ultils/DataStorage";
import HeaderAndSummery from "../components/HeaderAndSummery";
import BudgetDisplay from "../components/BudgetsDisplay";

export default function Dashboard() {
  const userState = UserState();
  console.log(userState);
  return (
    <div className=''>
      <HeaderAndSummery />
      <Outlet />
      <BudgetDisplay />
      <div className='mt-5'>
        <div>
          <Form
            onSubmit={() => {
              userState.reset();
              DataStorage.clearCurrentUser();
            }}
            action='/login'>
            <button className='block m-auto'>Logout</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
