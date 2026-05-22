import React from 'react';

const Greeting = ({ name, timeOfDay, bgColor }) => {
  let greetingMessage = "";
  let icon = "";

  switch (timeOfDay.toLowerCase()) {
    case 'morning':
      greetingMessage = `Good Morning, ${name}!`;
      icon = "🌅";
      break;
    case 'afternoon':
      greetingMessage = `Good Afternoon, ${name}!`;
      icon = "☀️";
      break;
    case 'evening':
      greetingMessage = `Good Evening, ${name}!`;
      icon = "🌇";
      break;
    case 'night':
      greetingMessage = `Good Night, ${name}!`;
      icon = "🌙";
      break;
    default:
      greetingMessage = `Hello, ${name}!`;
      icon = "👋";
  }

  return (
    <div className="greeting-card" style={{ backgroundColor: bgColor }}>
      <div className="greeting-icon">{icon}</div>
      <h2>{greetingMessage}</h2>
    </div>
  );
};

export default Greeting;
