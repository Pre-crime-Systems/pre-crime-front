import {
  CrimeQuantityFilter,
  CrimeQuantityFilterType,
} from '../models/dashboard.model';

export const crimeQuantityFilterOptions: CrimeQuantityFilter[] = [
  {
    label: 'De hoy',
    value: CrimeQuantityFilterType.HOURS,
  },
  {
    label: 'Del mes',
    value: CrimeQuantityFilterType.DAYS,
  },
  {
    label: 'Del año',
    value: CrimeQuantityFilterType.MONTHS,
  },
];
