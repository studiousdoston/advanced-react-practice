import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import { filterOptions, sortOptions } from "../../libs/utils";
export default function CabinTableOperations() {
  return (
    <TableOperations>

      <Filter filterField={"discount"} options={filterOptions} />
      <SortBy options={sortOptions} />
      
    </TableOperations>
  );
}
