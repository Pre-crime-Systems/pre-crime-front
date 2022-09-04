import { BASE_URL } from '../constants/api.constant';
import { ApiMethod, ApiRequest } from '../models/api.model';

interface LoginRequest {
  email: string;
  password: string;
}

export const login = ({ email, password }: LoginRequest) => {
  const request: ApiRequest = {
    method: ApiMethod.Get, //change to Post
    url: `${BASE_URL}/character`,
    //add body
  };
  console.log('body', { email, password });
  return request;
};
