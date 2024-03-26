import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import TrendingAll from "./dadang/TrendingAll";
import TrendingAllDetail from "./dadang/TrendingAllDetail";
import MoviePopular from "./niko/Popular";
import MovieDetail from "./niko/MovieDetails";
import PopularTv from "./gihon/PopularTv";
import Detail from "./gihon/detail";
import NowPlaying from "./amalia/NowPlaying";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/trending-all",
      element: <TrendingAll />,
    },
    {
      path: "/trending-all",
      element: <TrendingAll />,
    },
    {
      path: "/trending-all",
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
      path: "/top-rated",
      element: <TopRated />,
    },
  ]);

  return <RouterProvider router={router} />;
}
