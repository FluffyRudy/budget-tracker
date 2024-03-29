import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { DataStorage } from "./ultils/DataStorage";
import Dashboard from "./routes/Dashboard";
import RouterProtector from "./routes/RouterProtector";
import Login from "./routes/authentication/Login";
import Register from "./routes/authentication/Register";
import ErrorPage from "./components/ErrorPage";
import { UserState } from "./states/User";
import Budget from "./routes/Budget";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouterProtector>
        <Dashboard />
      </RouterProtector>
    ),
    children: [
      {
        path: "/budget",
        element: (
          <RouterProtector>
            <Budget />
          </RouterProtector>
        ),
      },
    ],
  },
  // {
  //   path: "/budget",
  //   element: (
  //     <RouterProtector>
  //       <Budget />
  //     </RouterProtector>
  //   ),
  // },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  useEffect(() => {
    const currentUser = DataStorage.getCurrentUser();
    if (currentUser) {
      UserState.setState(currentUser);
    }
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
