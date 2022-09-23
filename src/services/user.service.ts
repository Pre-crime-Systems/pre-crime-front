import { BASE_URL } from '../constants/api.constant';
import { ApiMethod, ApiRequest } from '../models/api.model';

interface CreateUserRequest {
  email: string;
  password: string;
  username: string;
  role: string;
}

export const createUser = ({
  email,
  password,
  username,
  role,
}: CreateUserRequest) => {
  const request: ApiRequest = {
    method: ApiMethod.Post,
    url: `${BASE_URL}/api/register`,
    body: { email, password, username, role },
  };
  return request;
};
