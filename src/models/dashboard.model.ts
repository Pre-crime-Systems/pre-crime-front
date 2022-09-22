export enum CrimeQuantityFilterType {
  HOURS = 'HOURS',
  DAYS = 'DAYS',
  MONTHS = 'MONTHS',
}

export interface CrimeQuantityFilter {
  label: string;
  value: CrimeQuantityFilterType;
}
