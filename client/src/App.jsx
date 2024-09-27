// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/homePage';
import SignIn from './pages/signIn';
import SignUp from './components/signIn';
import ShoppingList from './pages/shoppingList';
import Layout from './pages/layout';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/shoppinglist" element={<ShoppingList />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
