export enum ApiMethod {
  Get = 'GET',
  Post = 'POST',
}

export interface ApiRequest {
  body?: any;
  method: ApiMethod;
  url: string;
}

export interface ApiResponse {
  data: any;
  error: boolean;
}
