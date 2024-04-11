import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataStorage } from "./ultils/DataStorage";
import Dashboard from "./routes/Dashboard";
import RouterProtector from "./routes/RouterProtector";
import Login from "./routes/authentication/Login";
import Register from "./routes/authentication/Register";
import ErrorPage from "./components/ErrorPage";
import { UserState } from "./states/User";
import Budget from "./routes/Budget";
import { useBudgetStore } from "./states/Budget";

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
      {
        path: "/budget/:budgetID",
        element: (
          <RouterProtector>
            <Budget />
          </RouterProtector>
        ),
      },
    ],
  },
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
  const { addBudgets } = useBudgetStore();
  const budgetState = useBudgetStore((state) => state);
  const userState = UserState();

  useEffect(() => {
    if (!userState.isAuthenticated) return;
    const currentUser = DataStorage.getCurrentUser();
    if (currentUser) {
      const userInfp = DataStorage.getUserData(currentUser);
      userInfp.then((res) => {
        if (res) {
          UserState.setState(res);
        } else {
          return;
        }
      });
      DataStorage.updateBudgetDataOnLoad(addBudgets);
    }

    const userBudgetData = DataStorage.getUserBudgetData();
    if (userBudgetData) {
      userBudgetData.map((budget) => {
        budgetState.addBudgets(budget);
      });
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
