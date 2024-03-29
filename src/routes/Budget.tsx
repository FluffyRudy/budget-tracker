import { Form } from "react-router-dom";
export default function Budget() {
  return (
    <div className='flex flex-col'>
      <section className='mt-[5vmax]'>
        <h2 className='text-center text-2xl text-white mb-[2vmax]'>Add</h2>
        <Form
          onSubmit={() => alert("dattebayo")}
          className='w-[min(500px,98vw)] m-auto flex flex-col gap-[1vh] items-center justify-between'>
          <label htmlFor='budget-name'>
            Name: <br />
            <input
              id='budget-name'
              type='text'
              className='login-input-button'
              required
            />
          </label>
          <label htmlFor='budget-amount'>
            Amount: <br />
            <input
              id='budget-amount'
              type='number'
              className='login-input-button'
              required
            />
          </label>
          <label htmlFor='date'>
            Date: <br />
            <input
              id='date'
              type='date'
              className='login-input-button'
              required
            />
          </label>
          <select
            className='w-[80%] py-4 text-2xl'
            name='budget-type'
            id='budget-type'
            required>
            <option
              defaultValue=''
              disabled>
              Select
            </option>
            <option value='income'>Income</option>
            <option value='expense'>Expenses</option>
          </select>
          <select
            className='w-[80%] py-4 text-2xl'
            name='occurance-type'
            id='occurance-type'
            required>
            <option
              value=''
              disabled>
              Select
            </option>
            <option value='one-time'>One-time</option>
            <option value='recurring'>Recurring</option>
          </select>
          <button
            type='submit'
            className='login-input-button'>
            Add
          </button>
        </Form>
      </section>
    </div>
  );
}
