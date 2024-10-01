import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signInUser: (state, action) => {
      const { email, password } = action.payload;
      if (state.user && state.user.email === email && state.user.password === password) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    signOutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { registerUser, signInUser, signOutUser } = authSlice.actions;
export default authSlice.reducer;
