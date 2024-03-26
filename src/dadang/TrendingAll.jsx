import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TrendingAll = () => {
  const API_KEY = "60234f6ae15d81b2aa5b3f6b1cd6cccc";
  const navigate = useNavigate();
  const [trendingAll, setTrendingAll] = useState([]);
  const [selectLanguage, setSelectLanguage] = useState("");
  const [selectPage, setSelectPage] = useState("");
  const [selectTime, setSelectTime] = useState("day");

  const showTrendingAll = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/${selectTime}?&include_adult=false&language=${selectLanguage}&page=${selectPage}&api_key=${API_KEY}`,
        { headers: { accept: "application/json" } }
      );
      setTrendingAll(response.data.results);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  const handleLanguage = (event) => {
    setSelectLanguage(event.target.value);
  };

  const handlePage = (event) => {
    setSelectPage(event.target.value);
  };
  const handleTime = (event) => {
    setSelectTime(event.target.value);
  };

  useEffect(() => {
    showTrendingAll();
  }, [selectPage, selectLanguage, selectTime]);

  return (
    <div>
      <h1 className="text-center my-5 font-bold text-2xl">Trending All</h1>
      <div className="max-w-8xl mx-auto flex flex-col justify-center items-center gap-8 pb-24">
        <form className="my-5 ms-10">
          <select onChange={handleLanguage} className="select-cst">
            <option>Language</option>
            <option value="ar-SA">Arabic</option>
            <option value="en-US">English</option>
            <option value="id-ID">Indonesian</option>
          </select>

          <select onChange={handlePage} className="select-cst">
            <option>Page</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <select onChange={handleTime} className="select-cst mt-5">
            <option>Trending</option>
            <option value="day">Today</option>
            <option value="week">This Week</option>
          </select>
        </form>
        <div className="flex flex-wrap justify-center gap-8 pb-2">
          {trendingAll?.map((trending) => (
            <div
              key={trending?.id}
              onClick={() => {
                navigate("/trending-all-detail", {
                  state: { id: trending?.id, type: trending?.media_type },
                });
              }}
              className="flex flex-col gap-y-3 max-w-[400px] min-w-[280px] max-sm:min-w-[250px] shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-lg items-center"
            >
              <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative ">
                <div
                  className={`text-white p-2 absolute left-0 top-0 rounded-tl-md rounded-br-md ${
                    trending?.media_type === "tv"
                      ? "bg-slate-900"
                      : "bg-slate-800"
                  }`}
                >{`${
                  trending?.media_type === "tv"
                    ? trending?.media_type + " series"
                    : trending?.media_type
                }`}</div>
                <img
                  className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-sm"
                  src={`https://image.tmdb.org/t/p/w500/${trending?.poster_path}`}
                  alt=""
                />
                <h2 className="font-bold absolute left-0 top-20 bg-white p-2 rounded-e-md">
                  ⭐ {trending?.vote_average.toFixed(1)}
                </h2>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${trending?.poster_path}`}
                  alt={trending?.title}
                  className="max-w-44 rounded-sm"
                />
              </div>
              <h2 className="font-bold px-5">
                {trending?.title ? trending?.title : trending?.name}
              </h2>
              <h2 className="font-bold">Popularity : {trending?.popularity}</h2>

              <h2>
                {trending?.release_date
                  ? `Release Date : ${trending?.release_date}`
                  : `First Air Date : ${trending?.first_air_date}`}
              </h2>
              <h2 className="p-4"> {trending?.overview.slice(0, 80)}...</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingAll;
