import dayjs from 'dayjs';
import { BASE_URL } from '../constants/api.constant';
import { ApiMethod, ApiRequest } from '../models/api.model';

export const getReports = () => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/reports`,
  };
  return request;
};

export const getReportsWithPagination = (
  pageNumber: number = 0,
  endDate: string | null = null,
  initDate: string | null = null
) => {
  const pageSize = 10;
  const request: ApiRequest = {
    method: ApiMethod.Post,
    url: `${BASE_URL}/api/reports/page/${pageNumber}/size/${pageSize}`,
    body: {
      endDate: endDate ? dayjs(endDate).toISOString() : null,
      initDate: initDate ? dayjs(initDate).toISOString() : null,
    },
  };
  return request;
};

export const createReport = (report: any) => {
  const request: ApiRequest = {
    method: ApiMethod.Post,
    url: `${BASE_URL}/api/reports`,
    body: {
      fileData: report?.fileData,
      fileName: report?.fileName,
    },
  };
  return request;
};
