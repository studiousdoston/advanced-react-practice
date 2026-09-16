import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { filterBoookings, sortBookings } from "../../utils/constants";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="status" options={filterBoookings} />
      <SortBy options={sortBookings} />
    </TableOperations>
  );
}

export default BookingTableOperations;
