import {
  DashboardCrimeQuantityFilter,
  DashboardCrimeQuantityFilterType,
  DashboardTypeCrimeFilter,
} from '../models/dashboard.model';

export const crimeQuantityFilterOptions: DashboardCrimeQuantityFilter[] = [
  {
    label: 'De hoy',
    value: DashboardCrimeQuantityFilterType.HOURS,
  },
  {
    label: 'Del mes',
    value: DashboardCrimeQuantityFilterType.DAYS,
  },
  {
    label: 'Del año',
    value: DashboardCrimeQuantityFilterType.MONTHS,
  },
];

export const typesCrimeFilterOptions: DashboardTypeCrimeFilter[] = [
  {
    label: 'Septiembre 2022',
    value: '2022-9',
  },
  {
    label: 'Octubre 2022',
    value: '2022-10',
  },
];
