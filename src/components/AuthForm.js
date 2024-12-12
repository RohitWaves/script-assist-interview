import React, { useState } from 'react';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './AuthForm.css'; // Import the CSS file

const AuthForm = () => {
  const [email, setEmail] = useState(''); // Change username to email
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Email validation: check if it's empty and in the correct format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation: check if it's empty and at least 6 characters
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // If no errors, proceed with login
    if (Object.keys(newErrors).length === 0) {
      login({ email, password });
      navigate('/dashboard'); // Example navigation to dashboard
    } else {
      setErrors(newErrors); // Show errors
    }
  };

  return (
    <div className="auth-form-container">
      <Box className="auth-form-box">
        <form onSubmit={handleSubmit}>
          <Group direction="column" grow>
            {/* Email field */}
            <TextInput
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email} // Error message will be shown in red
            />
            {/* Password field */}
            <TextInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password} // Error message will be shown in red
            />
            <Button type="submit">Login</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default AuthForm;
