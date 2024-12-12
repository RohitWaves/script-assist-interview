import React, { useState } from 'react';
import { TextInput,Button, Group, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './AuthForm.css'; // Import the CSS file

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length === 0) {
      login({ username, password });
      navigate('/dashboard'); // Example navigation
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="auth-form-container">
      <Box className="auth-form-box">
        <form onSubmit={handleSubmit}>
          <Group direction="column" grow>
            <TextInput
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username} // Error message will be shown in red
            />
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
