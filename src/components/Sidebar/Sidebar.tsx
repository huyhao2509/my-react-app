import React from "react";
import { Link } from "react-router-dom";
import { Home, Flame, Compass, Film, Heart } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-20 bg-customDark text-gray-400 flex flex-col justify-center fixed left-0 top-0">
      <div className="flex flex-col gap-6 mt-10">
        <SidebarItem to="/" icon={<Home size={18} />} text="Home" />
        <SidebarItem to="/nowplaying" icon={<Flame size={18} />} text="Trending" />
        <SidebarItem to="/popular" icon={<Compass size={18} />} text="Explore" />
        <SidebarItem to="/movies" icon={<Film size={18} />} text="Movies" />
        <SidebarItem to="/favorites" icon={<Heart size={18} />} text="Favorite" />
      </div>
    </div>
  );
};

interface SidebarItemProps {
  to: string;
  icon: JSX.Element;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, text }) => {
  return (
    <Link
      to={to}
      className="flex flex-col items-center cursor-pointer hover:text-white transition"
    >
      {icon}
      <span className="text-xs mt-1">{text}</span>
    </Link>
  );
};

export default Sidebar;
