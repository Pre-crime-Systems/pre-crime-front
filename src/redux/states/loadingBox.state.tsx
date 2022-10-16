import { createSlice } from '@reduxjs/toolkit';
import { ILoadingBox } from '../models/LoadingBox.model';

export const InitLoadingBox: ILoadingBox = {
  open: false,
  label: '',
  loading: false,
};

export const loadingBoxSlice = createSlice({
  name: 'loadingBox',
  initialState: InitLoadingBox,
  reducers: {
    setLoadingBox: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setLoadingBox } = loadingBoxSlice.actions;

export default loadingBoxSlice.reducer;
