// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios'; // for making HTTP requests
import { useNavigate } from 'react-router-dom'; // for navigation after registration

const Register = () => {
  // State variables for user input and registration errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    // Check if passwords match before submitting
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Make POST request to the backend with user data
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });

      // If registration is successful, navigate to the login page
      navigate('/login');

    } catch (err) {
      setError('Error during registration, please try again'); // Set error if registration fails
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Set email state on change
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Set password state on change
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Set confirmPassword state on change
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
