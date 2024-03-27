import React from "react";
import { UserState } from "../states/User";
import Login from "./authentication/Login";

export default function ({ children }: { children: React.JSX.Element }) {
  const userState = UserState();
  if (!userState.isAuthenticated) {
    return <Login />;
  }
  return <div>{children}</div>;
}
