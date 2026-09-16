import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

type GetBookings = {
  filter?: { field: string; value: string } | null;
  sortBy?: { field: string; direction: string };
  page?: number;
};

class BookingsService {
  //* -----------  GET_BOOKINGS  ----------- *\\
  async getBookings({ filter, sortBy, page }: GetBookings) {
    let query = supabase
      .from("bookings")
      .select(
        "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
        { count: "exact" },
      );

    //* FILTER
    if (filter) query = query.eq(filter!.field, filter!.value);

    //* SORT
    if (sortBy)
      query = query.order(sortBy.field, {
        ascending: sortBy.direction === "asc",
      });

    //* PAGINATION
    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;
    if (error) {
      console.error(error);
      throw new Error("Bookings could not be loaded");
    }

    return { data, count };
  }

  //* -----------  GET_BOOKING  ----------- *\\
  async getBooking(id: string) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, cabins(*), guests(*)")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      throw new Error("Booking not found");
    }

    return data;
  }

  // Returns all BOOKINGS created after the given date
  async getBookingsAfterDate(date: Date) {
    const { data, error } = await supabase
      .from("bookings")
      .select("created_at, totalPrice, extrasPrice")
      .gte("created_at", date)
      .lte("created_at", getToday({ end: true }));

    if (error) {
      console.error(error);
      throw new Error("Bookings could not get loaded");
    }

    return data;
  }

  // Returns all STAYS created after the given date
  async getStaysAfterDate(date: Date) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, guests(fullName)")
      .gte("startDate", date)
      .lte("startDate", getToday());

    if (error) {
      console.error(error);
      throw new Error("Bookings could not get loaded");
    }

    return data;
  }

  // Activity means there is a check-in or check-out today
  async getStaysTodayActivity() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, guests(fullName, nationality, countryFlag)")
      .or(
        `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
      )
      .order("created_at");

    if (error) {
      console.error(error);
      throw new Error("Bookings could not get loaded");
    }
    return data;
  }

  async updateBooking(id: string, obj: object) {
    const { data, error } = await supabase
      .from("bookings")
      .update(obj)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error("Booking could not be updated");
    }
    return data;
  }

  async deleteBooking(id: string) {
    const { data, error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      throw new Error("Booking could not be deleted");
    }
    return data;
  }
}

const bookingsService = new BookingsService();
export default bookingsService;
