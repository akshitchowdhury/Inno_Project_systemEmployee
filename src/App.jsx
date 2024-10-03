import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User from './component/User/User'
import Auth from './component/Authentication/Auth'

function App() {

  return (
    <>
      <Auth/>
      <User/>
    </>
  )
}

export default App
