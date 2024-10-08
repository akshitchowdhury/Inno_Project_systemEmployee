import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loggedInUser } from '../Reducers/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';

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
      .catch((err) =>{
        console.error(err)
        alert("Inavlid credentials..Please try again")
      });
      
    };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Login to Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <div className='flex flex-row gap-6'>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <Link to="/forgotPassword"         
            
            className="w-full  hover:underline text-indigo-500  font-light p-2 rounded-lg transition-colors duration-300">
            Forgot Password
          </Link>
          </div>
        </form>
        {error && <p className="text-red-500 text-center">Please Log in to your profile</p>}
      </div>
    </div>
  );
};

export default Auth;
