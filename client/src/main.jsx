import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './store'; // Import the Redux store
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

// Wrap your App in the Provider and pass the store as a prop
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
