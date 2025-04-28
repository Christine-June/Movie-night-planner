import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar.jsx";
import RoutesConfig from "./Routes.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <NavBar />

        <main className="flex-1">
          <RoutesConfig />
        </main>

        <footer className="bg-slate-950 text-white text-center py-4">
          <p className="text-sm">&copy; 2025 Invictus Movie App</p>
        </footer>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1e293b",
              color: "#fff",
              border: "1px solid #334155",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
