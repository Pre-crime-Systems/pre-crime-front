import { BASE_URL } from '../constants/api.constant';
import { ApiMethod, ApiRequest } from '../models/api.model';

export const getDistricts = () => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/districts`,
  };
  return request;
};

export const getZonesByDistrict = (districtId: number) => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/districts/${districtId}/zones`,
  };
  return request;
};

export const getPoliceStationByDistrict = (districtId: number) => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/districts/${districtId}/police-stations`,
  };
  return request;
};
