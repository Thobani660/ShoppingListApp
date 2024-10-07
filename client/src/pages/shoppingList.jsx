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
  const [list, setList] = React.useState([]); // Assuming you are using state to manage your lists

  // Function to clear all lists
  const clearAllLists = () => {
    dispatch({ type: 'shoppingList/clearAllLists' }); // Dispatch an action to clear all lists
    showAlert("Cleared all shopping lists"); // Show alert
    saveToLocalStorage(); // Update local storage
  };
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
    <div className="container" style={{backgroundSize:"cover",padding:"50px",borderRadius:"50px",backgroundRepeat:"no-repeat",backgroundImage:`url(${require("../img/shopping-cart-with-neon-lights-it_81048-777.avif")})`,width:"100%"}}>
      <h1 style={{ color: "white" }}>Shopping List</h1>
      <button onClick={openModal} style={{ marginBottom: "20px",backgroundColor:"lightgreen",padding:"20px",borderRadius:"15px",border:"2px solid white" }}>
        Add New List
      </button>
      <input type="text" placeholder="Search" style={{ marginLeft: "620px",padding:"15px",width:"300px",borderRadius:"15px" }} />

      {/* Apply blur effect to the background when modal is open */}
      <div style={{ filter: isModalOpen || currentList !== null ? "blur(5px)" : "none" }}>
        {/* Display the shopping lists */}
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "white" }}>Your Shopping Lists:</h3>
          <button
            onClick={clearAllLists} // Add onClick to the Clear All button
            style={{
              padding: "20px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "10px",
              border: "2px solid transparent",
              cursor: "pointer",
            }}
          >
            Clear All
          </button>

          {lists.length === 0 ? (
            <p>No shopping lists available.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", // Four equal columns
                gap: "10px", // Space between items
                marginTop: "10px", // Added space above grid items
              }}
            >
              {lists.map((list, index) => (
                <div
                  key={index}
                  onClick={() => handleListClick(index)}
                  style={{
                    cursor: "pointer",
                    height: "100px",
                    width: "100px",
                    padding: "10px",
                    border: "2px solid orange",
                    borderRadius: "4px",
                    backgroundColor: "#f8f9fa",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {list.name} - {list.category}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
              border: "1px solid lightgreen",
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
              border: "1px solid lightgreen",
            }}
          >
            <option value="Clothes">Clothes</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Food">Food</option>
            <option value="Other">Other</option>
          </select>
          <button
            onClick={handleAddList}
            style={{
              backgroundColor: "lightgreen",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid transparent",
              width: "100%",
              cursor: "pointer",
            }}
          >
            Add List
          </button>
          <button
            onClick={closeModal}
            style={{
              marginTop: "10px",
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid transparent",
              width: "100%",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Todo list for the selected list */}
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
          <h2>{lists[currentList].name} - Todos</h2>
          <div>
            <input
              type="text"
              value={todoItem}
              onChange={(e) => setTodoItem(e.target.value)}
              placeholder="Enter a todo item"
              style={{
                display: "block",
                width: "100%",
                marginBottom: "10px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid lightgreen",
              }}
            />
            <button
              onClick={handleAddTodo}
              style={{
                backgroundColor: "lightgreen",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid transparent",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Add Todo
            </button>
          </div>

          {/* Display the todo list */}
          <div style={{ marginTop: "20px" }}>
            {todoList.length === 0 ? (
              <p>No todos available.</p>
            ) : (
              <ul>
                {todoList.map((todo, index) => (
                  <li key={index}>
                    {editingTodoIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={editTodoValue}
                          onChange={(e) => setEditTodoValue(e.target.value)}
                          style={{
                            display: "inline-block",
                            width: "80%",
                            marginBottom: "5px",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid lightgreen",
                          }}
                        />
                        <button
                          onClick={handleSaveEdit}
                          style={{
                            backgroundColor: "lightgreen",
                            padding: "5px",
                            borderRadius: "4px",
                            border: "1px solid transparent",
                            marginLeft: "5px",
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          style={{
                            backgroundColor: "red",
                            padding: "5px",
                            borderRadius: "4px",
                            border: "1px solid transparent",
                            marginLeft: "5px",
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {todo}
                        <button
                          onClick={() => handleEditTodo(index)}
                          style={{
                            marginLeft: "10px",
                            padding: "5px",
                            backgroundColor: "lightblue",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleRemoveTodo(index)}
                          style={{
                            marginLeft: "10px",
                            padding: "5px",
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={() => setCurrentList(null)}
            style={{
              marginTop: "10px",
              backgroundColor: "grey",
              color: "white",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid transparent",
              width: "100%",
              cursor: "pointer",
            }}
          >
            Back to Lists
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingList;

