import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    setUsers:(state, action) => {
     
      state.users = action.payload
    }
  },
 
});

export const { users, clearError, setCurrentUser, clearCurrentUser , setUsers} = userSlice.actions;
export default userSlice.reducer;
