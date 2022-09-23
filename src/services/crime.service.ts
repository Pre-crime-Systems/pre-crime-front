import { BASE_URL } from '../constants/api.constant';
import { ApiMethod, ApiRequest } from '../models/api.model';
import { DashboardTypeCrimeFilter } from '../models/dashboard.model';

// MAP
export const getCrimes = () => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/crimes`,
  };
  return request;
};

export const getPredictions = () => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/bigQuery/geo`,
  };
  return request;
};

export const getHistoricalCrimesByFilters = (filters: any) => {
  const request: ApiRequest = {
    method: ApiMethod.Post,
    url: `${BASE_URL}/api/crimes/filter`,
    body: {
      modalityCrimeId: filters?.modalityCrime?.value || null,
      subtypeCrimeId: filters?.subtypeCrime?.value || null,
      typeCrimeId: filters?.typeCrime?.value || null,
    },
  };
  return request;
};

// DASHBOARD
export const getCrimesByHours = () => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/crimes/hours`,
  };
  return request;
};

export const getCrimesByDays = () => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/crimes/days`,
  };
  return request;
};

export const getCrimesByMonths = () => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/crimes/months`,
  };
  return request;
};

export const getTypesCrimeInfoByPeriod = (
  filterSelected: DashboardTypeCrimeFilter
) => {
  const date = filterSelected?.value.split('-');
  const request: ApiRequest = {
    method: ApiMethod.Post,
    url: `${BASE_URL}/api/crimes/types`,
    body: {
      year: date[0],
      month: date[1],
    },
  };
  return request;
};

// CRIMES
export const createCrime = (crime: any) => {
  const request: ApiRequest = {
    method: ApiMethod.Post,
    url: `${BASE_URL}/api/crimes`,
    body: {
      address: crime?.address,
      date: crime?.date,
    },
  };
  return request;
};
