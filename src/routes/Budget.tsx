import { Form } from "react-router-dom";
import { useBudgetStore } from "../states/Budget";
import { useEffect, useState } from "react";
import { Budget } from "../types/budget";
import { HashContent } from "../ultils/hashlib";
import { DataStorage } from "../ultils/DataStorage";

export default function BudgetMaker() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState<string>("");
  const [BType, setBType] = useState("");
  const [recurring, setRecurring] = useState("");
  const budgetState = useBudgetStore((state) => state);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const hashedId = await HashContent(name);
    if (budgetState.allBudgetsId.includes(hashedId)) return;

    const budget: Budget = {
      name: name,
      amount: amount,
      date: date,
      type: BType,
      recurring: recurring,
      id: await HashContent(name),
    };
    budgetState.addBudgetId(hashedId);
    budgetState.addBudget(budget);
    DataStorage.addUserBudgetData(budget);
  }

  return (
    <div className='mt-8'>
      <section>
        <h1 className='text-center font-mono'>Add</h1>
        <Form
          onSubmit={handleSubmit}
          className='mx-auto flex flex-col items-center w-[min(500px,100vw)]'>
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
              onChange={(e) => setAmount(Number(e.target.value))}
              className='login-input-button'
              id='budget-amount'
              type='number'
              value={amount}
              required
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
              required
            />
          </label>
          <div>
            <label htmlFor='budget-type'>Type</label> <br />
            <select
              onChange={(e) => setBType(e.target.value)}
              onFocus={() => setBType(" ")}
              className='login-input-button'
              name='budget-type'
              id='budget-type'
              required>
              <option hidden={BType !== ""}>Select</option>
              <option value='income'>Income</option>
              <option value='expense'>Expenses</option>
            </select>
          </div>
          <div>
            <label htmlFor='occurance-type'>Recurring:</label> <br />
            <select
              onChange={(e) => setRecurring(e.target.value)}
              onFocus={() => setRecurring(" ")}
              className='login-input-button'
              name='occurance-type'
              id='occurance-type'
              required>
              <option
                hidden={recurring !== ""}
                value={""}>
                Select
              </option>
              <option value='one-time'>One-time</option>
              <option value='recurring'>Recurring</option>
            </select>
          </div>
          <button>Add</button>
        </Form>
      </section>
    </div>
  );
}
