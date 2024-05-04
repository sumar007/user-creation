import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyEmail.css'; // Importing the corresponding CSS file

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/v1/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        alert("Verification successful. You can now login.");
        navigate('/admin/login'); // Redirect to login page on success
        setErrorMessage('');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Verification failed');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="verify-email-container">
      <h2>Verify Email</h2>
      <form className="verify-email-form" onSubmit={handleVerifyEmail}>
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
          <label>Verification Code:</label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify Email</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default VerifyEmail;
