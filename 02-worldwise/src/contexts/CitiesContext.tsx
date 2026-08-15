import { createContext, useContext } from "react";
import type { City as CityType } from "../libs/common";

export type CitiesContextType = {
  cities: CityType[];
  isLoading: boolean;
};

//* 1) CREATE THE CONTEXT
export const CitiesContext = createContext<CitiesContextType | undefined>(
  undefined,
);

//* 3) CREATE HOOK TO USE THE CONTEXT VALUE
export function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("useCities must be used within a CitiesProvider");

  return context;
}
