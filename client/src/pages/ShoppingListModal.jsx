import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList, clearAllLists } from "../feature/shoppingList/shoppingListSlice";
import ShoppingListModal from "./ShoppingListModal";
import ListCard from "./ListCard";

function ShoppingList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lists = useSelector((state) => state.shoppingList);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("shoppingLists"));
    if (storedLists) {
      storedLists.forEach((list) => dispatch(addList(list)));
    }
  }, [dispatch]);

  const saveToLocalStorage = () => {
    localStorage.setItem("shoppingLists", JSON.stringify(lists));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container">
      <h1>Shopping List</h1>
      <button onClick={openModal}>Add New List</button>
      <button onClick={() => { dispatch(clearAllLists()); saveToLocalStorage(); }}>Clear All</button>

      {isModalOpen && <ShoppingListModal closeModal={closeModal} />}
      
      <div className="list-grid">
        {lists.map((list, index) => (
          <ListCard key={index} list={list} index={index} />
        ))}
      </div>
    </div>
  );
}

export default ShoppingList;
