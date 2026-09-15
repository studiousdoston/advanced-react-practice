import { useSearchParams } from "react-router-dom";
import { SortOptions, T } from "../libs/common.type";
import Select from "./Select";

type SortByProps = {
  options: SortOptions;
};
export default function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: T) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      type="white"
      onChange={handleChange as () => void}
    />
  );
}
