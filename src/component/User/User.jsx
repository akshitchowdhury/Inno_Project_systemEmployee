import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, loggedOutUser } from '../Reducers/AuthSlice';
import Auth from '../Authentication/Auth';

const User = () => {
  const dispatch = useDispatch();
  const[logOutStatus,setLogOutStatus] = useState(false)
  const { users, user, isAuthenticated } = useSelector((state) => state.auth);

  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Find the logged-in user based on stored credentials
  const verifiedUser = users.find(
    (u) => u.email === user?.email && u.password === user?.password
  );

  const handleLogout = (id) => {
    
    
    dispatch(loggedOutUser({ id, isLoggedIn: false }));
    !isAuthenticated && setLogOutStatus(!logOutStatus);
    console.log(`IsAuthenticated value: ${isAuthenticated}
      and logOutStatus value: ${logOutStatus}`);
  };

  // Only render the User component if the user is authenticated
  

  return (
    <>

        
    <div>
    <h1>User</h1>
    <p>{verifiedUser.username}</p>
    <p>{verifiedUser.email}</p>
    <p>{verifiedUser.password}</p>
    <p>{verifiedUser.department}</p>
    <button className="bg-red-500 p-4" onClick={() => handleLogout(verifiedUser._id)}>Logout</button>
        </div>
      
    </>
  );
  
};

export default User;
