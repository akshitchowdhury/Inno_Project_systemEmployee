import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Auth from './component/Authentication/Auth';
import User from './component/User/User';
import { checkLoggedIn } from './component/Reducers/authSlice';
import SendMail from './component/Messages/SendMail';
import Message from './component/Messages/Message';
import ForgotPassword from './component/Authentication/ForgotPassword';

const App = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  // Check if user is logged in when the app loads
  useEffect(() => {
    dispatch(checkLoggedIn());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while verifying token
  }

  return (
    <div className='p-4'>
    <Router>
      <Routes>
        <Route path='/sendMail' element={<SendMail/>} />
        <Route path='/receiveMail' element={<Message/>} />
        <Route path='/forgotPassword' element={<ForgotPassword/>} />
        {/* Route for login page */}
        <Route path="/login" element={!user ? <Auth /> : <Navigate to="/user" />} />

        {/* Route for user page (protected) */}
        <Route path="/user" element={user ? <User /> : <Navigate to="/login" />} />

        {/* Default route (redirect to login if not logged in) */}
        <Route path="*" element={user ? <Navigate to="/user" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
