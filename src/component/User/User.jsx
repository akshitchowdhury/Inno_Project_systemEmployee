import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { loggedOutUser } from '../Reducers/AuthSlice';
import Message from '../Messages/Message';

const User = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(loggedOutUser())
      .unwrap() // This allows you to handle the result of the thunk
      .then(() => {
        localStorage.removeItem('token'); 
        window.location.reload();
        navigate('/login'); 
      })
      .catch((err) => console.error(err)); // Handle errors here
};

  return (
    <>
    <Link to="/sendMail">Send Mail</Link>
    <Link to="/receiveMail">Check Mail</Link>
    <div className="user-container">
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
      <p>Department: {user.department}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
    {/* <Message/> */}
    </>
    
  );
};

export default User;
