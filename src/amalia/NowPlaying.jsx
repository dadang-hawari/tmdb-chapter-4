import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = "5e4a160d88ab953fadaaed22916b8438";

const PlayingNow = () => {
  const navigate = useNavigate();
  const [playings, setPlaying] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&sort_by=${sortBy}`
      );
      setPlaying(response.data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
  }, [sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Menambahkan fungsi untuk menyortir data berdasarkan opsi pengurutan yang dipilih
  const sortMovies = (movies) => {
    switch (sortBy) {
      case "popularity.desc":
        return movies.sort((a, b) => b.popularity - a.popularity);
      case "popularity.asc":
        return movies.sort((a, b) => a.popularity - b.popularity);
      case "release_date.desc":
        return movies.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      case "release_date.asc":
        return movies.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
      case "original_title.asc":
        return movies.sort((a, b) => a.title.localeCompare(b.title));
      case "original_title.desc":
        return movies.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return movies;
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8 mb-4">Now Playing Movies</h1>
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2 font-bold">
          Urutkan berdasarkan:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="popularity.desc">Populer (Descending)</option>
          <option value="popularity.asc">Populer (Ascending)</option>
          <option value="release_date.desc">Tanggal Rilis (Terbaru)</option>
          <option value="release_date.asc">Tanggal Rilis (Terlama)</option>
          <option value="original_title.asc">Judul (A-Z)</option>
          <option value="original_title.desc">Judul (Z-A)</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortMovies(playings).map((playing) => (
          <div
            key={playing.id}
            onClick={() => {
              navigate("/DetailPlaying-Now", { state: { id: playing.id } });
            }}
            className="border border-gray-300 rounded p-4"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${playing.poster_path}`}
              alt={playing.title}
              className="w-full mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{playing.title}</h2>
            <p className="text-gray-600 mb-2">{playing.release_date}</p>
            <p className="text-gray-800">{playing.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayingNow;
