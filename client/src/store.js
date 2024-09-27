// store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './feature/login/loginSlice';
// import shoppingListReducer from '../feature/shoppingList/shoppingListSlice'; // Import the shopping list reducer

export const store = configureStore({
    reducer: {
        login: loginReducer,
        // shoppingList: shoppingListReducer, // Add shopping list reducer
    },
});
