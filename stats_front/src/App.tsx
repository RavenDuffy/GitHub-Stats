import React from 'react';
import './App.css';
import { Home } from './features/login/home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home redirectURL='f'/>
      </header>
    </div>
  );
}

export default App;
