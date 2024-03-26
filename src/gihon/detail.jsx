import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API_KEY = "d8d031ba0ba20b0e5d75222095116691";

const Detail = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  let location = useLocation();

  const DetailTv = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${location.state.id}?&api_key=${API_KEY}`,
        { headers: { accept: "application/json" } }
      );
      console.log("response data detail", response.data);
      setDetail(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    console.log("location", location);
    DetailTv();
  }, []);

  return (
    <div>
      <header className="bg-black text-red-500 py-4 px-4">
        <h1 className="text-4xl font-bold text-center">Detail</h1>
      </header>
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
              <div className="font-black text-3xl">{detail?.name}</div>
              <h2 className="text-3xl font-semibold mb-2">{detail?.title}</h2>

              <p className="text-lg mb-2 border-b-2 pb-3 ">
                {detail?.overview}
              </p>
              <p className="text-lg mb-1">
                created by : "{detail?.created_by[0]?.name}
                {", "}
                {detail?.created_by[1]?.name}"
              </p>
              <p className="text-lg mb-1">
                Vote Average: {parseFloat(detail?.vote_average).toFixed(1)}/10
              </p>
              <p className="text-lg mb-1">Votes: {detail?.vote_count}</p>
              <p className="text-lg mb-1">
                Budget:{" "}
                {detail?.budget
                  ? `$${detail?.budget.toLocaleString("en-US")}`
                  : "N/A"}
              </p>
              <p className="text-lg mb-1">
                Revenue:{" "}
                {detail?.revenue
                  ? `$${detail?.revenue.toLocaleString("en-US")}`
                  : "N/A"}
              </p>
              <p className="text-lg mb-1">Runtime: {detail?.runtime} Minutes</p>
              <p className="text-lg mb-1">
                Genres: {detail?.genres?.map((genre) => genre.name).join(", ")}
              </p>
              <div>
                <button
                  className="bg-black text-white mt-6 rounded-3xl py-3 mb-3 px-8 font-medium inline-block mr-4 hover:bg-transparent hover:border-black hover:text-white duration-300 hover:border border border-transparent"
                  onClick={() => navigate("/popular-tv")}
                >
                  back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
