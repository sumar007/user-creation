import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Allows redirect after successful creation
import './AddUser.css';

const AddUser = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // To navigate after successful operation

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/v1/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
        credentials: 'include', // Include cookies for authentication
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message); // Display success message
        alert("User created successfully.");
        setUserId('');
        setPassword('');
        setError('');
        navigate('/admin/dashboard'); // Redirect to the dashboard
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create user.');
        setSuccessMessage('');
      }
    } catch (err) {
      setError('An error occurred while creating the user.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="add-user-container">
      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
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
        <button type="submit">Add User</button>
      </form>

      {error && <p className="error-message">{error}</p>} 
      {successMessage && <p className="success-message">{successMessage}</p>} 
    </div>
  );
};

export default AddUser;
