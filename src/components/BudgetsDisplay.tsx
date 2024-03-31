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
    <div className='mt-[10vh]'>
      <table className='w-[min(1000px,100vw)] m-auto font-mono text-[min(1.5em,2vmax)]'>
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
              <td className='flex justify-center items-center h-[80px] gap-1 p-0 box-border'>
                <button
                  title='edit'
                  className='max-h-[max-content] p-0 bg-blue-500 w-[30px]'
                  onClick={() => handleEdit(elem.id)}>
                  ✏️
                </button>
                <button
                  title='delete'
                  className='max-h-[max-content] p-0 bg-red-500 w-[30px]'
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
