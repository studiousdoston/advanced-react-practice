import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import cabinService from "../../services/Cabin.service";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: cabinService.deleteCabin,
    onSuccess: () => {
      toast.success("Cabin successfully deleted!");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "error"),
  });

  return { isDeleting, deleteCabin };
}
