import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "../../services/Auth.service";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: authService.updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated! ");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) =>
      toast.error(
        err instanceof Error ? err.message : "Error updating user's account",
      ),
  });

  return { updateUser, isUpdating };
}
