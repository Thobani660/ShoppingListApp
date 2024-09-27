// NavBar.jsx
import { Link } from 'react-router-dom';

function NavBar() {
    const navStyle = {

        width: '100%',
        backgroundColor: 'black',
        padding:'10%',
        borderBottom: '1px solid #ddd',
        padding: '10px 20px',
        position: 'fixed',
        top: 0,
        left: 0,
        borderBottom:"yellow",
        border:"yellow",


        zIndex: 1000,  // Ensures it stays on top
    };
    const ulStyle = {
        listStyleType: 'none',
        margin: 0,
        padding: '0.5%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottom:"yellow",
        border:"yellow"

    };
    const liStyle = {
        margin: '0 15px',
        border: 'red'
 
        
    };

    return (
        <nav style={navStyle}>
            <ul style={ulStyle}>
                <li style={liStyle}><Link to="/"><h4 style={{color:"yellow",borderBottom:"yellow"}}>Home</h4></Link></li>
                <li style={liStyle}><Link to="/signin"><h4 style={{color:"yellow"}}>SignIn</h4></Link></li>
                <li style={liStyle}><Link to="/signup"><h4 style={{color:"yellow"}}>SignUp</h4></Link></li>
                <li style={liStyle}><Link to="/shoppinglist"><h4 style={{color:"yellow"}}>ShoppingList</h4></Link></li>
                <li style={liStyle}><Link to="/noPage"><h4 style={{color:"yellow"}}>NoPage</h4></Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
