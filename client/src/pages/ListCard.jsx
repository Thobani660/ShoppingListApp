import React from "react";
import { useDispatch } from "react-redux";
import { removeList } from "../feature/shoppingList/shoppingListSlice";
import TodoList from "./TodoList";

function ListCard({ list, index }) {
  const dispatch = useDispatch();

  const handleDeleteList = () => dispatch(removeList(index));

  return (
    <div className="list-card">
      <h4>{list.name}</h4>
      <p>{list.category}</p>
      <button onClick={handleDeleteList}>Delete</button>
      <TodoList currentListIndex={index} />
    </div>
  );
}

export default ListCard;
