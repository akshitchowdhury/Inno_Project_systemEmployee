import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, loggedInUSer } from '../Reducers/AuthSlice';

const Auth = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[logInStatus,setLogInStatus] = useState(false)
    const dispatch = useDispatch();
    
  const {  isAuthenticated } = useSelector((state) => state.auth);
    const handleSubmit = (e)=>{
        e.preventDefault();
        setLogInStatus(!isAuthenticated)
        dispatch(loggedInUSer({email, password, isLoggedIn:logInStatus}))
        console.log(`IsAuthenticated value: ${isAuthenticated}`)
    }
    useEffect(()=>{
        dispatch(fetchUsers())
    },[dispatch])
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
            <button>Login</button>
        </form>      
    </div>
  )
}

export default Auth
