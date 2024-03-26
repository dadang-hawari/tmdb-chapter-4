import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const API_KEY = "d8d031ba0ba20b0e5d75222095116691";

const PopularTv = () => {
  const [query, setQuery] = useState("");
  const [tv, settv] = useState([]);
  const navigate = useNavigate();

  const tvPopular = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?&api_key=${API_KEY}`,
        { headers: { accept: "application/json" } }
      );
      console.log("response data", response.data);
      settv(response.data.results);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    tvPopular();
  }, []);

  return (
    <div className="">
      <header className="bg-black text-red-500 py-4 px-4">
        <Navbar />

        <h1 className="text-4xl font-bold text-center">Popular Tv</h1>
      </header>
      <div className="justify-center flex flex-wrap gap-20 mt-10">
        {tv.map((tv) => (
          <div key={tv.id} className="">
            <div className="flex flex-col gap-y-3 w-[400px] h-[500px] border-2 border-black  items-center">
              <div className="font-black text-white">{tv.name}</div>
              <div className="">release date : "{tv.first_air_date}"</div>
              <div className="">country : "{tv.origin_country}"</div>
              <div className=" text-center">
                ⭐ {tv.vote_average.toFixed(1)}
                <span className=""> / 10</span>
              </div>

              <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative">
                <img
                  className="h-full mt-3 absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[6px]"
                  src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                />
                <img
                  src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                  alt={tv.title}
                  className="max-w-44 rounded-sm"
                />
              </div>

              <div>
                <button
                  className="bg-black mb-2 text-white mt-6 rounded-3xl py-3 px-8 font-medium inline-block mr-4 hover:bg-transparent hover:border-black hover:text-black duration-300 hover:border border border-transparent"
                  key={tv.id}
                  onClick={() => {
                    navigate("/tv-details", { state: { id: tv.id } });
                  }}
                >
                  detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTv;
