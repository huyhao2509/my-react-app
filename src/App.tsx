import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import NowPlaying from "./pages/Nowplaying";
import Popular from "./pages/Popular";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import Favorite from "./pages/Favorite";

function App() {
  return (
    <div className="flex bg-customDark min-h-screen">
      <div className="w-18">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/nowplaying" element={<NowPlaying />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorite />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
