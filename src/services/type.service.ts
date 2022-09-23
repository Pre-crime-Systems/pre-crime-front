import { BASE_URL } from '../constants/api.constant';
import { ApiMethod, ApiRequest } from '../models/api.model';

export const getTypes = () => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/types`,
  };
  return request;
};

export const getSubtypes = (typeId: number) => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/types/${typeId}/subtypes`,
  };
  return request;
};

export const getModalities = (subtypeId: number) => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/subtypes/${subtypeId}/modalities`,
  };
  return request;
};
