import React, { useEffect, useState } from 'react';
import './TopActors.css';
import { Link } from 'react-router-dom';

const TMDB_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWIxMjhjNTdmYjliYjVlMDU0ZDkyZDU2ODVjMzE3MSIsInN1YiI6IjY2NzEyZDMzODcwNzZhZWMzNmRhMjgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u8K5SwVrDv4-fxDaP__RwwGWw3cDwxGNwXYze60LsNA';

const TopActors = () => {
  const [actors, setActors] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [actorMovies, setActorMovies] = useState([]);

  useEffect(() => {
    // Fetch trending people (actors) from TMDB
    const fetchTrendingActors = async () => {
      const res = await fetch('https://api.themoviedb.org/3/trending/person/day', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: TMDB_API_KEY
        }
      });
      const data = await res.json();
      // Filter only people who are known for acting and have a profile image
      const filtered = (data.results || []).filter(person => person.known_for_department === 'Acting' && person.profile_path);
      setActors(filtered.slice(0, 10)); // Show top 10 trending actors
    };
    fetchTrendingActors();
  }, []);

  const handleActorClick = async (actorId) => {
    setSelectedActor(actorId);
    setActorMovies([]);
    const res = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?language=en-US`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: TMDB_API_KEY
      }
    });
    const data = await res.json();
    setActorMovies(data.cast || []);
  };

  return (
    <div className="top-actors-section">
      <h2>Top Actors</h2>
      <div className="top-actors-list">
        {actors.map(actor => (
          <div
            key={actor.id}
            className={`actor-cutout${selectedActor === actor.id ? ' selected' : ''}`}
            onClick={() => handleActorClick(actor.id)}
            style={{ cursor: 'pointer' }}
            title={actor.name}
          >
            <img
              src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              alt={actor.name}
              className="actor-img"
            />
            <div className="actor-name">{actor.name}</div>
          </div>
        ))}
      </div>
      {selectedActor && (
        <div className="actor-movies">
          <h3>Movies</h3>
          <div className="actor-movies-list">
            {actorMovies.length === 0 && <div>Loading...</div>}
            {actorMovies.map(movie => (
              <Link to={`/player/${movie.id}`} className="actor-movie-card" key={movie.id}>
                <img
                  src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w300${movie.backdrop_path}` : ''}
                  alt={movie.title}
                />
                <p>{movie.title || movie.original_title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopActors; 