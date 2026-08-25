import { Link } from "react-router-dom";
import styles from "../css/CityItem.module.css";
import { City } from "../libs/common";
import { useCities } from "../contexts/CitiesContext";

type Props = {
  city: City;
};
// eslint-disable-next-line react-refresh/only-export-components
export const formatDate = (date: string | null) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date!));

export default function CityItem({ city }: Props) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  //* HANDLERS
  const handleDelete = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    deleteCity(id!);
  };
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${id === currentCity?.id ? styles["cityItem--active"] : ""}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}
