import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Schedule = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    genre: '',
    time: ''
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/movies');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        toast.error('Error fetching movies');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredMovies = movies.filter(movie => {
    return (
      (filter.genre === '' || movie.genre.toLowerCase().includes(filter.genre.toLowerCase())) &&
      (filter.time === '' || movie.time.includes(filter.time))
    );
  });

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete movie');

      setMovies(prev => prev.filter(movie => movie.id !== id));
      toast.success('Movie deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">Scheduled Movies</h2>
      
      {/* Filter section */}
      <div className="bg-slate-800 rounded-lg p-4 mb-8 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Filter Movies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="genre-filter" className="block text-sm font-medium text-slate-300 mb-1">
              Genre
            </label>
            <input
              type="text"
              id="genre-filter"
              name="genre"
              value={filter.genre}
              onChange={handleFilterChange}
              placeholder="Filter by genre"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="time-filter" className="block text-sm font-medium text-slate-300 mb-1">
              Time
            </label>
            <input
              type="time"
              id="time-filter"
              name="time"
              value={filter.time}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="text-center py-12 bg-slate-800 rounded-lg shadow-lg">
          <p className="text-xl text-slate-300">
            {movies.length === 0 ? 'No movies scheduled yet.' : 'No movies match your filters.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                <p className="text-slate-300 mb-1">
                  <span className="font-semibold">Genre:</span> {movie.genre}
                </p>
                <p className="text-slate-300 mb-4">
                  <span className="font-semibold">Time:</span> {movie.time}
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Schedule;