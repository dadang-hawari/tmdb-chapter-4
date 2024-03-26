import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TrendingAll from "./dadang/TrendingAll";
import TrendingAllDetail from "./dadang/TrendingAllDetail";
import MoviePopular from "./niko/Popular";
import MovieDetail from "./niko/MovieDetails";
import PopularTv from "./gihon/PopularTv";
import Detail from "./gihon/detail";
import NowPlaying from "./amalia/NowPlaying";
import NowPlayingDetail from "./amalia/DetailNowPlaying";
import SearchMovies from "./SearchMovies";
import TopRated from "./zanetta/TopRated";
import MovieDetailZ from "./zanetta/TopMoviesDetail";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SearchMovies />,
    },
    {
      path: "/trending-all",
      element: <TrendingAll />,
    },
    {
      path: "/trending-all-detail",
      element: <TrendingAllDetail />,
    },
    {
      path: "/popular-movie",
      element: <MoviePopular />,
    },
    {
      path: "/movie-details",
      element: <MovieDetail />,
    },
    {
      path: "/popular-tv",
      element: <PopularTv />,
    },
    {
      path: "/tv-details",
      element: <Detail />,
    },
    {
      path: "/now-playing",
      element: <NowPlaying />,
    },
    {
      path: "/detail-playing-now",
      element: <NowPlayingDetail />,
    },
    {
      path: "/top-rated",
      element: <TopRated />,
    },
    {
      path: "/top-movies-details",
      element: <MovieDetailZ />,
    },
  ]);
  return <RouterProvider router={router} />;
}
