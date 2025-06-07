import React, { useState, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search_icon.svg'
import bell from '../../assets/bell_icon.svg'
import profile from '../../assets/profile_img.png'
import caret from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'
import { useNavigate, Link } from 'react-router-dom'

const TMDB_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWIxMjhjNTdmYjliYjVlMDU0ZDkyZDU2ODVjMzE3MSIsInN1YiI6IjY2NzEyZDMzODcwNzZhZWMzNmRhMjgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u8K5SwVrDv4-fxDaP__RwwGWw3cDwxGNwXYze60LsNA';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownResults, setDropdownResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setDropdownResults([]);
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (value.trim()) {
      timeoutRef.current = setTimeout(async () => {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(value)}&language=en-US&page=1`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: TMDB_API_KEY
          }
        });
        const data = await res.json();
        setDropdownResults((data.results || []).slice(0, 6));
        setShowDropdown(true);
      }, 300); // debounce
    } else {
      setDropdownResults([]);
      setShowDropdown(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 150); // allow click
  };

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
        <div className="navbar_search" style={{ position: 'relative' }}>
          <img src={search} alt="" className='icons' />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleSearch}
            onFocus={() => searchTerm && setShowDropdown(true)}
            onBlur={handleBlur}
            autoComplete="off"
          />
          {showDropdown && dropdownResults.length > 0 && (
            <div className="search-dropdown">
              {dropdownResults.map(movie => (
                <Link
                  to={`/player/${movie.id}`}
                  className="search-dropdown-item"
                  key={movie.id}
                  onClick={() => {
                    setShowDropdown(false);
                    setSearchTerm('');
                  }}
                >
                  <img
                    src={movie.backdrop_path ? 'https://image.tmdb.org/t/p/w92' + movie.backdrop_path : ''}
                    alt={movie.title}
                    style={{ width: 50, height: 28, objectFit: 'cover', marginRight: 8 }}
                  />
                  <span>{movie.title || movie.original_title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
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
