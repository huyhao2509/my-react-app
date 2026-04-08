import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 420);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0f111a] text-white">
      <div className="pointer-events-none absolute -top-40 -left-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 min-h-screen md:flex">
        <div className="hidden md:block md:w-24">
        <Sidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar />
          <div className="flex-1 px-3 pb-6 md:px-4">
            <div key={location.pathname} className="route-enter">
              <AppRoutes />
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          type="button"
          onClick={handleScrollTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 rounded-2xl border border-cyan-300/40 bg-cyan-400/20 p-3 text-cyan-100 shadow-xl backdrop-blur-md transition hover:bg-cyan-400/30"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}

export default App;
