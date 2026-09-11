import { useQuery } from "@tanstack/react-query";
import cabinService from "../../services/Cabin.service";

export function useGetCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: cabinService.getCabins,
  });
  return { isLoading, cabins };
}
