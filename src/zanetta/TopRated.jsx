import { useState } from "react";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "de1e0b98496c6434dd3e14f9554f5287";

const TopRated = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const popularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&include_adult=false&api_key=${API_KEY}`,
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
    <div className="bg-white ">
      <div className="navbar bg-base-100 px-20">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-gray" href="/">
            Kelompok 4
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/">Now Playing</a>
            </li>
            <li>
              <a>Popular TV</a>
            </li>
            <li>
              <a>Popular Movie</a>
            </li>
            <li>
              <a href="/TopRated">Top Rated Movies</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="hero min-h-auto bg-base-200 py-24">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Top Rated Movies</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-4 gap-8 py-10 ">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => {
              navigate("/top-movies-details", { state: { id: movie.id } });
            }}
            className="block max-w-sm p-6 bg-base-200 text-black rounded-lg"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-fit object-cover"
            />
            <div className="p-2">
              <h2 className="text-lg font-semibold text-black mb-2 text-center">
                {movie.title}
              </h2>
              <p className="text-black text-center ">{movie.release_date}</p>
              <div className="flex flex-wrap space-x-1 justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#EAB308"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div className="text-black text-center">
                  {movie.vote_average.toFixed(1)}
                  <span className="text-black">/10</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <footer className="footer p-10 bg-base-200 text-base-content px-20">
        <aside>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p>
            Kelompok 4 Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Now Playing</a>
          <a className="link link-hover">Popular TV</a>
          <a className="link link-hover">Popular Movie</a>
        </nav>
      </footer>
    </div>
  );
};

export default TopRated;
