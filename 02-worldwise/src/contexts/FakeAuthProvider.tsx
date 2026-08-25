import { ReactNode, useReducer } from "react";
import { AuthContext } from "./FakeAuthContext";
import { User } from "../libs/common";

const FAKE_USER: User = {
  name: "Deen",
  email: "jack@example.com",
  password: "deen_03",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

type State = {
  user: User | null;
  isAuthenticated: boolean;
};
type Action = { type: "login"; payload: User } | { type: "logout" };

type AuthProviderProps = {
  children: ReactNode;
};

//*-------------- INITIAL_STATE ----------------------
const initialState: State = {
  user: FAKE_USER,
  isAuthenticated: false,
};

//*-------------- REDUCER ----------------------
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("Unknown action");
  }
}

//* 3) PROVIDER COMPONENT
export function AuthProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const login = (email: string, password: string) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  };
  const logout = () => dispatch({ type: "logout" });
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
