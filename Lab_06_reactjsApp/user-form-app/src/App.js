import React from 'react';
import UserForm from './components/UserForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <span className="badge">Lab Task 02</span>
        <h1>User Form App</h1>
        <p>Made by Mahad Hassan - 232053</p>
      </header>
      <main className="main-content">
        <UserForm />
      </main>
      <footer className="app-footer">
        <p>Full Stack Programming Lab &copy; 2026</p>
      </footer>
    </div>
  );
}

export default App;