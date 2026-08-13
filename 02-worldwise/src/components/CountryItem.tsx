import styles from "../css/CountryItem.module.css";
import { Country } from "../libs/common";
type Props = {
  country: Country;
};

function CountryItem({ country }: Props) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
