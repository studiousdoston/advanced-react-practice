import styles from "../css/CountryList.module.css";
import { City, Country } from "../libs/common";
import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";

type Props = {
  cities: City[];
  isLoading: boolean;
};

export default function CountriesList(props: Props) {
  const { cities, isLoading } = props;
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  const countries = cities.reduce((arr, city): Country[] => {
    if (!arr.map((el: Country) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
