import { ApiMethod, ApiRequest } from '../models/api.model';

const BASE_URL = `https://rickandmortyapi.com/api`;

export const login = () => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/character`,
  };
  return request;
};
