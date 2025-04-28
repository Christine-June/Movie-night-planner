import { Link } from 'react-router-dom';

const Home = () => { 
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 py-16 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in">
          Welcome to <span className="text-blue-400">Movie Night</span> Planner
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-10 animate-fade-in animate-delay-200">
          Plan your perfect movie nights with friends and family. Discover, schedule, and enjoy cinema together.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-fade-in animate-delay-400">
          <Link
            to="/add-movie"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold text-lg transition duration-300 shadow-lg hover:shadow-xl"
          >
            Add New Movie
          </Link>
          
          <Link
            to="/schedule"
            className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-bold text-lg transition duration-300 shadow-lg hover:shadow-xl"
          >
            View Schedule
          </Link>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto animate-fade-in animate-delay-600">
          <h3 className="text-xl font-semibold text-white mb-3">Featured Movies</h3>
          <p className="text-slate-300 mb-4">
            Browse our collection of scheduled movies or add your own favorites to the lineup.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Inception', 'Interstellar', 'The Dark Knight', 'Parasite', 'Gladiator'].map((movie) => (
              <span key={movie} className="px-3 py-1 bg-slate-700 rounded-full text-sm text-white">
                {movie}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;