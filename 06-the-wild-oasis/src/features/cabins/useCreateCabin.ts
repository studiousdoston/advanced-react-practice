import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import cabinService from "../../services/Cabin.service";
import { CabinData } from "./CabinTable";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (data: CabinData) =>
      cabinService.createEditCabin(data, undefined as unknown as number),
    onSuccess() {
      {
        toast.success("New cabin successfully created");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      }
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}

/**
 * (data: CabinData) =>
      cabinService.createEditCabin(data, editId as number),
 */
