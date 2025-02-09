import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-customDark text-white text-center py-2">
      <h2 className="text-2xl font-bold">MoviesVennie</h2>
      <p className="text-sm text-gray-400">All Rights Reserved © 2025</p>
      <div className="flex justify-center gap-5 mt-3">
        <a href="#" className="text-gray-400 hover:text-blue-500 transition-all">
          <Facebook size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-400 transition-all">
          <Twitter size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-pink-500 transition-all">
          <Instagram size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-red-500 transition-all">
          <Youtube size={24} />
        </a>
      </div>
    </div>
  );
}
