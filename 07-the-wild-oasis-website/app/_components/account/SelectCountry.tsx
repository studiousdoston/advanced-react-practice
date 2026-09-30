import { T } from "@/app/_lib/types/common";
import guestsService from "@/app/_services/Guests.service";

type Props = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
};

async function SelectCountry({ defaultCountry, name, id, className }: Props) {
  const countries = await guestsService.getCountries();
  console.log(countries);
  const flag =
    (await countries.find((country: T) => country.name === defaultCountry)
      ?.flag) ?? "";

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c: T) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
