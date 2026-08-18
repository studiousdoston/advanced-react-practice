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
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data as City);
    } catch (err) {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCity = async (newCity: City) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (err) {
      alert("There was an error creating city!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity: currentCity as City,
        getCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
