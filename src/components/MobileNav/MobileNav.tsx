import { NavLink } from "react-router-dom";
import { Compass, Film, Flame, Heart, Home } from "lucide-react";

const navItems = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/nowplaying", label: "Now", icon: Flame },
  { to: "/popular", label: "Hot", icon: Compass },
  { to: "/movies", label: "Movies", icon: Film },
  { to: "/favorites", label: "Liked", icon: Heart },
] as const;

export default function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2 md:hidden">
      <div className="glass-panel mx-auto grid max-w-md grid-cols-5 gap-1 rounded-3xl px-2 py-2 shadow-2xl">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition ${
                isActive
                  ? "bg-cyan-400/20 text-cyan-100 ring-1 ring-cyan-300/25"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
