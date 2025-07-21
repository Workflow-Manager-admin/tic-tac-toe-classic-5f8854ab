import React from 'react';
import './App.css';
import Game from './components/Game';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="App">
      <div className="App-content">
        <Game />
      </div>
    </div>
  );
}

export default App;
