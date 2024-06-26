import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_KEY = "5e4a160d88ab953fadaaed22916b8438";

export default function NowPlayingDetail() {
  const navigate = useNavigate();
  let location = useLocation();
  const [detail, setDetail] = useState([]);
  const detailNowPlaying = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US&api_key=${API_KEY}`
      );
      setDetail(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    console.log("location ", location);
    detailNowPlaying();
  }, []);
  return (
    <div>
      <div
        className="bg-cover bg-fixed bg-no-repeat bg-gray-500 bg-blend-multiply h-auto"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${detail?.backdrop_path})`,
        }}
      >
        <div className="flex justify-center container mx-auto py-20 gap-10 items-center backdrop-blur-sm	 ">
          <img
            src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
            alt={detail?.title}
            className="w-auto h-auto  rounded-lg"
          />
          <div
            className="text-white font-sans bg-gray-600/75 rounded-xl shadow-lg p-10 "
            key={detail?.id}
          >
            <div className="p-4">
              <h2 className="text-3xl font-semibold mb-2">{detail?.title}</h2>
              <p className="text-lg mb-2 border-b-2 pb-3 ">
                {detail?.overview}
              </p>
              <p className="text-lg">Release Date: {detail?.release_date}</p>
              <p className="text-lg">
                Vote Average: {parseFloat(detail?.vote_average).toFixed(1)}/10
              </p>
              <p className="text-lg">Popularity: {detail?.popularity}</p>
              <p className="text-lg">Votes: {detail?.vote_count}</p>
              <button
                className="mt-7 px-4 py-2  font-sans bg-white border border-solid border-gray-400 text-black rounded-md shadow-md hover:bg-gray-00 hover:border-gray-500 focus:outline-none focus:ring focus:ring-gray-300"
                onClick={() => {
                  navigate("/", { state: { id: detail?.id } });
                }}
              >
                <div className="w-5 h-5 ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      transform="rotate(180 256 256)"
                      d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                    />
                  </svg>
                </div>
                <span className="sr-only">Icon description</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
