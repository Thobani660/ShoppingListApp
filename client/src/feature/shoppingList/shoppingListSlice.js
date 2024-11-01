import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    // Add a new list to the state
    addList: (state, action) => {
      state.push({ ...action.payload, todos: [] }); // Each list starts with an empty todos array
    },
    
    // Remove a list by index
    removeList: (state, action) => {
      state.splice(action.payload, 1);
    },

    // Add a todo to a specific list
    addTodo: (state, action) => {
      const { listIndex, todo } = action.payload;
      state[listIndex].todos.push(todo);
    },

    // Remove a todo from a specific list
    removeTodo: (state, action) => {
      const { listIndex, todoIndex } = action.payload;
      state[listIndex].todos.splice(todoIndex, 1);
    },

    // Edit a todo in a specific list
    editTodo: (state, action) => {
      const { listIndex, todoIndex, newTodo } = action.payload;
      state[listIndex].todos[todoIndex] = newTodo;
    },

    // Clear all lists
    clearAllLists: () => {
      return [];
    },
  },
});

export const { addList, removeList, addTodo, removeTodo, editTodo, clearAllLists } = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
