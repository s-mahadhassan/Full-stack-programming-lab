import React from 'react';
import Actions from './components/Actions';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <span className="badge">Lab Task 03</span>
        <h1>Interactive Events App</h1>
        <p>Made by Mahad Hassan - 232053</p>
      </header>
      <main className="main-content">
        <Actions />
      </main>
      <footer className="app-footer">
        <p>Full Stack Programming Lab &copy; 2026</p>
      </footer>
    </div>
  );
}

export default App;