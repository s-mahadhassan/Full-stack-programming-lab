import React from 'react';

const StudentCard = ({ name, rollNo, department, university, color }) => {
  return (
    <div className="student-card" style={{ backgroundColor: color }}>
      <div className="student-avatar">
        {name.charAt(0)}
      </div>
      <h2>{name}</h2>
      <p><strong>Roll No:</strong> {rollNo}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>University:</strong> {university}</p>
    </div>
  );
};

export default StudentCard;
