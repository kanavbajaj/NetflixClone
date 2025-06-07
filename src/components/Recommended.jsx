import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, onSnapshot, getDoc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const TMDB_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWIxMjhjNTdmYjliYjVlMDU0ZDkyZDU2ODVjMzE3MSIsInN1YiI6IjY2NzEyZDMzODcwNzZhZWMzNmRhMjgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u8K5SwVrDv4-fxDaP__RwwGWw3cDwxGNwXYze60LsNA';

const Recommended = () => {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    const user = auth.currentUser;
    if (!user) {
      setRecommended([]);
      setLoading(false);
      return;
    }
    const userDocRef = doc(db, 'user', user.uid);

    unsubscribe = onSnapshot(userDocRef, async (userDocSnap) => {
      if (!userDocSnap.exists() || !userDocSnap.data().history || userDocSnap.data().history.length === 0) {
        setRecommended([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const history = userDocSnap.data().history;
      const latestMovieId = history[history.length - 1];
      let genreIds = [];
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${latestMovieId}?language=en-US`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: TMDB_API_KEY
          }
        });
        const data = await res.json();
        if (data.genres) {
          genreIds = data.genres.map(genre => genre.id);
        }
      } catch (e) {
        setRecommended([]);
        setLoading(false);
        return;
      }
      if (!genreIds.length) {
        setRecommended([]);
        setLoading(false);
        return;
      }
      // Fetch movies from TMDB by these genres
      try {
        const recRes = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreIds.join(',')}&language=en-US&page=1`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: TMDB_API_KEY
          }
        });
        const recData = await recRes.json();
        setRecommended(recData.results || []);
      } catch (e) {
        setRecommended([]);
      }
      setLoading(false);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  if (loading) return <div>Loading recommendations...</div>;
  if (!recommended.length) return <div>No recommendations yet. Watch more movies!</div>;

  return (
    <div className="titlecards">
      <h2>Recommended for You</h2>
      <div className="card-list">
        {recommended.map(movie => (
          <Link to={`/player/${movie.id}`} className="card" key={movie.id}>
            <img src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path} alt={movie.title} />
            <p>{movie.title || movie.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommended; 