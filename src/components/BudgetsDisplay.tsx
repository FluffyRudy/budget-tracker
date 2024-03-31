import { useLocation, useNavigate } from "react-router-dom";
import { useBudgetStore } from "../states/Budget";
import { DataStorage } from "../ultils/DataStorage";

export default function BudgetDisplay() {
  const location = useLocation();
  const navigate = useNavigate();
  const budgetState = useBudgetStore();

  function handleEdit(budgetID: string) {
    navigate(`/budget/${budgetID}`);
  }

  function handleDelete(budgetID: string) {
    budgetState.removeBudget(budgetID);
    DataStorage.deleteBudgetData(budgetID);
  }

  if (location.pathname.includes("/budget")) return null;
  return (
    <div className='mt-5'>
      <table className='border-collapse w-[min(800px,100vw)] m-auto font-mono text-[min(1.2em,2vmin)]'>
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
        <tbody className='font-semibold'>
          {budgetState.budgets.map((elem) => (
            <tr key={elem.id}>
              <td>{elem.name}</td>
              <td>{elem.date}</td>
              <td>{elem.type}</td>
              <td>{elem.occurance}</td>
              <td>{elem.amount}</td>
              <td>
                <button
                  title='edit'
                  className='bg-blue-500'
                  onClick={() => handleEdit(elem.id)}>
                  ✏️
                </button>
                <button
                  title='delete'
                  className=' bg-red-500 text-white inline-block ml-1'
                  onClick={() => handleDelete(elem.id)}>
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
