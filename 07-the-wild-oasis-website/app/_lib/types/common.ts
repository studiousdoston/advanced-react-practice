export interface T {
  [key: string]: any;
}

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
  cabins: { name: string; image: string };
};
