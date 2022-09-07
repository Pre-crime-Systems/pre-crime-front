import { BASE_URL } from '../constants/api.constant';
import { ApiMethod, ApiRequest } from '../models/api.model';

interface LoginRequest {
  email: string;
  password: string;
}

export const login = ({ email, password }: LoginRequest) => {
  const request: ApiRequest = {
    method: ApiMethod.Post,
    url: `${BASE_URL}/api/authenticate`,
    body: { username: email, password },
  };
  return request;
};
