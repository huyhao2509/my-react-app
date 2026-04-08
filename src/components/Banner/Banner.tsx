import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <section className="container px-4 pt-4 md:px-6 md:pt-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
        <div className="absolute inset-0 bg-banner bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070f]/90 via-[#0b1020]/70 to-[#0f172a]/20" />
        <div className="absolute -right-20 top-8 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative z-10 px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-20">
          <div className="fade-up inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-cyan-200">
            <Sparkles size={14} /> FEATURED PREMIERE
          </div>

          <h1 className="fade-up delay-100 mt-4 max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Hitman's Wife's <span className="text-gradient block">Bodyguard</span>
          </h1>

          <p className="fade-up delay-200 mt-4 max-w-lg text-sm text-slate-200 sm:text-base">
            Một hành trình hành động, hài hước và bùng nổ. Khám phá trailer mới nhất và cập nhật lịch phát hành.
          </p>

          <div className="fade-up delay-300 mt-7 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-orange-400 px-5 py-3 text-sm font-semibold text-[#1a1307] transition hover:bg-orange-300">
              <Play size={16} /> Watch Trailer
            </button>
            <Link
              to="/movies?page=1"
              className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Browse Movies
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
