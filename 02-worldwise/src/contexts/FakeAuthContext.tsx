import { createContext, useContext } from "react";
import { User } from "../libs/common";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

//* 1) CREATE CONTEXT
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

//* 2) CUSTOM HOOK TO CONSUME CONTEXT
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider ");

  return context;
}
