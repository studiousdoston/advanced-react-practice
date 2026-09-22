import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "../../services/Auth.service";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("login", { replace: true });
    },
  });

  return { logout, isPending };
}
