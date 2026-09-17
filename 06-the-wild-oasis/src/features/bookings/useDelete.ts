import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import bookingsService from "../../services/Booking.service";
import { useNavigate } from "react-router-dom";

export function useDelete() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: (bookingId: string) => bookingsService.deleteBooking(bookingId),

    onSuccess: (_, bookingId) => {
      toast.success(`Deleted #${bookingId} successfully!`);
      queryClient.invalidateQueries({ refetchType: "active" });
      navigate("/bookings");
    },

    onError: () => toast.error("There was an error while deleting."),
  });
  return { deleteBooking, isDeleting };
}
