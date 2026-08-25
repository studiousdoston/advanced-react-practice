import { ReactNode, useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [navigate, isAuthenticated]);

  return isAuthenticated ? children : null;
}
