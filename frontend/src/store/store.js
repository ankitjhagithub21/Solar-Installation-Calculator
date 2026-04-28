import { configureStore } from '@reduxjs/toolkit';
import locationSlice from './slices/locationSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    location: locationSlice,
    user:userSlice
  },
});

export default store;
