import React, { useState } from 'react';
import './ForgetPassword.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'; // For navigation after successful update

const ForgetPassword = () => {
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // For redirecting after successful password change

  const handleChangePassword = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:4000/api/v1/forget-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Data format
        },
        body: JSON.stringify({ userId, newPassword }), // Data to be sent to the backend
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message); // Display success message
        alert("Password changed successfully.");
        navigate('/user-login'); // Redirect to user login after successful password change
        setErrorMessage(''); // Clear error message
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to change password.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="forget-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
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
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>} 
      {successMessage && <p className="success-message">{successMessage}</p>} 
    </div>
  );
};

export default ForgetPassword;
