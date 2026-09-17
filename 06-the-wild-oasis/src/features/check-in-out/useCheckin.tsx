import { useMutation, useQueryClient } from "@tanstack/react-query";
import bookingsService from "../../services/Booking.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: (bookingId: string) =>
      bookingsService.updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ refetchType: "active" });
      navigate("/");
    },

    onError: () => toast.error("There was an error while checkin in."),
  });

  return { checkin, isCheckingIn };
}
