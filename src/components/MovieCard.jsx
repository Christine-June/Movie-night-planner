import React, { useEffect, useState } from "react";
import { fetchMoviePoster } from "../api/fetchPoster";

const MovieCard = ({ title, year, onClick }) => {
  const [poster, setPoster] = useState("");

  useEffect(() => {
    const getPoster = async () => {
      const posterUrl = await fetchMoviePoster(title);
      setPoster(posterUrl);
    };
    getPoster();
  }, [title]);

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer w-full max-w-sm"
      onClick={onClick}
    >
      <img
        src={poster}
        alt={title}
        className="w-full h-72 object-cover"
        onError={(e) =>
          (e.target.src = "https://via.placeholder.com/300x450?text=No+Image")
        }
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        {year && <p className="text-sm text-gray-500 mt-1">Released: {year}</p>}
      </div>
    </div>
  );
};

export default MovieCard;
