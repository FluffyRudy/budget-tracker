import { create } from "zustand";
import { User, Info } from "../types/user";

const initialData = {
  id: "",
  name: "",
  email: "",
  password: "",
  isAuthenticated: false,
  userData: [],
  isCurrentUser: false,
};

const UserState = create<User>()((set) => ({
  ...initialData,

  set: (info: Info) => set(() => info),

  setAuthentication: (value: boolean) =>
    set((prevState) => ({
      ...prevState,
      isAuthenticated: value,
      isCurrentUser: value,
    })),

  reset: () => set(() => ({ ...initialData })),
}));

export { UserState };
