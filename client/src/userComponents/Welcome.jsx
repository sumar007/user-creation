import React from 'react';
import './Welcome.css'; // CSS file for styling and animations

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-message">Welcome to Our Platform!</h1>
      <p className="welcome-text">
        We're delighted to have you here. Explore our features, connect with others, and enjoy your journey with us. 
        If you have any questions, feel free to reach out to our support team.
      </p>
    </div>
  );
};

export default Welcome;
