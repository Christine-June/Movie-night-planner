import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Schedule() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/movies")
      .then((response) => {
        const scheduledMovies = response.data.filter((movie) => movie.time);
        setMovies(scheduledMovies);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Scheduled Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} - {movie.time}
          </li>
        ))}
      </ul>
    </div>
  );
}
