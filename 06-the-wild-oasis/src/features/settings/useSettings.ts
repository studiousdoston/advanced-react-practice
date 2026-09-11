import { useQuery } from "@tanstack/react-query";
import settingsService from "../../services/Settings.service";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: settingsService.getSettings,
  });
  return { isLoading, error, settings };
}
