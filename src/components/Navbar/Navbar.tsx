import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("query") ?? "");

  useEffect(() => {
    setSearchValue(searchParams.get("query") ?? "");
  }, [searchParams]);

  const handleSearch = () => {
    const query = searchValue.trim();

    if (query) {
      navigate(`/movies?query=${encodeURIComponent(query)}&page=1`);
    } else {
      navigate("/movies?page=1");
    }
  };

  return (
    <header className="sticky top-0 z-20 px-3 pt-4 md:px-4">
      <div className="container flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#121624]/80 px-4 py-3 shadow-xl backdrop-blur-lg md:flex-row md:items-center md:justify-between">
        <div className="text-xl font-bold tracking-wide text-white md:text-2xl">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="rounded-lg bg-cyan-400/20 px-2 py-1 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-300/30">
              LIVE
            </span>
            <span>MOVIE</span>
            <span className="text-orange-400">VENNIE</span>
          </Link>
        </div>

        <div className="flex min-w-0 items-center gap-3">
          <div className="w-full sm:w-[260px] md:w-[320px]">
            <Input
              placeholder="Search Movie"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onPressEnter={handleSearch}
              className="h-10 rounded-xl border border-white/10 bg-white/5 text-gray-100"
              suffix={
                <button
                  type="button"
                  onClick={handleSearch}
                  aria-label="Search movie"
                  className="rounded-lg bg-cyan-400/20 p-1 text-cyan-200 hover:bg-cyan-400/30"
                >
                  <SearchOutlined />
                </button>
              }
            />
          </div>

          <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-orange-300 sm:flex">
            <UserOutlined />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
