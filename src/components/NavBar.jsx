import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navbar Component
 * A responsive navigation bar for the Movie Night Planner app.
 * Includes links to "Home", "Add Movie", and "Schedule".
 * Uses Tailwind CSS for styling and is optimized for both desktop and mobile views.
 */
function NavBar() {
  // State for managing the visibility of the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // Hook to get the current location (route) to highlight the active link
  const location = useLocation();

  // Navigation links array for scalability and cleaner code
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Add Movie', path: '/add-movie' },
    { name: 'Schedule', path: '/schedule' },
  ];

  // Function to toggle the mobile menu open/closed
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo or Brand Name */}
          <div className="flex-shrink-0">
            {/* Link to the Home page */}
            <Link to="/" className="text-xl font-bold">
              Movie Night Planner
            </Link>
          </div>

          {/* Desktop Menu (visible on medium screens and above) */}
          <div className="hidden md:flex md:items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name} // Unique key for each link
                to={link.path} // Path for navigation
                // Dynamic styling: Highlight the active link
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.path
                    ? 'bg-blue-600 text-white' // Active link styles
                    : 'text-gray-300 hover:bg-blue-500 hover:text-white' // Default styles
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button (visible on small screens only) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu} // Toggle mobile menu visibility
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white"
              aria-controls="mobile-menu" // Accessibility attribute
              aria-expanded={isOpen} // Accessibility attribute
            >
              <span className="sr-only">Open main menu</span>
              {/* Conditional rendering: Hamburger icon or Close (X) icon */}
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (visible when isOpen is true) */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name} // Unique key for each link
                to={link.path} // Path for navigation
                onClick={() => setIsOpen(false)} // Close the menu when a link is clicked
                // Dynamic styling: Highlight the active link
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-blue-600 text-white' // Active link styles
                    : 'text-gray-300 hover:bg-blue-500 hover:text-white' // Default styles
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;