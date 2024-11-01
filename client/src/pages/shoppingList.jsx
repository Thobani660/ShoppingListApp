import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addList,
  removeList,
  addTodo,
  removeTodo,
  editTodo,
  clearAllLists,
} from "../feature/shoppingList/shoppingListSlice"; // Import the actions

function ShoppingList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [category, setCategory] = useState("Clothes");
  const [currentList, setCurrentList] = useState(null); // Track the current list being edited
  const [todoItem, setTodoItem] = useState(""); // Track todo item input
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
      localStorage.setItem("shoppingLists", JSON.stringify(lists));
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

  // Handle form submission to add a new list
  const handleAddList = () => {
    if (listName) {
      dispatch(addList({ name: listName, category })); // Dispatch the action
      alert("Added new list: " + listName); // Show alert
      closeModal();
    }
  };

  // Handle adding a Todo item
  const handleAddTodo = () => {
    if (todoItem) {
      dispatch(addTodo({ listIndex: currentList, todo: todoItem }));
      setTodoItem(""); // Reset input
    }
  };

  // Handle removing a Todo item
  const handleRemoveTodo = (todoIndex) => {
    dispatch(removeTodo({ listIndex: currentList, todoIndex }));
  };

  // Handle starting to edit a Todo item
  const handleEditTodo = (todoIndex) => {
    setEditingTodoIndex(todoIndex);
    setEditTodoValue(lists[currentList].todos[todoIndex]); // Set the current value to the edit input
  };

  // Handle saving the edited Todo item
  const handleSaveEdit = () => {
    if (editTodoValue) {
      dispatch(editTodo({
        listIndex: currentList,
        todoIndex: editingTodoIndex,
        newTodo: editTodoValue,
      }));
      setEditingTodoIndex(null); // Reset editing state
      setEditTodoValue(""); // Reset input
    }
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setEditingTodoIndex(null); // Reset editing state
    setEditTodoValue(""); // Reset input
  };

  // Handle clicking a list card to edit the list
  const handleListClick = (index) => {
    setCurrentList(index);
  };

  // Handle deleting a shopping list
  const handleDeleteList = (index) => {
    dispatch(removeList(index)); // Dispatch the action to remove the list
  };

  return (
    <div
      className="container"
      style={{
        backgroundSize: "cover",
        padding: "50px",
        borderRadius: "50px",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${require("../img/shopping-cart-with-neon-lights-it_81048-777.avif")})`,
        width: "100%",
       // Apply blur effect
      }}
    >
      <h1 style={{ color: "white", textAlign: "center", fontSize: "3rem" }}>Shopping List</h1>
      <button
        onClick={openModal}
        style={{
          marginBottom: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "15px 30px",
          borderRadius: "25px",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
      >
        Add New List
      </button>
      <input
        type="text"
        placeholder="Search"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          padding: "15px",
          width: "300px",
          borderRadius: "15px",
          border: "1px solid #ccc",
          transition: "border 0.3s ease",
        }}
        onFocus={(e) => (e.currentTarget.style.border = "1px solid #4CAF50")}
        onBlur={(e) => (e.currentTarget.style.border = "1px solid #ccc")}
      />

      {/* Display the shopping lists */}
      <div style={{ filter: isModalOpen || currentList !== null ? "blur(10px)" : "none" }}>
        <h3 style={{ color: "white", textAlign: "center" }}>Your Shopping Lists:</h3>
        <button
          onClick={() => {
            dispatch({ type: "shoppingList/clearAllLists" });
            alert("Cleared all shopping lists");
            saveToLocalStorage();
          }}
          style={{
            padding: "15px 30px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "25px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            marginBottom: "20px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "red")}
        >
          Clear All
        </button>

        {lists.length === 0 ? (
          <p style={{ color: "white", textAlign: "center" }}>No shopping lists available.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "15px",
              marginTop: "10px",
              padding: "0 20px",
            }}
          >
        {lists.map((list, index) => (
  <div
    key={index}
    onClick={() => handleListClick(index)}
    style={{
      cursor: "pointer",
      height: "100px",
      padding: "10px",
      border: "2px solid #FFA500",
      borderRadius: "15px",
      backgroundColor: "#f8f9fa",
      textAlign: "center",
      transition: "transform 0.3s ease",
    }}
    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <h4 style={{ margin: 0, color: "#FFA500" }}>{list.name}</h4>
    <p style={{ margin: 0 }}>{list.category}</p>
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteList(index);
      }}
      style={{
        marginTop: "10px",
        backgroundColor: "red",
        color: "white",
        borderRadius: "10px",
        border: "none",
        padding: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "red")}
    >
      Delete
    </button>
  </div>
))}
          </div>
        )}
      </div>

      {/* Modal for adding new shopping lists */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          }}
        >
          <h2 style={{ color: "#333" }}>Create New Shopping List</h2>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list name"
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
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "lightgreen")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "lightgreen")}
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
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "red")}
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
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          }}
        >
          <h2 style={{ color: "#333" }}>{lists[currentList].name} - Todos</h2>
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
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "lightgreen")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "lightgreen")}
            >
              Add Todo
            </button>
          </div>

          {/* Display the todo list */}
          <div style={{ marginTop: "20px" }}>
            {todoList.length === 0 ? (
              <p>No todos available.</p>
            ) : (
              <ul style={{ padding: 0 }}>
                {todoList.map((todo, index) => (
                  <li key={index} style={{ listStyle: "none", marginBottom: "10px" }}>
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
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "lightgreen")}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "lightgreen")}
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
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "red")}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{todo}</span>
                        <button
                          onClick={() => handleEditTodo(index)}
                          style={{
                            marginLeft: "10px",
                            padding: "5px",
                            backgroundColor: "lightblue",
                            borderRadius: "5px",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3b99db")}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "lightblue")}
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
                            transition: "background-color 0.3s ease",
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "red")}
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
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#555")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "grey")}
          >
            Back to Lists
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingList;
