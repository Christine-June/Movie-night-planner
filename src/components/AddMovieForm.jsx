import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AddMovieForm = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Separate validation for each field
    if (!title.trim()) {
      toast.error('Please enter a movie title');
      return;
    }
    if (!genre.trim()) {
      toast.error('Please enter a movie genre');
      return;
    }
    if (!time.trim()) {
      toast.error('Please select a show time');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:3001/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, genre, time }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add movie. Server responded with an error.');
      }

      toast.success('Movie added successfully!');
      setTitle('');
      setGenre('');
      setTime('');
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred while adding the movie');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-600 flex items-center justify-center p-6">
  <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
    <Toaster position="top-center" />
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add a New Movie</h2>
    <form onSubmit={handleSubmit}>
      {/* Title input */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
          Movie Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g. Interstellar"
          disabled={isSubmitting}
        />
      </div>

      {/* Genre input */}
      <div className="mb-4">
        <label htmlFor="genre" className="block text-gray-700 font-semibold mb-2">
          Genre
        </label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g. Sci-Fi"
          disabled={isSubmitting}
        />
      </div>

      {/* Time input */}
      <div className="mb-6">
        <label htmlFor="time" className="block text-gray-700 font-semibold mb-2">
          Show Time
        </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition duration-300 ${
          isSubmitting ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            Adding...
          </span>
        ) : (
          'Add Movie'
        )}
      </button>
    </form>
  </div>
</div>
  );
};

export default AddMovieForm;