import { useState } from "react";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "872a56ce8dffb321ded14ae4c6f4bbeb";

const MoviePopular = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const popularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_KEY}`,
        { headers: { accept: "application/json" } }
      );
      console.log("response data", response.data);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    popularMovies();
  });
  return (
    <div className="bg-slate-900">
      <header className="bg-black text-red-500 py-4 px-4">
        <h1 className="text-4xl font-bold text-center">Popular Movies</h1>
      </header>
      <div className="container mx-auto grid grid-cols-4 gap-8 pt-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => {
              navigate("/movie-details", { state: { id: movie.id } });
            }}
            className="block max-w-sm p-6 bg-slate-900  rounded-lg shadow hover:bg-gray-800  transition duration-300 hover:filter hover:blur-sm"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-fit object-cover"
            />
            <div className="p-2">
              <h2 className="text-lg font-semibold text-white mb-2 text-center">
                {movie.title}
              </h2>
              <p className="text-white text-center ">{movie.release_date}</p>
              <div className="flex flex-wrap space-x-1 justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div className="text-white text-center">
                  {movie.vote_average.toFixed(1)}
                  <span className="text-white">/10</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePopular;
