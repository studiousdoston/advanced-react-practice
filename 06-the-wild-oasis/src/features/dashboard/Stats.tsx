import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { T } from "../../libs/common.type";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookings,
  confirmedStays,
  cabinCount,
  numDays,
}: T) {
  // 1.
  const numBookings = bookings.length;
  // 2.
  const sales = bookings.reduce(
    (acc: number, cur: T) => acc + cur.totalPrice,
    0,
  );
  // 3.
  const checkins = confirmedStays.length;
  // 4.
  const occupation = confirmedStays.reduce(
    (acc: number, cur: T) => acc + cur.numNights,
    0,
  );

  const occupancyRate = `${Math.round((occupation / (numDays * cabinCount)) * 100)}%`;
  return (
    <>
      <Stat
        title={"Bookings"}
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title={"Sales"}
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"Check ins"}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title={"Occupancy rate"}
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupancyRate}
      />
    </>
  );
}
