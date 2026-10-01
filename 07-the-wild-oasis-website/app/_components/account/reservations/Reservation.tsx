import DateSelector from "../../cabins/DateSelector";
import ReservationForm from "../../cabins/ReservationForm";
import settingService from "@/app/_services/Setting.service";
import bookingService from "@/app/_services/Booking.service";
import { Cabin, T } from "@/app/_lib/types/common";
import { auth } from "@/app/_lib/auth";
import LoginMessage from "./LoginMessage";

export default async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    settingService.getSettings(),
    bookingService.getBookedDatesByCabinId(cabin.id!),
  ]);
  const session = await auth();
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[500px] ">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} session={session} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
