import React, { useEffect, useState } from 'react'

const User = () => {
    
    const[users,setUsers] = useState([])
    
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
    <div>
        {
            users.map((user,index)=>(
                <>
                <div key={user._id}>
                    <p>{user.username}</p>
                    </div>
                </>
            ))
        }
    </div>
  )
}

export default User
