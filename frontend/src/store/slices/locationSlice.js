import { createSlice } from '@reduxjs/toolkit';

const locations = [
  {
    address: "2850 N Church St, Provo, UT 84604, USA",
    lat: 40.269695,
    lng: -111.713158
  },
  {
    address: "Liberty Island, New York, NY 10004, USA",
    lat: 40.6892,
    lng: -74.0445
  },
  {
    address: "14 Grange Road, London, N6 4DG, United Kingdom",
    lat: 51.576525,
    lng: -0.153765
  },
  {
    address: "70b Rue des Violettes, 68400 Riedisheim, France",
    lat: 47.7479,
    lng: 7.3592
  },
  {
    address: "16 Rue Alfred de Vigny, 16000 Angoulême, France",
    lat: 45.6484,
    lng: 0.1562
  }
];

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    locations: locations,
    selectedLocation: null,
    isLoading: false,
    error: null
  },
  reducers: {
    selectLocation: (state, action) => {
      state.selectedLocation = action.payload;
      state.error = null;
    },
    clearSelectedLocation: (state) => {
      state.selectedLocation = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  selectLocation,
  clearSelectedLocation,
  setLoading,
  setError,
  clearError
} = locationSlice.actions;

export default locationSlice.reducer;
