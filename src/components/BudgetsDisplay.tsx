import { useLocation, useNavigate } from "react-router-dom";
import { useBudgetStore } from "../states/Budget";

export default function BudgetDisplay() {
  const location = useLocation();
  const navigate = useNavigate();
  const budgetState = useBudgetStore();

  function handleEdit(budgetID: string) {
    navigate(`/budget/${budgetID}`);
  }

  if (location.pathname.includes("/budget")) return null;
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
            <th>Action</th>
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
              <td>
                <button onClick={() => handleEdit(elem.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
