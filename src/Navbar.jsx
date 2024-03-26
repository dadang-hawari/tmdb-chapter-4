import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 px-20">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-gray" href="/">
          Kelompok 2
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/now-playing"}>Now Playing</Link>
          </li>
          <li>
            <Link to={"/trending-all"}>Trending All</Link>
          </li>
          <li>
            <Link to="/popular-tv">Popular TV</Link>
          </li>
          <li>
            <Link to="/popular-movie">Popular Movies</Link>
          </li>
          <li>
            <Link to="/top-rated">Top Rated Movies</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
