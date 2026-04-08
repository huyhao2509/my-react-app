import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Flame, Compass, Film, Heart } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-20 md:w-24 border-r border-white/10 bg-[#0c0f18]/80 backdrop-blur-xl">
      <div className="flex h-full flex-col items-center justify-between py-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-center leading-tight shadow-lg">
          <p className="text-[10px] font-semibold tracking-[0.24em] text-cyan-300">MV</p>
          <p className="text-[10px] text-gray-300">STUDIO</p>
        </div>

        <nav className="flex flex-col gap-4">
          <SidebarItem to="/home" icon={<Home size={18} />} text="Home" />
          <SidebarItem to="/nowplaying" icon={<Flame size={18} />} text="Now" />
          <SidebarItem to="/popular" icon={<Compass size={18} />} text="Hot" />
          <SidebarItem to="/movies" icon={<Film size={18} />} text="Movies" />
          <SidebarItem to="/favorites" icon={<Heart size={18} />} text="Liked" />
        </nav>

        <p className="text-[10px] tracking-[0.18em] text-gray-500">REACT</p>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group relative flex w-14 flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs transition-all duration-300 md:w-16 ${
          isActive
            ? "bg-cyan-400/20 text-cyan-200 ring-1 ring-cyan-300/30"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }`
      }
    >
      <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>
      <span className="text-[11px] tracking-wide">{text}</span>
    </NavLink>
  );
};

export default Sidebar;
