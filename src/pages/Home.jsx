import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-center text-white"
      style={{
        backgroundImage: "url('src/Assets/Gladiator.jpeg')", // Replace with your image URL
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#000033', // Fallback color  
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded-lg">
        <h1 className="text-5xl font-extrabold mb-4 animate__animated animate__fadeIn animate__delay-1s">Welcome to Movie Night Planner</h1>
        <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-2s">
          Your one-stop app to schedule and plan your perfect movie nights with friends and family.
        </p>
        <Link
          to="/add-movie"
          className="px-6 py-3 bg-yellow-500 text-white rounded-md shadow-lg hover:bg-yellow-400 transition-all duration-300 animate__animated animate__fadeIn animate__delay-3s"
        >
          Add Your Movie
        </Link>

        <div className="mt-12 animate__animated animate__fadeIn animate__delay-4s">
          <p className="text-sm">
            Already scheduled a movie? Head over to the{' '}
            <Link to="/schedule" className="text-yellow-400 hover:text-yellow-300">
              Schedule
            </Link>{' '}
            page to view your upcoming shows.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
