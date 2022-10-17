import { createSlice } from '@reduxjs/toolkit';
import { ILoadingBox } from '../models/LoadingBox.model';

export const InitLoadingBox: ILoadingBox = {
  module: null,
  call: false,
  open: false,
  label: '',
  loading: false,
  endpoint: null,
};

export const loadingBoxSlice = createSlice({
  name: 'loadingBox',
  initialState: InitLoadingBox,
  reducers: {
    setLoadingBox: (state, action) => ({ ...state, ...action.payload }),
    resetLoadingBox: () => InitLoadingBox,
  },
});

export const { setLoadingBox, resetLoadingBox } = loadingBoxSlice.actions;

export default loadingBoxSlice.reducer;
