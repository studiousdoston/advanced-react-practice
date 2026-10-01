"use client";
import { isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { useReservation } from "../ReservationContext";
import { Cabin, T } from "@/app/_lib/types/common";

function isAlreadyBooked(range: any, datesArr: Date[]) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date: Date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

const rangeStyles = {
  "--rdp-accent-color": "#f59e0b",
  "--rdp-range_middle-background-color": "rgb(245 158 11 / 0.25)",
  "--rdp-range_middle-color": "#ffffff",
} as React.CSSProperties;

function DateSelector({ settings, cabin, bookedDates }: T) {
  // CHANGE
  const numNights = 23;
  const cabinPrice = 23;
  const { discount, regularPrice } = cabin as Cabin;
  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  // console.log(minBookingLength, maxBookingLength);

  const { range, setRange, resetRange } = useReservation();
  console.log(range);

  return (
    <div className="flex flex-col justify-between h-full">
      <DayPicker
        className="py-12 px-12 place-self-center border-amber-500"
        style={rangeStyles}
        mode="range"
        selected={range}
        onSelect={setRange}
        min={1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11, 31)}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex  items-center justify-between px-8 bg-accent-500 text-primary-800  h-[80px] ">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange(undefined)}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
