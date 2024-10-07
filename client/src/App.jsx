import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/nav'
import Home from './pages/homePage'; // Assuming LandingPage is in the same directory
import SignInForm from './pages/signIn';
import SignUp from './pages/signUp'; // Import your SignUp component
import ShoppingList from './pages/shoppingList'; // Import your ShoppingList component
import NoPage from './pages/noPage'; // Import a component for non-existing routes

function App() {
    return (
        <Router>
            <div style={styles.appContainer}>
                <NavBar />
                <div style={styles.contentContainer}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signIn" element={<SignInForm />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/shoppinglist" element={<ShoppingList />} />
                        <Route path="*" element={<NoPage />} /> {/* Fallback for unmatched routes */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

const styles = {
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    contentContainer: {
        marginTop: '70px', // Adjust according to your NavBar height
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px',
    },
};

export default App
