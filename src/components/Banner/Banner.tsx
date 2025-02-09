import React from 'react';

export default function Banner() {
  return (
    <div className="w-full flex justify-center py-6 ">
      <div className="container bg-banner w-[70%] h-[300px] sm:h-[400px] lg:h-[500px] bg-cover bg-center rounded-lg relative overflow-hidden">
        <div className="absolute left-8 top-1/3 space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            Hitman's Wife's
            <span className="block">Bodyguard</span>
          </h1>
          <p className="text-yellow-500">Releasing 23 July</p>
          <button className="bg-yellow-500 text-black px-4 py-2 rounded-full">
            Watch the trailer
          </button>
        </div>
      </div>
    </div>
  );
}
