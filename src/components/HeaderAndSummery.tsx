import { UserState } from "../states/User";
import BudgetSummery from "./BudgetSummery";
import Header from "./Header";

export default function HeaderAndSummery() {
  return (
    <div>
      <Header />
      <h2 className='w-[min(1000px,90vw)] mx-auto my-5 font-extrabold font-sans text-2xl  text-red-300'>
        Hello {UserState().name} 👽
      </h2>
      <BudgetSummery />
    </div>
  );
}
