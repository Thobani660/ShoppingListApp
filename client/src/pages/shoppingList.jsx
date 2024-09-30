import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addList, removeList } from '../feature/shoppingList/shoppingListSlice'; // Import the actions

function ShoppingList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listName, setListName] = useState('');
    const [category, setCategory] = useState('Clothes');
    const [currentList, setCurrentList] = useState(null); // Track the current list being edited
    const [todoItem, setTodoItem] = useState(''); // Track todo item input
    const [todoList, setTodoList] = useState([]); // Store todos for the selected list
    const [editingTodoIndex, setEditingTodoIndex] = useState(null); // Track which todo item is being edited
    const [editTodoValue, setEditTodoValue] = useState(''); // Track the value of the todo being edited
    const lists = useSelector((state) => state.shoppingList); // Access the Redux state
    const dispatch = useDispatch(); // Get the dispatch function

    // Open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setListName(''); // Reset inputs
        setCategory('Clothes');
    };

    // Handle form submission to add a new list
    const handleAddList = () => {
        if (listName) {
            dispatch(addList({ name: listName, category })); // Dispatch the action
            closeModal();
        }
    };

    // Handle adding a Todo item
    const handleAddTodo = () => {
        if (todoItem) {
            setTodoList((prev) => [...prev, todoItem]); // Add todo item to the list
            setTodoItem(''); // Reset input
        }
    };

    // Handle removing a Todo item
    const handleRemoveTodo = (index) => {
        setTodoList((prev) => prev.filter((_, i) => i !== index)); // Remove todo item
    };

    // Handle starting to edit a Todo item
    const handleEditTodo = (index) => {
        setEditingTodoIndex(index);
        setEditTodoValue(todoList[index]); // Set the current value to the edit input
    };

    // Handle saving the edited Todo item
    const handleSaveEdit = () => {
        if (editTodoValue) {
            setTodoList((prev) => {
                const newTodos = [...prev];
                newTodos[editingTodoIndex] = editTodoValue; // Update the edited todo item
                return newTodos;
            });
            setEditingTodoIndex(null); // Reset editing state
            setEditTodoValue(''); // Reset input
        }
    };

    // Handle canceling the edit
    const handleCancelEdit = () => {
        setEditingTodoIndex(null); // Reset editing state
        setEditTodoValue(''); // Reset input
        setCurrentList(null); // Go back to list view
    };

    // Handle clicking a list card to edit the list
    const handleListClick = (index) => {
        setCurrentList(index);
        setTodoList([]); // Reset todo list for new selection
        setIsModalOpen(false); // Close list creation modal
    };

    return (
        <div className="container">
            <h1>Shopping List</h1>
            <button onClick={openModal} style={{ marginBottom: '20px' }}>
                Add New List
            </button>

            {/* Modal for Adding New List */}
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0.5px 0.5px 3px 2px grey',
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
                            display: 'block',
                            width: '100%',
                            marginBottom: '10px',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid purple',
                        }}
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                            display: 'block',
                            width: '100%',
                            marginBottom: '10px',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid purple',
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
                            padding: '10px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
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
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0.5px 0.5px 3px 2px grey',
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
                            display: 'block',
                            width: '100%',
                            marginBottom: '10px',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid purple',
                        }}
                    />
                    <button
                        onClick={handleAddTodo}
                        style={{
                            padding: '10px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Add Todo
                    </button>

                    <h3>Todo Items:</h3>
                    {todoList.length === 0 ? (
                        <p>No todo items yet.</p>
                    ) : (
                        todoList.map((item, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                {editingTodoIndex === index ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editTodoValue}
                                            onChange={(e) => setEditTodoValue(e.target.value)}
                                            style={{
                                                flex: 1,
                                                marginRight: '5px',
                                                padding: '5px',
                                                borderRadius: '4px',
                                                border: '1px solid purple',
                                            }}
                                        />
                                        <button onClick={handleSaveEdit} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '5px' }}>
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span>{item}</span>
                                        <button onClick={() => handleEditTodo(index)} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '5px' }}>
                                            Edit
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => handleRemoveTodo(index)}
                                    style={{
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        padding: '5px',
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                    <button onClick={handleCancelEdit} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '5px', marginLeft: '5px' }}>
                        Cancel
                    </button>
                </div>
            )}

            {/* List Cards */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                    marginTop: '20px',
                }}
            >
                {lists.map((list, index) => (
                    <div
                        key={index}
                        onClick={() => handleListClick(index)} // Handle click to view Todo list
                        style={{
                            padding: '20px',
                            border: '1px solid purple',
                            borderRadius: '8px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: '0.3s',
                        }}
                    >
                        <h3>{list.name}</h3>
                        <p>Category: {list.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShoppingList;
