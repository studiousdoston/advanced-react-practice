import styles from "../css/CityList.module.css";
import { City } from "../libs/common";
import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner";

type Props = {
  cities: City[];
  isLoading?: boolean;
};
export default function CityList(props: Props) {
  const { cities, isLoading } = props;
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
    
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
