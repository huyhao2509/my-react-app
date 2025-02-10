import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import NowPlaying from "./pages/NowPlaying"; // Import trang Now Playing
import Popular from "./pages/Popular";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies"; // Import trang Movies
import Favorite from "./pages/Favorite"; // Import trang Favorite

function App() {
  return (
    <Router>
      <div className="flex bg-customDark min-h-screen">
        {/* Sidebar có width cố định */}
        <div className="w-18">
          <Sidebar />
        </div>

        {/* Nội dung chính */}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nowplaying" element={<NowPlaying />} /> 
              <Route path="/popular" element={<Popular />} />
              <Route path="/movies" element={<Movies />} /> 
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorite/>} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
