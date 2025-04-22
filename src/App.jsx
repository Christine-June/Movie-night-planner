// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/NavBar'; // Navbar by Boniface (corrected file name)
import RoutesConfig from './components/Routes'; // Centralized routes (corrected path)

/**
 * Root application component with layout
 * @returns {JSX.Element} App layout
 */
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header with Navbar */}
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <Navbar />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RoutesConfig />
        </main>

        {/* Footer (Optional, can be removed if not needed) */}
        <footer className="bg-gray-800 text-white text-center py-4">
          <p className="text-sm">&copy; 2025 Invictus Movie App</p>
        </footer>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              border: '1px solid #e5e7eb',
            },
            success: {
              style: {
                borderColor: '#10b981',
              },
            },
            error: {
              style: {
                borderColor: '#ef4444',
              },
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
