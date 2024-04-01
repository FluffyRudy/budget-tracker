import { create } from "zustand";
import { User, Info } from "../types/user";

const initialData = {
  id: "",
  name: "",
  email: "",
  password: "",
  isAuthenticated: false,
  userData: [],
};

const UserState = create<User>()((set) => ({
  ...initialData,

  set: (info: Info) => set(() => info),

  setAuthentication: (value: boolean) =>
    set((prevState) => ({ ...prevState, isAuthenticated: value })),

  reset: () =>
    set((state) => ({ userData: state.userData, isAuthenticated: false })),
}));

export { UserState };
