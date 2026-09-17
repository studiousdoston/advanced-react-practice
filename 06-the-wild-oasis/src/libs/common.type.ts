export interface T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type SortOption = {
  value: string;
  label: string;
};

export type SortOptions = SortOption[];

export type Cabin = {
  created_at?: string;
  description: string;
  discount: number;
  maxCapacity: number;
  id?: number;
  image: string;
  name: string;
  regularPrice: number;
};

export interface Guest {
  id: number;
  fullName: string;
  email: string;
  nationality: string;
  countryFlag: string;
  nationalID: string;
  created_at: string;
}

export type Booking = {
  id: string;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: string;
  guests: { fullName: string; email: string };
  cabins: { name: string };
};

export interface BookingFull {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
  cabins?: Cabin;
  guests?: Guest;
}
