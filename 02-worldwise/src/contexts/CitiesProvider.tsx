import { useEffect, useState } from "react";
import { CitiesContext } from "./CitiesContext";
import type { City as CityType } from "../libs/common";

const BASE_URL = "http://localhost:3090";
type Props = {
  children: React.ReactNode;
};

//*  2) CREATE THE CONTEXT PROVIDER
export function CitiesProvider({ children }: Props) {
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.log("ERROR ->", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}
