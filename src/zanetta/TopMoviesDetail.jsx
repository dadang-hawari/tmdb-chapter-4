import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_KEY = "de1e0b98496c6434dd3e14f9554f5287";

export default function MovieDetail() {
  const navigate = useNavigate();
  let location = useLocation();
  const [detail, setDetail] = useState([]);
  const detailMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US&api_key=${API_KEY}`, // <-- diganti pake usestate
        { header: { accept: "application/json" } }
      );
      console.log("response data ", response.data);
      setDetail(response.data);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  useEffect(() => {
    console.log("location ", location);
    detailMovies();
  }, []);
  return (
    <div>
      {/* navbar */}
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
      <div className="bg-no-repeat bg-white-auto px-20 justify-around py-5">
        <div
          className="text-black font-sans bg-base-200 rounded-xl shadow-lg p-10 justify-around"
          key={detail?.id}
        >
          <div className="flex flex-1 pl-3">
            <img
              src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
              alt={detail?.title}
              className="w-[300px] h-auto rounded-lg"
            />
            <div className="flex flex-col ml-4">
              <h2 className="text-3xl font-semibold mb-2">{detail?.title}</h2>
              <p className="text-lg mb-2 border-b-2 pb-3">{detail?.overview}</p>
              <p className="text-lg">Release Date: {detail?.release_date}</p>
              <p className="text-lg">
                Vote Average: {parseFloat(detail?.vote_average).toFixed(1)}/10
              </p>
              <p className="text-lg">Votes: {detail?.vote_count}</p>
              <p className="text-lg">
                Budget:{" "}
                {detail?.budget
                  ? `$${detail?.budget.toLocaleString("en-US")}`
                  : "N/A"}
              </p>
              <p className="text-lg">
                Revenue:{" "}
                {detail?.revenue
                  ? `$${detail?.revenue.toLocaleString("en-US")}`
                  : "N/A"}
              </p>
              <p className="text-lg">Runtime: {detail?.runtime} Minutes</p>
              <p className="text-lg">
                Genres: {detail?.genres?.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>
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
}
