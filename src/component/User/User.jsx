import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loggedOutUser } from '../Reducers/AuthSlice';

const User = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(loggedOutUser())
      .unwrap()
      .then(() => {
        localStorage.removeItem('token');
        window.location.reload();
        navigate('/login');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-700">Welcome, {user.username}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
        <p className="text-gray-600">Email: <span className="text-gray-800">{user.email}</span></p>
        <p className="text-gray-600">Department: <span className="text-gray-800">{user.department}</span></p>

        <div className="flex justify-between space-x-4 mt-6">
          <Link to="/sendMail" className="w-full bg-blue-500 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg">
            Send Mail
          </Link>
          <Link to="/receiveMail" className="w-full bg-green-500 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg">
            Check Mail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
