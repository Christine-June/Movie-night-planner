import React from "react";

const MovieCard = ({ title, description, poster }) => {
  const fallback = "/fallback-poster.jpg";

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden w-80">
      <img
        src={poster || fallback}
        onError={(e) => (e.target.src = fallback)}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
      </div>
    </div>
  );
};

export default MovieCard;
