import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import settingsService from "../../services/Settings.service";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: settingsService.updateSetting,
    onSuccess() {
      {
        toast.success("Setting successfully edited");
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      }
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { updateSetting, isUpdating };
}
