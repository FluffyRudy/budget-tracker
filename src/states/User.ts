import { create } from "zustand";
import { User, Info } from "../types/user";

const UserState = create<User>()((set) => ({
  id: "",
  name: "",
  email: "",
  password: "",
  isAuthenticated: false,
  userData: [],
  set: (info: Info) => set(() => info),
  setAuthentication: (value: boolean) =>
    set((prevState) => ({ ...prevState, isAuthenticated: value })),
}));

export { UserState };
