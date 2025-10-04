// In: Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import'./Login.css'; 

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 🚨 PATH IS CORRECT: POST to http://localhost:3334/user/login
      const res = await fetch('http://localhost:3334/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        // Make sure your backend uses the same key names (user and password)
        body: JSON.stringify({ user: username, password }), // Changed to 'user' to match controller
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Login success!');
        navigate('/dashboard');
      } else {
        // Now correctly handles errors returned as JSON from the backend
        setMessage(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err); // Changed console.log to console.error for better visibility
      setMessage('Network catch all error or client-side JSON parsing error.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label>Password</label>
        <input
          type='password' // 💡 Recommendation: Use type='password' for security
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type='submit'>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;