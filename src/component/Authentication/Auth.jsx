import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const Auth = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const dispatch = useDispatch();

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
