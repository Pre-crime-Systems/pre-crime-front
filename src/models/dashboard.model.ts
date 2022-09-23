export enum DashboardCrimeQuantityFilterType {
  HOURS = 'HOURS',
  DAYS = 'DAYS',
  MONTHS = 'MONTHS',
}

export interface DashboardCrimeQuantityFilter {
  label: string;
  value: DashboardCrimeQuantityFilterType;
}

export interface DashboardTypeCrimeFilter {
  label: string;
  value: string;
}
