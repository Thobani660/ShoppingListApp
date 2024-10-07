import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList, removeList } from "../feature/shoppingList/shoppingListSlice"; // Import the actions

function ShoppingList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [category, setCategory] = useState("Clothes");
  const [currentList, setCurrentList] = useState(null); // Track the current list being edited
  const [todoItem, setTodoItem] = useState(""); // Track todo item input
  const [todoList, setTodoList] = useState([]); // Store todos for the selected list
  const [editingTodoIndex, setEditingTodoIndex] = useState(null); // Track which todo item is being edited
  const [editTodoValue, setEditTodoValue] = useState(""); // Track the value of the todo being edited
  const lists = useSelector((state) => state.shoppingList); // Access the Redux state
  const dispatch = useDispatch(); // Get the dispatch function

  // Load data from local storage
  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("shoppingLists"));
    if (storedLists) {
      storedLists.forEach((list) => dispatch(addList(list)));
    }
  }, [dispatch]);

  // Save data to local storage
  const saveToLocalStorage = () => {
    const listsToSave = lists.map((list, index) => ({
      ...list,
      todos: todoList, // Include the todo list in the saved data
    }));
    localStorage.setItem("shoppingLists", JSON.stringify(listsToSave));
  };

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setListName(""); // Reset inputs
    setCategory("Clothes");
  };

  // Show alert message for button clicks
  const showAlert = (message) => {
    alert(message);
  };

  // Handle form submission to add a new list
  const handleAddList = () => {
    if (listName) {
      dispatch(addList({ name: listName, category })); // Dispatch the action
      showAlert("Added new list: " + listName); // Show alert
      closeModal();
      saveToLocalStorage(); // Save to local storage
    }
  };

  // Handle adding a Todo item
  const handleAddTodo = () => {
    if (todoItem) {
      setTodoList((prev) => [...prev, todoItem]); // Add todo item to the list
      showAlert("Added todo item: " + todoItem); // Show alert
      setTodoItem(""); // Reset input
      saveToLocalStorage(); // Save to local storage
    }
  };

  // Handle removing a Todo item
  const handleRemoveTodo = (index) => {
    showAlert("Removed todo item: " + todoList[index]); // Show alert
    setTodoList((prev) => prev.filter((_, i) => i !== index)); // Remove todo item
    saveToLocalStorage(); // Save to local storage
  };

  // Handle starting to edit a Todo item
  const handleEditTodo = (index) => {
    setEditingTodoIndex(index);
    setEditTodoValue(todoList[index]); // Set the current value to the edit input
    showAlert("Editing todo item: " + todoList[index]); // Show alert
  };

  // Handle saving the edited Todo item
  const handleSaveEdit = () => {
    if (editTodoValue) {
      setTodoList((prev) => {
        const newTodos = [...prev];
        newTodos[editingTodoIndex] = editTodoValue; // Update the edited todo item
        return newTodos;
      });
      showAlert("Saved edit for todo item: " + editTodoValue); // Show alert
      setEditingTodoIndex(null); // Reset editing state
      setEditTodoValue(""); // Reset input
      saveToLocalStorage(); // Save to local storage
    }
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setEditingTodoIndex(null); // Reset editing state
    setEditTodoValue(""); // Reset input
    setCurrentList(null); // Go back to list view
    showAlert("Canceled editing todo item"); // Show alert
  };

  // Handle clicking a list card to edit the list
  const handleListClick = (index) => {
    setCurrentList(index);
    setTodoList([]); // Reset todo list for new selection
    setIsModalOpen(false); // Close list creation modal
    showAlert("Viewing todo list: " + lists[index].name); // Show alert
  };

  // Handle deleting a shopping list
  const handleDeleteList = (index) => {
    showAlert("Deleted shopping list: " + lists[index].name); // Show alert
    dispatch(removeList(index)); // Dispatch the action to remove the list
    saveToLocalStorage(); // Save to local storage
  };

  return (
    <div className="container" style={{backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundImage:`url(${require("../img/shopping-cart-with-neon-lights-it_81048-777.avif")})`}}>
      <h1 style={{ color: "black" }}>Shopping List</h1>
      <button onClick={openModal} style={{ marginBottom: "20px" }}>
        Add New List
      </button>
      <input type="text" placeholder="Search" style={{ marginLeft: "100px" }} />

      {/* Modal for Adding New List */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0.5px 0.5px 3px 2px grey",
            zIndex: 1000,
          }}
        >
          <h2>Create New List</h2>
          <input
            type="text"
            placeholder="List Name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "10px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid purple",
            }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "10px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid purple",
            }}
          >
            <option value="Clothes">Clothes</option>
            <option value="Shoes">Shoes</option>
            <option value="Food">Food</option>
            <option value="Furniture">Furniture</option>
          </select>

          <button
            onClick={handleAddList}
            style={{
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add List
          </button>
        </div>
      )}

      {/* Todo List Modal */}
      {currentList !== null && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0.5px 0.5px 3px 2px grey",
            zIndex: 1000,
          }}
        >
          <h2>{lists[currentList]?.name} - Todo List</h2>
          <input
            type="text"
            placeholder="Add Todo Item"
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "10px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid purple",
            }}
          />
          <button
            onClick={handleAddTodo}
            style={{
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Todo
          </button>

          <h3>Todo Items:</h3>
          {todoList.length === 0 ? (
            <p>No todo items yet.</p>
          ) : (
            todoList.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
              >
                {editingTodoIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editTodoValue}
                      onChange={(e) => setEditTodoValue(e.target.value)}
                      style={{
                        width: "70%",
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid purple",
                      }}
                    />
                    <button
                      onClick={handleSaveEdit}
                      style={{
                        marginLeft: "5px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={{
                        marginLeft: "5px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span>{item}</span>
                    <div>
                      <button
                        onClick={() => handleEditTodo(index)}
                        style={{
                          marginLeft: "5px",
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveTodo(index)}
                        style={{
                          marginLeft: "5px",
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}

          <button
            onClick={handleCancelEdit}
            style={{
              marginTop: "20px",
              backgroundColor: "#ffc107",
              color: "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Back to Lists
          </button>

          <button
            onClick={() => handleDeleteList(currentList)}
            style={{
              marginTop: "20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete List
          </button>
        </div>
      )}

      {/* Display the shopping lists */}
      <div style={{ marginTop: "20px" }}>
        <h3 style={{color:"black"}}>Your Shopping Lists:</h3>
        {lists.length === 0 ? (
          <p>No shopping lists available.</p>
        ) : (
          lists.map((list, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div
                onClick={() => handleListClick(index)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  border: "1px solid purple",
                  borderRadius: "4px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                {list.name} - {list.category}
              </div>
              <button
                onClick={() => handleDeleteList(index)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShoppingList;
