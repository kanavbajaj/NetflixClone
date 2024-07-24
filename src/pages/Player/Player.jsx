import React, { useEffect,useState } from 'react'
import './Player.css'
import backArrow_icon from '../../assets/back_arrow_icon.png'
import { useParams} from 'react-router-dom'
const Player = () => {
  const {id}=useParams(); 
  const[apiData,setApidata]=useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWIxMjhjNTdmYjliYjVlMDU0ZDkyZDU2ODVjMzE3MSIsIm5iZiI6MTcxOTMyMDMzMS40ODcxMjcsInN1YiI6IjY2NzEyZDMzODcwNzZhZWMzNmRhMjgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QgyuwbeJDQyvOUj9kmsHLzSee-Y84XnSJPM-UaUZYMk'
    }
  };
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApidata(response.results[0]))
    .then(response => console.log(response))
    .catch(err => console.error(err));
  
  },[])
  
  return (
    <div className='player'>
     <img src={backArrow_icon} alt="" />
     <iframe width="702" height="395" src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
     <div className="player_info">
      <p>{apiData.published_at.slice(0,10)}</p>
      <p>{apiData.name}</p>
      <p>{apiData.type}</p>
      


     </div>
    </div>
  )
}

export default Player
