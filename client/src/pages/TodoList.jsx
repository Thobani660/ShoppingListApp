import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, editTodo } from "../feature/shoppingList/shoppingListSlice";

function TodoList({ currentListIndex }) {
  const [todoItem, setTodoItem] = useState("");
  const [editingTodoIndex, setEditingTodoIndex] = useState(null);
  const [editTodoValue, setEditTodoValue] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.shoppingList[currentListIndex]?.todos || []);

  const handleAddTodo = () => {
    if (todoItem) {
      dispatch(addTodo({ listIndex: currentListIndex, todo: todoItem }));
      setTodoItem("");
    }
  };

  const handleEditTodo = (todoIndex) => {
    setEditingTodoIndex(todoIndex);
    setEditTodoValue(todos[todoIndex]);
  };

  const handleSaveEdit = () => {
    if (editTodoValue) {
      dispatch(editTodo({ listIndex: currentListIndex, todoIndex: editingTodoIndex, newTodo: editTodoValue }));
      setEditingTodoIndex(null);
      setEditTodoValue("");
    }
  };

  const handleRemoveTodo = (todoIndex) => dispatch(removeTodo({ listIndex: currentListIndex, todoIndex }));

  return (
    <div>
      <input type="text" value={todoItem} onChange={(e) => setTodoItem(e.target.value)} placeholder="New Todo" />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editingTodoIndex === index ? (
              <>
                <input type="text" value={editTodoValue} onChange={(e) => setEditTodoValue(e.target.value)} />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                {todo}
                <button onClick={() => handleEditTodo(index)}>Edit</button>
                <button onClick={() => handleRemoveTodo(index)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
