function Home(){
    return(
        <div style={styles.container}>
        <header style={styles.header}>
            <h1 style={styles.title}>Welcome to Shopping List</h1>
            <p style={styles.subtitle}>Organize your shopping like never before!</p>
            <button style={styles.button} onClick={() => alert('Get Started!')}>
                Get Started
            </button>
            
        </header>

        <section style={styles.features}>
            <h2 style={styles.featuresTitle}>Features</h2>
            <div style={styles.featuresContainer}>
                <div style={styles.feature}>
                    <h3>Easy Management</h3>
                    <p>Manage multiple shopping lists effortlessly and keep track of items.</p>
                </div>
                <div style={styles.feature}>
                    <h3>Collaborate</h3>
                    <p>Share your lists with family and friends for collaborative shopping.</p>
                </div>
                <div style={styles.feature}>
                    <h3>Real-Time Sync</h3>
                    <p>Your lists update in real-time, so everyone stays on the same page.</p>
                </div>
            </div>
        </section>

        <section style={styles.testimonial}>
            <h2 style={styles.testimonialTitle}>What Users Say</h2>
            <p style={styles.testimonialText}>
                "This app has transformed the way I shop! It's so easy to use and helps me save time." - Sarah
            </p>
        </section>

        <footer style={styles.footer}>
            <p>© 2024 Shopping List App. All rights reserved.</p>
        </footer>
    </div>
);
}

const styles = {
container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'red',
    color: '#333',
    textAlign: 'center',
    padding: '20px',
},
header: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '50px 20px',
    borderRadius: '8px',
},
title: {
    fontSize: '36px',
    margin: '0',
},
subtitle: {
    fontSize: '18px',
    margin: '10px 0 20px',
},
button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
},
features: {
    margin: '40px 0',
},
featuresTitle: {
    fontSize: '28px',
    margin: '20px 0',
    color:'white'
},
featuresContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
},
feature: {
    width: '30%',
    padding: '20px',
    margin: '10px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 5px white',
},
testimonial: {
    margin: '40px 0',
    padding: '20px',
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
},
testimonialTitle: {
    fontSize: '24px',
    margin: '20px 0',
},
testimonialText: {
    fontStyle: 'italic',
},
footer: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#777',
},
};

    export default Home