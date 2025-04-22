// src/components/Routes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // MovieList by Carlos (likely rendered inside Home)
import AddMovie from '../AddMovieForm'; // AddMovieForm by Regina
import Schedule from './pages/Schedule'; // Schedule by Michael

/**
 * Application route configuration
 * @returns {JSX.Element} Route structure
 */
function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-movie" element={<AddMovie />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  );
}

export default RoutesConfig;
