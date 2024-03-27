import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import RouterProtector from "./routes/RouterProtector";
import Login from "./routes/authentication/Login";
import Register from "./routes/authentication/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouterProtector>
        <Dashboard />
      </RouterProtector>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
