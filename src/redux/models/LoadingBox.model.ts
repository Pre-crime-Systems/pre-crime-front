interface ILoadingBoxResponse {
  success?: boolean;
  error?: boolean;
}

type LoadingBoxModule = 'Reports';

export interface ILoadingBox {
  module: LoadingBoxModule | null;
  call: boolean;
  open: boolean;
  label: string;
  endpoint: any;
  loading: boolean;
  response?: ILoadingBoxResponse;
}
