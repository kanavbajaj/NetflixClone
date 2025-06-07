import React, { useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'
const TitleCards = ({title,category}) => {
  const [apiData,setApiData]=useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWIxMjhjNTdmYjliYjVlMDU0ZDkyZDU2ODVjMzE3MSIsInN1YiI6IjY2NzEyZDMzODcwNzZhZWMzNmRhMjgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u8K5SwVrDv4-fxDaP__RwwGWw3cDwxGNwXYze60LsNA'
    }
  };
  useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
  }, [category]);

  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list'>
      {apiData.map((cards,index)=>{
        return <Link to={`/player/${cards.id}`} className="card" key={index}>
          <img src={'https://image.tmdb.org/t/p/w500'+cards.backdrop_path} alt=""/>
          <p>{cards.original_title}</p>
          </Link>
      })}
      
    </div>
    </div>
  )
}
  


export default TitleCards
