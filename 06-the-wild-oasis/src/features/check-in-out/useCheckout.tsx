import { useMutation, useQueryClient } from "@tanstack/react-query";
import bookingsService from "../../services/Booking.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: string) =>
      bookingsService.updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ refetchType: "active" });
      navigate("/bookings");
    },

    onError: () => toast.error("There was an error while checkin out."),
  });

  return { checkout, isCheckingOut };
}
