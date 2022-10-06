import { BASE_URL } from '../constants/api.constant';
import { ApiMethod, ApiRequest } from '../models/api.model';

export const getReports = () => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/reports`,
  };
  return request;
};

export const getReportsWithPagination = (pageNumber: number = 0) => {
  const pageSize = 10;
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/reports/page/${pageNumber}/size/${pageSize}`,
  };
  return request;
};
