import { useLocation } from "react-router-dom";
import { useBudgetStore } from "../states/Budget";

export default function BudgetDisplay() {
  const location = useLocation();
  const budgetState = useBudgetStore();

  if (location.pathname === "/budget") return null;
  return (
    <div className='mt-5'>
      <table className='w-[min(800px,100vw)] m-auto'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Type</th>
            <th>Recurring</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {budgetState.budgets.map((elem) => (
            <tr key={elem.id}>
              <td>{elem.name}</td>
              <td>{elem.date}</td>
              <td>{elem.type}</td>
              <td>{elem.occurance}</td>
              <td>{elem.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
