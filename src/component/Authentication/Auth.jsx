import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loggedInUser } from '../Reducers/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loggedInUser({ email, password }))
      .unwrap()
      .then((response) => {
        localStorage.setItem('token', response.token); // Store the JWT token in localStorage
        navigate('/user'); // Redirect to user page after successful login
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Auth;
