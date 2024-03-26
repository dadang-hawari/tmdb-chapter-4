import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const API_KEY = "60234f6ae15d81b2aa5b3f6b1cd6cccc";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectLanguage, setSelectLanguage] = useState("");
  const [selectPage, setSelectPage] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [selectRegion, setSelectRegion] = useState("");

  const searchMovies = async () => {
    try {
      if (query.trim().length === 0) return alert("Mohon inputkan movie");
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&language=${selectLanguage}&page=${selectPage}&year=${selectYear}&region=${selectRegion}`, // <-- diganti pake usestate
        { header: { accept: "application/json" } }
      );
      console.log("response data ", response.data);
      setMovies(response.data.results);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleLanguage = (event) => {
    setSelectLanguage(event.target.value);
  };

  const handlePage = (event) => {
    setSelectPage(event.target.value);
  };

  const handleYear = (event) => {
    setSelectYear(event.target.value);
  };
  const handleRegion = (event) => {
    setSelectRegion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies();
  };

  return (
    <div>
      <Navbar />

      <div className="hero min-h-auto bg-base-200 py-4">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6 w-[600px]">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="max-w-8xl mx-auto flex flex-col justify-center items-center gap-8 pb-24">
        <form onSubmit={handleSubmit} className="my-5 ms-10">
          <button type="submit" className="bg-blue-400 me-4 p-2 rounded-md">
            Search
          </button>
          <input
            type="text"
            placeholder="Search movie"
            value={query}
            onChange={handleChange}
            className="p-2 border outline-none focus:border-blue-400 rounded-sm "
          />
          <select onChange={handleLanguage} className="select-cst mt-5">
            <option selected disabled>
              Language
            </option>
            <option value="ar-SA">Arabic</option>
            <option value="en-US">English</option>
            <option value="id-ID">Indonesian</option>
          </select>

          <select onChange={handlePage} className="select-cst mt-5">
            <option selected disabled>
              Page
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <select onChange={handleYear} className="mx-5 select-cst mt-5">
            <option selected disabled>
              Range Year
            </option>
            <option value="2021">1900 - 2021</option>
            <option value="2022">1900 - 2022</option>
            <option value="2023">1900 - 2023</option>
          </select>
          <select onChange={handleRegion} className="mx-5 select-cst mt-5">
            <option selected disabled>
              Region Release
            </option>
            <option value="SA">Saudi Arabia</option>
            <option value="ID">Indonesia</option>
            <option value="EN">EN</option>
          </select>
        </form>
        <div className="flex flex-wrap justify-center gap-8 pb-2">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col gap-y-3 max-w-[400px] min-w-[280px] max-sm:min-w-[250px] shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-lg items-center"
            >
              <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative">
                <img
                  className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                />
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="max-w-44 rounded-sm"
                />
              </div>
              <h2 className="font-bold px-5">{movie.title}</h2>
              <h2>Release date : {movie.release_date}</h2>
              <h2 className="p-4"> Release{movie.overview.slice(0, 150)}...</h2>
            </div>
          ))}
        </div>
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
          <p>Kelompok 2 Binar Academy.</p>
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

export default SearchMovies;
