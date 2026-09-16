import { useQuery } from "@tanstack/react-query";
import bookingsService from "../../services/Booking.service";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  //* FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //* SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //* PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => bookingsService.getBookings({ filter, sortBy, page }),
  });

  const { data: bookings, count } = data ?? {};

  return { isLoading, error, bookings, count };
}
