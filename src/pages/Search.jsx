import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const TMDB_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWIxMjhjNTdmYjliYjVlMDU0ZDkyZDU2ODVjMzE3MSIsInN1YiI6IjY2NzEyZDMzODcwNzZhZWMzNmRhMjgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u8K5SwVrDv4-fxDaP__RwwGWw3cDwxGNwXYze60LsNA';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const query = useQuery().get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: TMDB_API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        setResults(data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <div className="titlecards" style={{ minHeight: '60vh' }}>
      <h2>Search Results for "{query}"</h2>
      {loading && <div>Loading...</div>}
      {!loading && results.length === 0 && <div>No results found.</div>}
      <div className="search-grid">
        {results.filter(movie => movie.backdrop_path).map(movie => (
          <Link to={`/player/${movie.id}`} className="search-grid-item" key={movie.id}>
            <img src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path} alt={movie.title} />
            <p>{movie.title || movie.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search; 