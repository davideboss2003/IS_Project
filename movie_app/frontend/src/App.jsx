// src/App.jsx or /src/App.js
import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Admin from "./pages/Admin"; // <-- Import the Admin page
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Favorites Page */}
          <Route path="/favorites" element={<Favorites />} />

          {/* Movie Details Page */}
          <Route path="/movie/:id" element={<MovieDetail />} />

          {/* Admin Page */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
