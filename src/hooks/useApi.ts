import { useState } from 'react';
import { ApiMethod, ApiRequest, ApiResponse } from '../models/api.model';
import * as localStorage from '../utils/localStorage.util';

export const useApi = (): [
  { data: any; error: boolean },
  (request: ApiRequest) => void
] => {
  const initResponse: ApiResponse = { data: null, error: false };
  const [response, setResponse] = useState<ApiResponse>(initResponse);

  const callEndpoint = async ({ method, url, body }: ApiRequest) => {
    setResponse(initResponse);
    try {
      const token = localStorage.getToken();
      const request: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      if (method === ApiMethod.Post) {
        request.body = JSON.stringify(body);
      }

      const fetchResponse = await fetch(url, request);
      const fetchJson = await fetchResponse.json();
      setResponse({ data: fetchJson, error: false });
    } catch (error) {
      console.error(error);
      setResponse({ data: null, error: true });
    }
  };

  return [response, callEndpoint];
};
