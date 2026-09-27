import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import cabinService from "../../services/Cabin.service";
import { Cabin } from "../../libs/common.type";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: { newCabinData: Cabin; id: number }) =>
      cabinService.createEditCabin(newCabinData, id),
    onSuccess() {
      {
        toast.success("Cabin successfully edited");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      }
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { editCabin, isEditing };
}
