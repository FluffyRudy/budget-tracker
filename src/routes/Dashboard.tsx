import { Form, Outlet, useLocation } from "react-router-dom";
import { UserState } from "../states/User";
import { DataStorage } from "../ultils/DataStorage";
import HeaderAndSummery from "../components/HeaderAndSummery";
import { useBudgetStore } from "../states/Budget";

export default function Dashboard() {
  const location = useLocation();
  console.log(location);
  const userState = UserState();
  const budgetsData = useBudgetStore((state) => state.budgets);
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
      <ul>
        {location.pathname != "/budget" &&
          budgetsData.map((elem) => <li key={elem.id}>{elem.name}</li>)}
      </ul>
    </div>
  );
}
