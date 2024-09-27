// Layout.jsx
import NavBar from "../components/nav";

function Layout({ children }) {
    const layoutStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    };
    const mainStyle = {
        flex: '1',
        padding: '80px 20px',  // Prevent content from being hidden under navbar
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
    };
    const footerStyle = {
        width: '100%',  // Full width
        backgroundColor: 'black',
        textAlign: 'center',
        padding: '10px',
        borderTop: '1px solid #ddd',
        position: 'fixed',  // Sticks to the bottom of the viewport
        bottom: 0,
        left: 0,
        color:"white"
    };

    return (
        <div style={layoutStyle}>
            <NavBar />
            <main style={mainStyle}>{children}</main>
            <footer style={footerStyle}>
                <p style={{color:"yellow"}}>&copy; 2024 My Shopping List App-Task10</p>
            </footer>
        </div>
    );
}

export default Layout;
