// React DOM entry point
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This imports your Tailwind styles
import App from './App'; // This imports your main App component

// This finds the <div id="root"></div> in your public/index.html
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// This tells React to render your entire <App> inside that div
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);