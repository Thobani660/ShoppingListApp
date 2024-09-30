// store.js
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./feature/loggin/logginSlice";
import shoppingListReducer from "./feature/shoppingList/shoppingListSlice"; // Import the shopping list reducer

export const store = configureStore({
  reducer: {
    // login: loginReducer,
    shoppingList: shoppingListReducer,
    // shoppingList: shoppingListReducer, // Add shopping list reducer
  },
});
