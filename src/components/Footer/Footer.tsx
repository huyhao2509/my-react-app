import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="container mt-10 px-4 pb-8 md:px-6">
      <div className="glass-panel rounded-2xl px-6 py-6 text-center shadow-xl">
        <h2 className="text-2xl font-extrabold tracking-wide text-gradient">MoviesVennie</h2>
        <p className="mt-2 text-sm text-gray-400">All Rights Reserved © 2026</p>
        <div className="mt-4 flex justify-center gap-4">
          <a href="#" className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:text-blue-400">
          <Facebook size={24} />
        </a>
          <a href="#" className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:text-cyan-300">
          <Twitter size={24} />
        </a>
          <a href="#" className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:text-pink-400">
          <Instagram size={24} />
        </a>
          <a href="#" className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:text-red-400">
          <Youtube size={24} />
        </a>
        </div>
      </div>
    </footer>
  );
}
