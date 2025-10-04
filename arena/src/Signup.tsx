import React, { useState } from 'react';
import './Signup.css';

type ApiResponse = { id?: number; username?: string; message?: string };

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch('http://localhost:3334/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data: ApiResponse = await res.json();
      if (!res.ok) {
        return setMessage(data.message || 'SignUp failed');
      }

      setMessage(`Account created for ${data.username}`);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.log(err);
      setMessage('Network error');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <br />
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password: <br />
          <input
            type='text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type='submit'>Create Account</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
