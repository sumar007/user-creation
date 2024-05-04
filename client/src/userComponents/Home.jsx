import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS for styles

const Home = () => {
  return (
    <section className="home-section">
      {/* Home content positioned over the background image */}
      <div className="home-content">
      <h3 className="home-title">Connecting People, Building Communities</h3>
<p className="home-subtitle">Join us and be a part of something extraordinary.</p>

        <div className="home-buttons">
          {/* Use simple HTML button with Link for navigation */}
          <Link to="/user-login">
            <button className="user-login-button">User Login</button>
          </Link>
        </div>
      </div>

      {/* Background image */}
      <img
        src="https://images.pexels.com/photos/19166324/pexels-photo-19166324/free-photo-of-woman-drinking-coffee-in-a-restaurant.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="home"
        className="home-image"
      />
    </section>
  );
};

export default Home;
