import React, { useState } from 'react';

const ToggleButton = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
        <h1 style={{color:"white"}}>using Tenery operator to show active and non active button</h1>
      <button 
    //   the button is not active when not clicked
        onClick={() => setIsActive(!isActive)} 
        style={{
          padding: '10px 20px',
          backgroundColor: isActive ? 'green' : 'gray',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isActive ? 'Active' : 'notActive'}
      </button>

{/* if the button is clicked */}
      
    </div>
  );
};

export default ToggleButton;
