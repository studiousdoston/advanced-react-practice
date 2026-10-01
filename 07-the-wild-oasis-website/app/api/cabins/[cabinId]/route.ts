import { T } from "@/app/_lib/types/common";
import bookingService from "@/app/_services/Booking.service";
import cabinService from "@/app/_services/Cabin.service";

export async function GET(request: Request, { params }: T) {
  const { cabinId } = params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      cabinService.getCabin(cabinId),
      bookingService.getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (err) {
    return Response.json({ message: "Cabin not found" });
  }
}
