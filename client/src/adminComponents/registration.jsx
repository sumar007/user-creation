import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css'; // Import the CSS file

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setSuccess('Admin registered successfully! Please check your email for verification code.');
        alert("Registration successful. Please check your email for verification code.");
        navigate('/admin/verify-email'); // Redirect to verification page
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed.');
        setSuccess(null);
      }
    } catch (error) {
      setError('An error occurred while registering. Please try again later.');
      alert('An error occurred while registering. Please try again later.');
      setSuccess(null);
    }
  };

  return (
    <div className="registration-container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <Link to="/admin/login" className="register-link">
        <button className="login-button">Login</button>
        </Link>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Registration;
