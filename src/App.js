import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import NowPlaying from "./pages/Nowplaying";
import Popular from "./pages/Popular";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import Favorite from "./pages/Favorite";
const basename = import.meta.env.DEV ? "/" : "/my-react-app/";
function App() {
    return (_jsx(Router, { basename: basename, children: _jsxs("div", { className: "flex bg-customDark min-h-screen", children: [_jsx("div", { className: "w-18", children: _jsx(Sidebar, {}) }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(Navbar, {}), _jsx("div", { className: "flex-1 p-4", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "home", replace: true }) }), _jsx(Route, { path: "/home", element: _jsx(Home, {}) }), _jsx(Route, { path: "/nowplaying", element: _jsx(NowPlaying, {}) }), _jsx(Route, { path: "/popular", element: _jsx(Popular, {}) }), _jsx(Route, { path: "/movies", element: _jsx(Movies, {}) }), _jsx(Route, { path: "/movie/:id", element: _jsx(MovieDetails, {}) }), _jsx(Route, { path: "/favorites", element: _jsx(Favorite, {}) })] }) })] })] }) }));
}
export default App;
