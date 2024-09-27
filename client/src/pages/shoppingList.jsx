import React, { useState } from 'react';

function ShoppingList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listName, setListName] = useState('');
    const [category, setCategory] = useState('Clothes');
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null); // Track which list is selected
    const [todoItems, setTodoItems] = useState([]); // State for todos
    const [todoInput, setTodoInput] = useState(''); // State for adding todos
    const [editingIndex, setEditingIndex] = useState(null); // Track the index of the item being edited

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
            setLists([...lists, { name: listName, category }]);
            closeModal();
        }
    };

    // Handle selecting a card to show the todo list
    const handleCardClick = (list) => {
        setSelectedList(list); // Set the clicked list as selected
    };

    // Handle adding a todo item
    const handleAddTodo = () => {
        if (todoInput) {
            if (editingIndex !== null) {
                // If in edit mode, update the item
                const updatedTodos = [...todoItems];
                updatedTodos[editingIndex] = todoInput;
                setTodoItems(updatedTodos);
                setEditingIndex(null); // Exit edit mode
            } else {
                // Add a new todo item
                setTodoItems([...todoItems, todoInput]);
            }
            setTodoInput(''); // Clear input after adding
        }
    };

    // Handle deleting a todo item
    const handleDeleteTodo = (index) => {
        const updatedTodos = todoItems.filter((_, i) => i !== index);
        setTodoItems(updatedTodos);
    };

    // Handle editing a todo item
    const handleEditTodo = (index) => {
        setTodoInput(todoItems[index]); // Set the input to the current todo value
        setEditingIndex(index); // Track which todo is being edited
    };

    // Go back to list of cards
    const goBackToLists = () => {
        setSelectedList(null); // Reset the selected list
        setTodoItems([]); // Reset the todo items for a clean slate
    };

    return (
        <div className="container">
            <h1>Shopping List</h1>

            {/* If a list is selected, show the Todo List, otherwise show the cards */}
            {selectedList ? (
                <div>
                    <h2>{selectedList.name} - Todo List</h2>

                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Add a todo"
                            value={todoInput}
                            onChange={(e) => setTodoInput(e.target.value)}
                            style={{
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                marginRight: '10px',
                            }}
                        />
                        <button
                            onClick={handleAddTodo}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            {editingIndex !== null ? 'Update Todo' : 'Add Todo'}
                        </button>
                    </div>

                    <ul>
                        {todoItems.map((todo, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                {todo}

                                {/* Edit Button */}
                                <button
                                    onClick={() => handleEditTodo(index)}
                                    style={{
                                        marginLeft: '10px',
                                        padding: '5px 10px',
                                        backgroundColor: '#ffc107',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Edit
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDeleteTodo(index)}
                                    style={{
                                        marginLeft: '10px',
                                        padding: '5px 10px',
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={goBackToLists}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Back to Shopping Lists
                    </button>
                </div>
            ) : (
                <div>
                    <button onClick={openModal} style={{ marginBottom: '20px' }}>
                        Add New List
                    </button>

                    {/* Modal */}
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
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
                                    border: '1px solid #ddd',
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
                                    border: '1px solid #ddd',
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
                                    padding: '10px 20px',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Add List
                            </button>

                            <button
                                onClick={closeModal}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginLeft: '10px',
                                }}
                            >
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
                                onClick={() => handleCardClick(list)} // Click handler to show todo list
                                style={{
                                    padding: '20px',
                                    backgroundColor: '#f8f9fa',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                }}
                            >
                                <h3>{list.name}</h3>
                                <p>{list.category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShoppingList;
