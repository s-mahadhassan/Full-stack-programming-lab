import React from 'react';
import StudentCard from './components/StudentCard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Student Information</h1>
      <div className="card-container">
        <StudentCard
          name="Mahad Hassan"
          rollNo="CS-001"
          department="Computer Science"
          university="Tech University"
          color="#e0f7fa"
        />
        <StudentCard
          name="Usman"
          rollNo="EE-042"
          department="Electrical Engineering"
          university="Global Tech"
          color="#fff3e0"
        />
        <StudentCard
          name="Zain"
          rollNo="ME-105"
          department="Mechanical Engineering"
          university="National Institute"
          color="#f1f8e9"
        />
      </div>
    </div>
  );
}

export default App;
