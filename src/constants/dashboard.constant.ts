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
    label: 'Enero 2022',
    value: '2022-1',
  },
  {
    label: 'Febrero 2022',
    value: '2022-2',
  },
  {
    label: 'Marzo 2022',
    value: '2022-3',
  },
  {
    label: 'Abril 2022',
    value: '2022-4',
  },
  {
    label: 'Mayo 2022',
    value: '2022-5',
  },
  {
    label: 'Junio 2022',
    value: '2022-6',
  },
  {
    label: 'Julio 2022',
    value: '2022-7',
  },
  {
    label: 'Agosto 2022',
    value: '2022-8',
  },
  {
    label: 'Septiembre 2022',
    value: '2022-9',
  },
  {
    label: 'Octubre 2022',
    value: '2022-10',
  },
];
