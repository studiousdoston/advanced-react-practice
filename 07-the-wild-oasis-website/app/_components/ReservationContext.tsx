"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

//* CREATE
const ReservationContext = createContext<{
  range: DateRange | undefined;
  setRange: Dispatch<SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
}>({
  range: undefined,
  setRange: () => undefined,
  resetRange: () => undefined,
});

//* PROVIDE
function ReservationProvider({ children }: { children: ReactNode }) {
  const initialState = { from: undefined, to: undefined };
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

//* USE
function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");

  return context;
}

export { ReservationProvider, useReservation };
