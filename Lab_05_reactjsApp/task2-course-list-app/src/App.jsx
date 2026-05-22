import React from 'react';
import CourseItem from './components/CourseItem';
import './App.css';

function App() {
  const courses = [
    { id: 1, courseName: "Introduction to React", instructor: "John Doe", duration: "4 Weeks", courseType: "Online" },
    { id: 2, courseName: "Advanced JavaScript", instructor: "Jane Smith", duration: "6 Weeks", courseType: "Offline" },
    { id: 3, courseName: "UI/UX Design Principles", instructor: "Emily White", duration: "3 Weeks", courseType: "Online" },
    { id: 4, courseName: "Backend Development with Node.js", instructor: "Michael Brown", duration: "8 Weeks", courseType: "Offline" },
    { id: 5, courseName: "Full Stack Masterclass", instructor: "Sarah Connor", duration: "12 Weeks", courseType: "Online" }
  ];

  return (
    <div className="app-container">
      <h1>Available Courses</h1>
      <div className="course-list">
        {courses.map(course => (
          <CourseItem 
            key={course.id}
            courseName={course.courseName}
            instructor={course.instructor}
            duration={course.duration}
            courseType={course.courseType}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
