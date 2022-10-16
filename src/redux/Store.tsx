import { configureStore } from '@reduxjs/toolkit';
import { loadingBoxSlice } from './states';

export interface AppStore {
  loadingBox: any;
}

export default configureStore({
  reducer: {
    loadingBox: loadingBoxSlice.reducer,
  },
});
