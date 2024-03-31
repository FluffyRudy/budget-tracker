import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Budget } from "../types/budget";
import { HashContent } from "../ultils/hashlib";
import { DataStorage } from "../ultils/DataStorage";
import { useBudgetStore } from "../states/Budget";

type FormEvent = React.FormEvent<HTMLFormElement>;
export default function BudgetForm({
  budgetID,
}: {
  budgetID?: string | undefined;
}) {
  const budgerData = DataStorage.getBudgetDataByID(budgetID);
  const [name, setName] = useState(budgerData?.name ?? "");
  const [amount, setAmount] = useState<number>(budgerData?.amount ?? 0);
  const [date, setDate] = useState(budgerData?.date ?? "");
  const [bType, setBType] = useState(budgerData?.type ?? "income");
  const [occurance, setOccurance] = useState(
    budgerData?.occurance ?? "recurring"
  );
  const { addBudgets, updateBudget } = useBudgetStore();
  const navigate = useNavigate();

  async function handleBudgetAdd(e: FormEvent) {
    e.preventDefault();
    const budgetData: Budget = {
      id: await HashContent(name),
      name: name,
      amount: amount,
      date: date,
      type: bType,
      occurance: occurance,
    };
    DataStorage.addBudgetData(budgetData, addBudgets);
  }

  async function handleBudgetUpdate(e: FormEvent) {
    e.preventDefault();
    const updatedBudget: Budget = {
      id: await HashContent(name),
      name: name,
      amount: amount,
      date: date,
      type: bType,
      occurance: occurance,
    };
    updateBudget(budgetID!, updatedBudget);
    DataStorage.updateBudgetData(budgetID!, updatedBudget);
  }

  return (
    <Form
      onSubmit={(e) => {
        if (budgetID) handleBudgetUpdate(e);
        else handleBudgetAdd(e);
        navigate("/");
      }}
      className='w-[min(500px,98vw)] m-auto flex flex-col gap-[1vh] items-center justify-between'>
      <label htmlFor='budget-name'>
        Name: <br />
        <input
          onChange={(e) => setName(e.target.value)}
          className='login-input-button'
          id='budget-name'
          type='text'
          value={name}
          required
        />
      </label>
      <label htmlFor='budget-amount'>
        Amount: <br />
        <input
          className='login-input-button'
          id='budget-amount'
          type='number'
          value={amount}
          required
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </label>
      <label htmlFor='date'>
        Date: <br />
        <input
          onChange={(e) => setDate(e.target.value)}
          className='login-input-button'
          id='date'
          type='date'
          value={date}
        />
      </label>
      <select
        className='w-[80%] py-4 text-2xl'
        name='budget-type'
        id='budget-type'
        value={bType}
        onChange={(e) => setBType(e.target.value)}
        required>
        <option value='income'>Income</option>
        <option value='expense'>Expenses</option>
      </select>
      <select
        className='w-[80%] py-4 text-2xl'
        name='occurance-type'
        id='occurance-type'
        value={occurance}
        onChange={(e) => setOccurance(e.target.value)}
        required>
        <option value='one-time'>One-time</option>
        <option value='recurring'>Recurring</option>
      </select>
      <button className='login-input-button'>
        {budgetID ? "Update" : "Add"}
      </button>
    </Form>
  );
}
