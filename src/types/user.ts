export interface Info {
  id: string;
  name: string;
  email: string;
  password: string;
  isAuthenticated: boolean;
  userData: Array<Record<string, string>>;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface User extends Info {
  set: (info: Info) => void;
  setAuthentication: (value: boolean) => void;
  reset: () => void;
}
