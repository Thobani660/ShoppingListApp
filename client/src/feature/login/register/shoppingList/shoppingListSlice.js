// // feature/shoppingList/shoppingListSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     lists: [],
//     selectedList: null,
//     todoItems: [],
//     todoInput: '',
//     editingIndex: null,
// };

// export const shoppingListSlice = createSlice({
//     name: 'shoppingList',
//     initialState,
//     reducers: {
//         addList: (state, action) => {
//             state.lists.push(action.payload);
//         },
//         setSelectedList: (state, action) => {
//             state.selectedList = action.payload;
//             state.todoItems = []; // Reset todos when a new list is selected
//         },
//         addTodo: (state, action) => {
//             if (state.editingIndex !== null) {
//                 state.todoItems[state.editingIndex] = action.payload;
//                 state.editingIndex = null; // Reset editing index
//             } else {
//                 state.todoItems.push(action.payload);
//             }
//         },
//         deleteTodo: (state, action) => {
//             state.todoItems = state.todoItems.filter((_, index) => index !== action.payload);
//         },
//         editTodo: (state, action) => {
//             state.todoInput = state.todoItems[action.payload]; // Set input for editing
//             state.editingIndex = action.payload; // Set the editing index
//         },
//         setTodoInput: (state, action) => {
//             state.todoInput = action.payload;
//         },
//         resetList: (state) => {
//             state.selectedList = null; // Reset selected list
//             state.todoItems = []; // Reset todo items
//         },
//     },
// });

// // Export actions
// export const { addList, setSelectedList, addTodo, deleteTodo, editTodo, setTodoInput, resetList } = shoppingListSlice.actions;

// // Export reducer
// export default shoppingListSlice.reducer;
