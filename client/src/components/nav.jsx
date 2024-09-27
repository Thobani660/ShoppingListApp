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
        

        zIndex: 1000,  // Ensures it stays on top
    };
    const ulStyle = {
        listStyleType: 'none',
        margin: 0,
        padding: '1%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    };
    const liStyle = {
        margin: '0 15px',
    };

    return (
        <nav style={navStyle}>
            <ul style={ulStyle}>
                <li style={liStyle}><Link to="/">Home</Link></li>
                <li style={liStyle}><Link to="/signin">Sign In</Link></li>
                <li style={liStyle}><Link to="/signup">Sign Up</Link></li>
                <li style={liStyle}><Link to="/shoppinglist">Shopping List</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
