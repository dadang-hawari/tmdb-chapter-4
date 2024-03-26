import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PopularTv from "./gihon/PopularTv.jsx";
import Detail from "./gihon/detail.jsx";
import TopRated from "./zanetta/TopRated.jsx"
import TopMoviesDetail from "./zanetta/TopMoviesDetail.jsx"

const router = createBrowserRouter([
  { path: "/", element: <PopularTv /> },
  { path: "/TopRated", element: <TopRated /> },
  { path: "/top-movies-details", element: <TopMoviesDetail /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);