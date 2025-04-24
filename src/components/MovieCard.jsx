// src/components/MovieCard.jsx
import React from "react";

const MovieCard = ({ title, year, onClick }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer w-full max-w-sm"
      onClick={onClick}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {year && <p className="text-sm text-gray-500 mt-2">Released: {year}</p>}
      </div>
    </div>
  );
};

export default MovieCard;