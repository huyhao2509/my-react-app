import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <Router>
      <div className="flex bg-customDark min-h-screen">
        {/* Sidebar có width cố định */}
        <div className="">
          <Sidebar />
        </div>

        {/* Nội dung chính */}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 p-4"> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              {/* <Route path="/popular" element={<Popular />} /> */}
              {/* <Route path="/movie/:id" element={<MovieDetails />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
