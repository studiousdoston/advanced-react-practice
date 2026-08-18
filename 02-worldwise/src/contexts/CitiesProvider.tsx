import { useCallback, useEffect, useState } from "react";
import { CitiesContext } from "./CitiesContext";
import { City, type City as CityType } from "../libs/common";

const BASE_URL = "http://localhost:3090";
type Props = {
  children: React.ReactNode;
};

//*  2) CREATE THE CONTEXT PROVIDER
export function CitiesProvider({ children }: Props) {
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState<City | undefined>(undefined);

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

  const getCity = useCallback(async function getCity(id: number) {
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data as City);
    } catch (err) {
      console.log("ERROR ->", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity: currentCity as City, getCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
