// src/shoppingListSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loadListsFromLocalStorage, saveListsToLocalStorage } from './localStorage';

const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState: loadListsFromLocalStorage(),
    reducers: {
        addList: (state, action) => {
            state.push(action.payload);
            saveListsToLocalStorage(state);
        },
        clearLists: (state) => {
            return [];
        },
    },
});

export const { addList, clearLists } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
