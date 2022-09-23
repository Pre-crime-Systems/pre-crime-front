import { BASE_URL } from '../constants/api.constant';
import { ApiMethod, ApiRequest } from '../models/api.model';

interface CreateUserRequest {
  username: string;
  password: string;
  role: string;
}

export const createUser = ({ username, password, role }: CreateUserRequest) => {
  const request: ApiRequest = {
    method: ApiMethod.Post,
    url: `${BASE_URL}/api/register`,
    body: { username, password, role },
  };
  return request;
};
