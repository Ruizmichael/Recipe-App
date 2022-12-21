import React from 'react';
import Pages from './pages/Pages';
import { BrowserRouter } from 'react-router-dom';
import Category from './components/Category';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Category />
        <h1>Hello from App.jsx!</h1>
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
