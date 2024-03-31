import { useBudgetStore } from "../states/Budget";
import { UserState } from "../states/User";
import BudgetSummery from "./BudgetSummery";
import Header from "./Header";

export default function HeaderAndSummery() {
  const { summery } = useBudgetStore();
  return (
    <div>
      <Header />
      <h2 className='w-[min(1000px,90vw)] mx-auto my-5 font-extrabold font-mono text-2xl  text-red-300'>
        Hello {UserState().name} 👽{" "}
        <span>
          {summery.balance < 1000
            ? "Too poor man, pathetic"
            : "Enough money enjoy your life"}
        </span>
      </h2>
      <BudgetSummery />
    </div>
  );
}
