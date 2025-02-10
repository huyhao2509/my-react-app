import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Home, Flame, Compass, Film, Heart } from "lucide-react";
const Sidebar = () => {
    return (_jsx("div", { className: "h-screen w-20 bg-customDark text-gray-400 flex flex-col justify-center fixed left-0 top-0", children: _jsxs("div", { className: "flex flex-col gap-6 mt-10", children: [_jsx(SidebarItem, { to: "/", icon: _jsx(Home, { size: 18 }), text: "Home" }), _jsx(SidebarItem, { to: "/nowplaying", icon: _jsx(Flame, { size: 18 }), text: "Trending" }), _jsx(SidebarItem, { to: "/popular", icon: _jsx(Compass, { size: 18 }), text: "Explore" }), _jsx(SidebarItem, { to: "/movies", icon: _jsx(Film, { size: 18 }), text: "Movies" }), _jsx(SidebarItem, { to: "/favorites", icon: _jsx(Heart, { size: 18 }), text: "Favorite" })] }) }));
};
const SidebarItem = ({ to, icon, text }) => {
    return (_jsxs(Link, { to: to, className: "flex flex-col items-center cursor-pointer hover:text-white transition", children: [icon, _jsx("span", { className: "text-xs mt-1", children: text })] }));
};
export default Sidebar;
