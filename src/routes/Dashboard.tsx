import { Form } from "react-router-dom";
import { UserState } from "../states/User";
import { DataStorage } from "../ultils/DataStorage";

export default function Dashboard() {
  const userState = UserState();
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <Form
          onSubmit={() => {
            userState.reset();
            DataStorage.clearCurrentUser();
          }}
          action='/login'>
          <button>Logout</button>
        </Form>
      </div>
    </div>
  );
}
