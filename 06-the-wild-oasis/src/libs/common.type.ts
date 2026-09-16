export interface T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type SortOption = {
  value: string;
  label: string;
};

export type SortOptions = SortOption[];

export type CabinData = {
  created_at?: string;
  description: string;
  discount: number;
  maxCapacity: number;
  id?: number;
  image: string;
  name: string;
  regularPrice: number;
};

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
