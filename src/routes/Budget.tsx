import { useParams } from "react-router-dom";
import BudgetForm from "../components/BudgetForm";

export default function BudgetAdder() {
  const { budgetID } = useParams();
  return (
    <div className='mt-8'>
      <section>
        <h1 className='text-center font-mono'>{budgetID ? "Update" : "Add"}</h1>
        <BudgetForm status={budgetID ? "Update" : undefined} />
      </section>
    </div>
  );
}
