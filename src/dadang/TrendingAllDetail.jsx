import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function TrendingAllDetail() {
  let location = useLocation();
  const [detail, setDetail] = useState(null);

  const API_KEY = "60234f6ae15d81b2aa5b3f6b1cd6cccc";
  const detailType = location.state.type === "tv";

  const BASE_URL = detailType
    ? "https://api.themoviedb.org/3/tv/"
    : "https://api.themoviedb.org/3/movie/";
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const detailTrendingAll = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL + location.state.id}?language=en-US&api_key=${API_KEY}`,
        { headers: { accept: "application/json" } }
      );
      console.log("response.data ", response.data);
      setDetail(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    console.log("location ", location);
    detailTrendingAll();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url('${IMG_BASE_URL + detail?.backdrop_path}')`,
      }}
      className="bg-cover h-screen max-sm:h-fit "
    >
      <div className="backdrop-blur-3xl h-screen max-sm:h-fit">
        <div key={detail?.id} className="pt-[20px] max-w-[1104px] mx-auto px-5">
          <Link
            to={"/trending-all"}
            className="underline text-white block mb-2"
          >
            BACK TO TRENDING ALL
          </Link>
          <div className="flex gap-x-10 bg-white bg-opacity-30 p-8 rounded-md max-sm:flex-col">
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
                alt={detailType ? detail?.name : detail?.title}
                className="max-w-[300px] rounded-md pt-10 max-sm:max-w-full"
              />
              <h2 className="bg-slate-800 p-3 text-center rounded-t-md text-white w-full absolute top-0 left-0">
                ⭐ {detail?.vote_average.toFixed(1)} based on{" "}
                {detail?.vote_count} voters
              </h2>
            </div>

            <div className="flex flex-col gap-y-2">
              <h2 className="text-3xl font-bold">
                {detailType ? detail?.name : detail?.title}
                <span className="font-normal text-2xl ms-2">
                  (
                  {parseInt(
                    detailType ? detail?.first_air_date : detail?.release_date
                  )}
                  )
                </span>
              </h2>
              <h2>
                <i>{detail?.tagline}</i>
              </h2>
              <b>Genres</b>
              <p>{detail?.genres?.map((genre) => genre?.name).join(", ")}</p>
              <h2>
                <b>Popularity : </b>
                {detail?.popularity}
              </h2>
              <h2>
                {detailType ? (
                  <span>
                    <b>First Air Date:</b> {detail?.first_air_date}
                  </span>
                ) : (
                  <span>
                    <b>Release Date:</b> {detail?.release_date}
                  </span>
                )}
              </h2>

              <b>Overview</b>
              <p>{detail?.overview}</p>
              <h2>
                <b>Status : </b> {detail?.status}
              </h2>
              <h2>
                <b>Audio Languages:</b>{" "}
                {detail?.spoken_languages
                  ?.map((language) => language?.english_name)
                  .join(", ")}
              </h2>
              <div className="flex gap-12 flex-wrap">
                {detail?.created_by?.map((created, i) => (
                  <div key={i} className="">
                    <div className="font-bold">Creator</div>
                    {created.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
