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
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Scheduled Movies</h2>
      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies scheduled yet.</p>
      ) : (
        // Use grid container
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="border p-4 rounded-md bg-gray-100 shadow-sm hover:bg-gray-200 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-gray-600">Genre: {movie.genre}</p>
              <p className="text-gray-600">Time: {movie.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Schedule;
