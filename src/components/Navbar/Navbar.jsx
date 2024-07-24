import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search_icon.svg'
import bell from '../../assets/bell_icon.svg'
import profile from '../../assets/profile_img.png'
import caret from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar_left">
        <img src={logo} alt="" />
        <ul>
        <li>Home</li>
        <li>TV Shows</li>
        <li>Movies</li>
        <li>My List</li>
        <li>New And Popular</li>
        </ul>
      </div>
      <div className="navbar_right">
        <img src={search} alt=""  className='icons' />
        <p>Children</p>
        <img src={bell} alt=""  className='icons' />
        <div className="navbar_profile">
        <img src={profile} alt=""  className='profile' />
        <img src={caret} alt=""   />
        <div className="dropdown">
          <p onClick={()=>{logout()}}>Sign out of Netflix</p>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Navbar
