import React, { useEffect, useState } from 'react'

const UserProfile = ({users, email, password}) => {
    const[userList,setUsers] = useState([])

    const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:3000/users', {
            method: 'GET',
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
    
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
    
      useEffect(()=>{
        fetchUsers()
      },[users])
    
  return (
    <>
    <h1>User Profile</h1>
    {
        users.slice(0,1).map((user,index)=>{
            const verifiedUser = userList.find((user) => user.email === email && user.password === password);
            return(
            <>
            <h3>{verifiedUser ? verifiedUser.username : ''}</h3>
            <p>{verifiedUser ? verifiedUser.email : ''}</p>
            
            <p>{verifiedUser ? verifiedUser.department : ''}</p>
            </>
            )
    })
    }
    </>
  )
}

export default UserProfile
