import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import Search from './pages/Search'
import {Routes,Route, useNavigate} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
const App = () => {
  const navigate=useNavigate();
useEffect(()=>{
  onAuthStateChanged(auth, async(user) => {
    if (user) {
      console.log(user)
      navigate('/');
      } else {
        console.log("no user")
        navigate('/login');
        }
        })
},[])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
      
    </div> 
  )
}

export default App
