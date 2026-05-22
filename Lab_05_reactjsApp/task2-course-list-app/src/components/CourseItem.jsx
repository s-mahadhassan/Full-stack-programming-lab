import React from 'react';

const CourseItem = ({ courseName, instructor, duration, courseType }) => {
  const isOnline = courseType.toLowerCase() === 'online';

  return (
    <div className="course-item">
      <div className="course-header">
        <h2>{courseName}</h2>
        <span className={`badge ${isOnline ? 'badge-online' : 'badge-offline'}`}>
          {courseType}
        </span>
      </div>
      <div className="course-details">
        <p><strong>Instructor:</strong> {instructor}</p>
        <p><strong>Duration:</strong> {duration}</p>
      </div>
    </div>
  );
};

export default CourseItem;
