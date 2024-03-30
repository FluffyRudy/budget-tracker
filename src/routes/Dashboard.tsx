import { Form, Outlet } from "react-router-dom";
import { UserState } from "../states/User";
import { DataStorage } from "../ultils/DataStorage";
import HeaderAndSummery from "../components/HeaderAndSummery";
import { useBudgetStore } from "../states/Budget";

export default function Dashboard() {
  const userState = UserState();
  const budgetStore = useBudgetStore((state) => state);
  console.log(budgetStore.budgets);
  return (
    <div>
      <HeaderAndSummery />
      <Outlet />
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
