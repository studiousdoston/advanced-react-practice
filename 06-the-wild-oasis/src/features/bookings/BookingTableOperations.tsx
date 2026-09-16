import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { filterBoookings, sortBookings } from "../../libs/utils";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="status" options={filterBoookings} />

      <SortBy options={sortBookings} />
    </TableOperations>
  );
}

export default BookingTableOperations;
