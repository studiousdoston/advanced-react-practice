import { Country } from "@/app/_lib/types/common";
import guestsService from "@/app/_services/Guests.service";

type Props = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
};

async function SelectCountry({ defaultCountry, name, id, className }: Props) {
  const countries = await guestsService.getCountries();
  console.log(`\n\n`, countries.length);
  const flag =
    (await countries.find(
      (country: Country) => country.names.common === defaultCountry,
    )?.flag.emoji) ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
      key={Math.random()}
    >
      <option value="">Select country...</option>
      {countries.map((country: Country) => (
        <option
          key={country.names.common}
          value={`${country.names.common}%${country.flag}`}
        >
          {country.names.common}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
