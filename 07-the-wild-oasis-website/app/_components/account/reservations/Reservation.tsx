import DateSelector from "../../cabins/DateSelector";
import ReservationForm from "../../cabins/ReservationForm";
import settingService from "@/app/_services/Setting.service";
import bookingService from "@/app/_services/Booking.service";
import { Cabin, T } from "@/app/_lib/types/common";

export default async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    settingService.getSettings(),
    bookingService.getBookedDatesByCabinId(cabin.id!),
  ]);
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[500px] ">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}
