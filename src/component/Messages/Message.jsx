import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Message = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [bgColor, setBgColor] = useState('red-500');
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            window.location.reload();
            setBgColor(prevColor => prevColor === 'red-500' ? 'green-500' : 'red-500'); // Change this to your actual endpoint
        }, 5000); // Refresh every 3 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [navigate]); // Adding navigate to the dependency array

    return (
        <div>
            {
                user ? (
                    <div className={`bg-${bgColor} p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500`}>
                        <p className="text-center">Your new message: {user.message}</p>
                    </div>
                ) : (
                    <p>No new messages</p>
                )
            }
        </div>
    );
};

export default Message;
