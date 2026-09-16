import { useQuery } from "@tanstack/react-query";
import bookingsService from "../../services/Booking.service";

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: bookingsService.getBookings,
  });

  return { isLoading, error, bookings };
}
