import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiMethod, ApiRequest, ApiResponse } from '../models/api.model';
import { RoutePaths } from '../routes/routePaths';
import * as localStorage from '../utils/localStorage.util';

export const useApi = (): [
  { data: any; error: boolean },
  (request: ApiRequest) => void
] => {
  const initResponse: ApiResponse = { data: null, error: false };
  const [response, setResponse] = useState<ApiResponse>(initResponse);
  const navigate = useNavigate();

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
      if (fetchJson?.error) {
        console.error('[ERROR API]', fetchJson?.error);
        navigate(RoutePaths.Login);
      } else {
        setResponse({ data: fetchJson, error: false });
      }
    } catch (error) {
      console.error(error);
      setResponse({ data: null, error: true });
    }
  };

  return [response, callEndpoint];
};
