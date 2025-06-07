import React, { useEffect,useState } from 'react'
import './Player.css'
import backArrow_icon from '../../assets/back_arrow_icon.png'
import { useParams, useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebase'
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'

const Player = () => {
  const {id}=useParams(); 
  const navigate = useNavigate();
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
    .catch(err => console.error(err));

    // Save movie ID to user history in Firestore
    const saveToHistory = async () => {
      const user = auth.currentUser;
      if (user) {
        console.log("Current user UID:", user.uid);
        const userDocRef = doc(db, 'user', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          console.log("User doc exists, updating history...");
          await updateDoc(userDocRef, {
            history: arrayUnion(id)
          });
        } else {
          console.log("User doc does not exist, creating with history...");
          await setDoc(userDocRef, {
            history: [id]
          }, { merge: true });
        }
      } else {
        console.log("No user is logged in.");
      }
    };
    saveToHistory();
  },[])
  
  return (
    <div className='player'>
     <img src={backArrow_icon} alt="" onClick={() => navigate(-1)} style={{cursor: 'pointer'}} />
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
