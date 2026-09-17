import { useQuery } from "@tanstack/react-query";
import bookingsService from "../../services/Booking.service";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking"],
    queryFn: () => bookingsService.getBooking(bookingId!),
    retry: false,
  });
  return { isLoading, booking };
}
