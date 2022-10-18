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

export const forgotPassword = (username: string) => {
  const request: ApiRequest = {
    method: ApiMethod.Post,
    url: `${BASE_URL}/api/forgot-password?username=${username}`,
  };
  return request;
};

export const validateToken = (token: string) => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/reset-password?token=${token}`,
  };
  return request;
};

export const resetUserPassword = (newPassword: string, token: string) => {
  const request: ApiRequest = {
    method: ApiMethod.Post,
    url: `${BASE_URL}/api/reset-password`,
    body: { newPassword, token },
  };
  return request;
};
