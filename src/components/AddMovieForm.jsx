import { useState } from 'react';
import { toast } from 'react-hot-toast';
import MovieList from './AddMovieList';

const AddMovieForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Show suggestions only for title field
    if (name === 'title') {
      if (value.length > 1) {
        setShowSuggestions(true);
        setFilteredMovies(
          MovieList.filter(movie =>
            movie.toLowerCase().includes(value.toLowerCase())
          ).slice(0, 5)
        );
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      title: suggestion
    }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('Movie title is required');
      return;
    }
    if (!formData.genre.trim()) {
      toast.error('Genre is required');
      return;
    }
    if (!formData.time) {
      toast.error('Show time is required');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add movie');
      }

      toast.success('Movie added successfully!');
      setFormData({ title: '', genre: '', time: '' });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Add a New Movie</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title with autocomplete */}
              <div className="relative">
                <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
                  Movie Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Start typing to see suggestions"
                  autoComplete="off"
                  disabled={isSubmitting}
                />
                {showSuggestions && filteredMovies.length > 0 && (
                  <ul className="absolute z-10 mt-1 w-full bg-slate-700 border border-slate-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredMovies.map((movie, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-slate-600 cursor-pointer text-white"
                        onClick={() => handleSuggestionClick(movie)}
                      >
                        {movie}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Genre dropdown */}
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-slate-300 mb-1">
                  Genre
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                >
                  <option value="">Select a genre</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Horror">Horror</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Romance">Romance</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Animation">Animation</option>
                  <option value="Documentary">Documentary</option>
                </select>
              </div>

              {/* Time input */}
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-slate-300 mb-1">
                  Show Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition duration-300 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding Movie...
                    </span>
                  ) : (
                    'Add Movie'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieForm;