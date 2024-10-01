import { createSlice } from '@reduxjs/toolkit';

const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState: [],
    reducers: {
        addList: (state, action) => {
            state.push(action.payload);
        },
        removeList: (state, action) => {
            return state.filter((list, index) => index !== action.payload);
        },
        updateList: (state, action) => {
            const { index, updatedList } = action.payload;
            state[index] = updatedList; 
        },
    },
});

// Export actions
export const { addList, removeList, updateList } = shoppingListSlice.actions;

// Export the reducer
export default shoppingListSlice.reducer;
