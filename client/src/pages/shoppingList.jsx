import React, { useState } from 'react';

function ShoppingList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listName, setListName] = useState('');
    const [category, setCategory] = useState('Clothes');
    const [lists, setLists] = useState([]);

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

    return (
        <div className="container">
            <h1>Shopping List</h1>
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
                        boxShadow: '0.5px 0.5px 3px 2px grey',
                        zIndex: 1000,
                        alignItems:"center",
                        justifyContent: "center",
                        // border:"purple",
                        padding:"30px"
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
                            padding: '20px',
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
                 style={{
                   padding: '20px',
                   backgroundColor: '#f8f9fa',
                   border: 'none',
                   borderLeft: '2px solid grey',
                   borderBottom: '2px solid grey',
                   borderRadius: '10px',
                   boxShadow: '0.5px 0.5px 3px 2px grey',
                   width:"100px"
                 }}
               >
                        <h3>{list.name}</h3>
                        <p>{list.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShoppingList;
