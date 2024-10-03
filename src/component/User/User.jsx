import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../Reducers/AuthSlice';

const User = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);

  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id}>{user.username}</div>
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default User;
