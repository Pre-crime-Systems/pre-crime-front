interface ILoadingBoxResponse {
  success: boolean;
  error: boolean;
}

export interface ILoadingBox {
  open: boolean;
  label: string;
  loading: boolean;
  response?: ILoadingBoxResponse;
}
