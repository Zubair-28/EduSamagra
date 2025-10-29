import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure this specific import is used
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext'; // Import UserProvider

// 1. Get the root DOM element
const rootElement = document.getElementById('root');

// 2. Create the React root using the new API
const root = ReactDOM.createRoot(rootElement);

// 3. Render the App inside the root
root.render(
    <React.StrictMode>
        <UserProvider> {/* Wrap App with UserProvider */}
            <App />
        </UserProvider>
    </React.StrictMode>
);