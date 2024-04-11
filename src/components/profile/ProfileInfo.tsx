import { Form } from "react-router-dom";
import { UserState } from "../../states/User";

export default function ProfileInfo() {
  const userState = UserState();
  return (
    <div className='flex flex-col absolute w-[150px] right-[-100%] z-10'>
      <button className='rounded-none'>Profile</button>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          userState.reset();
        }}
        action='/login'>
        <button className='w-full rounded-none'>Logout</button>
      </Form>
      <button className='rounded-none'>Settings</button>
    </div>
  );
}
