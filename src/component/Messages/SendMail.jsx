import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Reducers/AuthSlice';
import { Link } from 'react-router-dom';

const SendMail = () => {
  const dispatch = useDispatch();
  const[recipient,setRecipient] = useState('')
  const[message,setMessage] = useState('')
  const { users, user,loading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchUsers()); // fetch users when the component is mounted
  }, [dispatch]);

  const handleSubmission = (e) => {
    e.preventDefault();
    
    // const sender = user.username
    
    const senderEmail = user.email
    console.log(`Form submitted with username: ${user.username} from ${senderEmail}`);

    const mailData = {
        sender_email: senderEmail,
        receiver_username: recipient,
        messages: [message]
    }
        const sendMail = async ()=>{
            try {
            const response = await fetch('/messages/sendAdmin',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mailData),
            })
            const data = await response.json();
            console.log(data);
            if(!response.ok){
                throw new Error(data.message);
            }
        
            alert(`Message sent successfully!`);
            setMessage('');
            setRecipient('');

        }
        catch (error) {
            console.error('Error sending message:', error);
          alert('Failed to send message.');
        }
    }

    sendMail();
  };

  return (
    <div>
    <Link to="/user">Home</Link>
      <h1>Send your email here</h1>
      <form onSubmit={handleSubmission}>
        {/* Display loading or error state if necessary */}
        {loading && <p>Loading users...</p>}
        {error && <p>Error fetching users: {error}</p>}

        {/* Display checkboxes for each user */}
        {users && users.length > 0 ? (
          users.slice(users.length-1).map((user) => (
            <div key={user.id}>
              <input type="checkbox" id={user.id} onChange={(e) => setRecipient(user.username)} 
              name="users" checked={recipient === user.username} value={recipient} />
              <label htmlFor={user.id}>{user.username}</label>
            </div>
          ))
        ) : (
          <p>No users available.</p>
        )}

        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here" />
        <button  type='submit'>Send</button>
      </form>
    </div>
  );
};

export default SendMail;
