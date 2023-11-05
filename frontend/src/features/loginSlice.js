// src/features/loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLogin } = loginSlice.actions;

export default loginSlice.reducer;