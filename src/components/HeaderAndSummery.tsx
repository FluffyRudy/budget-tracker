import { UserState } from "../states/User";
import BudgetSummery from "./BudgetSummery";
import Header from "./Header";

export default function HeaderAndSummery() {
  return (
    <div>
      <Header />
      <h2 className='font-extrabold font-sans text-2xl ml-[1vmax] text-red-300'>
        Hello {UserState().name} 👽
      </h2>
      <BudgetSummery />
    </div>
  );
}
