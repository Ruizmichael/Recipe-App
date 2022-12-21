import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import styles here later
import styles from './stylesheets/styles.css';

createRoot(document.getElementById('app')).render(<App />);

console.log('Hello World');
