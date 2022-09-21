import { BASE_URL } from '../constants/api.constant';
import { ApiMethod, ApiRequest } from '../models/api.model';

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
