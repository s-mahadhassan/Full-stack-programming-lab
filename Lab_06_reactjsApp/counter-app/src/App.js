import React from 'react';
import Counter from './components/Counter';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <span className="badge">Lab Task 01</span>
        <h1>Stateful Counter</h1>
        <p>Made by Mahad Hassan - 232053</p>
      </header>
      <main className="main-content">
        <Counter />
      </main>
      <footer className="app-footer">
        <p>Full Stack Programming Lab &copy; 2026</p>
      </footer>
    </div>
  );
}

export default App;