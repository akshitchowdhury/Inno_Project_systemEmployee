import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User from './component/User/User'
import Auth from './component/Authentication/Auth'
import { useDispatch, useSelector } from 'react-redux'

function App() {

  const auth = useSelector((state) => state.auth);


  return (
    <>
    Hello
{
  auth.isAuthenticated ? (
    <User />
  ) : (
    <Auth />
  )
}
      {/* <Auth/> */}
      {/* <User/> */}
    </>
  )
}

export default App
