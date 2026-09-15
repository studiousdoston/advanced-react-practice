export interface T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type SortOption = {
  value: string;
  label: string;
};

export type SortOptions = SortOption[];
