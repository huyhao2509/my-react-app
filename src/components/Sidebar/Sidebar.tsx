import React from "react";
import { Home, Flame, Compass, Film, Heart } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-20 text-gray-400 flex flex-col items-center justify-center fixed left-0 top-0">
      <div className="flex flex-col gap-6 mt-10">
        <SidebarItem icon={<Home size={18} />} text="Home" />
        <SidebarItem icon={<Flame size={18} />} text="Trending" />
        <SidebarItem icon={<Compass size={18} />} text="Explore" />
        <SidebarItem icon={<Film size={18} />} text="Movies" />
        <SidebarItem icon={<Heart size={18} />} text="Favorite" />
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: JSX.Element;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer hover:text-gray-200 transition">
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default Sidebar;
