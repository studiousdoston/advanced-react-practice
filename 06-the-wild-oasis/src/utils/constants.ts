import { SortOption } from "../libs/common.type";

export const sortOptions: SortOption[] = [
  { value: "name-asc", label: "Sort by name (A-Z)" },
  { value: "name-desc", label: "Sort by name (Z-A)" },

  { value: "regularPrice-asc", label: "Sort by price (low to high)" },
  { value: "regularPrice-desc", label: "Sort by price (high to low)" },

  { value: "maxCapacity-asc", label: "Sort by capacity (low to high)" },
  { value: "maxCapacity-desc", label: "Sort by capacity (high to low)" },
];

export const filterOptions = [
  { value: "all", label: "All" },
  { value: "no-discount", label: "No Discount" },
  { value: "with-discount", label: "With Discount" },
];

export const filterBoookings = [
  { value: "all", label: "All" },
  { value: "checked-out", label: "Checked out" },
  { value: "checked-in", label: "Checked in" },
  { value: "unconfirmed", label: "Unconfirmed" },
];

export const sortBookings = [
  { value: "startDate-desc", label: "Sort by date (recent first)" },
  { value: "startDate-asc", label: "Sort by date (earlier first)" },
  {
    value: "totalPrice-desc",
    label: "Sort by amount (high first)",
  },
  { value: "totalPrice-asc", label: "Sort by amount (low first)" },
];

export const PAGE_SIZE = 6;
