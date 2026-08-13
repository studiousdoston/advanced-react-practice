export interface City {
  cityName: string;
  country: string;
  date: string;
  emoji: string;
  notes: string;
  position: Position;
  id: number;
}

export interface Position {
  lat: string;
  lng: string;
}
