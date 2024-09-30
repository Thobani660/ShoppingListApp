// src/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, // To store user information
        isLoggedIn: false, // To track login status
        error: null, // To store error messages
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload; // Set user info
            state.isLoggedIn = true; // User is logged in
            state.error = null; // Clear any previous error
        },
        logout: (state) => {
            state.user = null; // Clear user info
            state.isLoggedIn = false; // User is logged out
            state.error = null; // Clear any previous error
        },
        setError: (state, action) => {
            state.error = action.payload; // Set an error message
        },
    },
});

export const { login, logout, setError } = authSlice.actions;
export default authSlice.reducer;
