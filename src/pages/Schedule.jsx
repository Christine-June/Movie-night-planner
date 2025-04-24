import { useEffect, useState } from 'react';

const Schedule = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/movies')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch movies');
        return res.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-700">Loading schedule...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Scheduled Movies</h2>
      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies scheduled yet.</p>
      ) : (
        <ul className="space-y-4">
          {movies.map((movie) => (
            <li key={movie.id} className="border p-4 rounded-md bg-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-gray-600">Genre: {movie.genre}</p>
              <p className="text-gray-600">Time: {movie.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Schedule;
