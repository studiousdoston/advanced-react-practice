import { useQuery } from "@tanstack/react-query";
import bookingsService from "../../services/Booking.service";

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: bookingsService.getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { isLoading, activities };
}
