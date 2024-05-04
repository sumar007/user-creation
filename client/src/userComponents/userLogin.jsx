import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import "./UserLogin.css"; // CSS file for styling

const UserLogin = () => {
  // State variables for userId, password, and error handling
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // To navigate after successful login

  // Handle form submission for login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch("http://localhost:4000/api/v1/user-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
        credentials: "include",
      });

      if (response.ok) {
        alert("Successfully logged in");
        navigate("/user/welcome");
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed."); 
      }
    } catch (error) {
      setError("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="user-login-container">
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
        <button className="user-login-button" type="submit">
          Login
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {/* Link for "Forgot Password" */}
      <p className="forgot-password">
        <Link to="/user/forgetpassword">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default UserLogin;
