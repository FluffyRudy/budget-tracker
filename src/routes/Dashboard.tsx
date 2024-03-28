import { Form } from "react-router-dom";
import { UserState } from "../states/User";
import { DataStorage } from "../ultils/DataStorage";
import Header from "../components/Header";
import BudgetSummery from "../components/BudgetSummery";

export default function Dashboard() {
  const userState = UserState();
  return (
    <div>
      <Header />
      <div className='mt-5'>
        <h2 className='font-extrabold font-sans w-[80vw] m-auto text-2xl text-red-300'>
          Hello {userState.name} 👽
        </h2>
        <BudgetSummery />
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
