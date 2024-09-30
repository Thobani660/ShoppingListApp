import React, { useState } from 'react';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add your login logic (e.g., API call)
        if (!email || !password) {
            setError('Please fill in all fields');
        } else {
            setError('');
            console.log('Submitted:', { email, password });
            // Add your sign-in logic here (e.g., API call)
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Sign In</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Sign In
                </button>
            </form>
            <p style={styles.footer}>
                Don't have an account? <a href="/signup" style={styles.link}>Sign Up</a>
            </p>
        </div>
    );
}

const styles = {
    container: {
        width: '300px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    header: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '15px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    input: {
        marginBottom: '15px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    button: {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#28a745',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#218838',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
    footer: {
        marginTop: '20px',
        fontSize: '14px',
        color: '#777',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    },
};

export default SignInForm;
