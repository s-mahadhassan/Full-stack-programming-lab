import React from 'react';
import Greeting from './components/Greeting';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Dynamic Greetings</h1>
      <div className="greeting-container">
        <Greeting name="Mahad" timeOfDay="Morning" bgColor="#ffe082" />
        <Greeting name="Usman" timeOfDay="Afternoon" bgColor="#81d4fa" />
        <Greeting name="Zain" timeOfDay="Evening" bgColor="#ce93d8" />
        <Greeting name="Ahmed" timeOfDay="Night" bgColor="#90caf9" />
      </div>
    </div>
  );
}

export default App;
