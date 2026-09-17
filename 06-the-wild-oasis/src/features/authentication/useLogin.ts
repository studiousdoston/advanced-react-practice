import { useMutation } from "@tanstack/react-query";
import authService from "../../services/Auth.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type Credentials = {
  email: string;
  password: string;
};
export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: ({ email, password }: Credentials) =>
      authService.login({ email, password }),

    onSuccess: () => {
      navigate("/dashboard", { replace: true });
    },

    onError: (err) => {
      console.log("ERROR", err);
      toast.error(" Provided email or password are incorrect");
    },
  });

  return { login, isLogging };
}
