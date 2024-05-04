import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Import the CSS file

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // For redirecting after successful login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Ensure cookies are included
      });
console.log(response)
      if (response.ok) {
        alert('Successfully logged in');
        navigate('/admin/dashboard'); // Redirect to the admin dashboard upon success
        setErrorMessage(''); // Clear error messages
      } else {
        const errorData = (await response.json()).message;
        setErrorMessage(errorData || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
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
        <button className="login-button" type="submit">Login</button>
        <Link to="/admin/register" className="register-link">
        <button className="register-button">Register</button>
        </Link>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AdminLogin;
