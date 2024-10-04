import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchEmplMail } from '../Reducers/AuthSlice';

const Message = () => {
    const { emailList } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [bgColor, setBgColor] = useState('bg-red-500');
    const dispatch = useDispatch();
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setBgColor(prevColor => prevColor === 'bg-red-500' ? 'bg-green-500' : 'bg-red-500');
        }, 5000); 
        dispatch(fetchEmplMail());
        
        return () => clearInterval(intervalId);
    }, [dispatch]);

    return (
        <div className="container mx-auto p-4">
            {/* Header with navigation */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Inbox</h1>
                <Link to="/sendMail" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                    Send Mail
                </Link>
            </div>

            {/* Emails List */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 text-left text-gray-600">Sender</th>
                            <th className="py-2 px-4 text-left text-gray-600">Receiver</th>
                            <th className="py-2 px-4 text-left text-gray-600">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emailList.map((email, index) => (
                            <tr
                                key={index}
                                className={`hover:bg-gray-50 border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                            >
                                <td className="py-3 px-4 font-medium text-gray-700">
                                    {email.sender_email}
                                </td>
                                <td className="py-3 px-4 text-gray-600">{email.receiver_username}</td>
                                <td className="py-3 px-4 text-gray-500 truncate">
                                    {email.messages[0] }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Message;
