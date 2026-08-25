import { createContext, useContext } from "react";
import type { City } from "../libs/common";

export type CitiesContextType = {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  getCity: (id: number) => void;
  createCity: (city: City) => void;
  deleteCity: (id: number) => void;
};

//* 1) CREATE CONTEXT
export const CitiesContext = createContext<CitiesContextType | undefined>(
  undefined,
);

//* 2) CUSTOM HOOK TO CONSUME CONTEXT
export function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("useCities must be used within a CitiesProvider");

  return context;
}
