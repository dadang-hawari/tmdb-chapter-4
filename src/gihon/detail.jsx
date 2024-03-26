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
    <div className="">
      <div key={detail?.id} className="">
        <div className="flex justify-center mt-52 ">
          <div className="flex flex-col gap-y-3 w-[500px] h-[full] border-2 border-black rounded-3xl items-center">
            <div className="font-black">{detail?.name}</div>
            <div className="mx-5 mt-3">"{detail?.overview}"</div>
            <div className="mt-3">
              created by : "{detail?.created_by[0]?.name}
              {", "}
              {detail?.created_by[1]?.name}"
            </div>
            <div className="">genre : "{detail?.genres[0]?.name}"</div>

            <div>
              <button
                className="bg-black text-white mt-6 rounded-3xl py-3 mb-3 px-8 font-medium inline-block mr-4 hover:bg-transparent hover:border-black hover:text-black duration-300 hover:border border border-transparent"
                onClick={() => navigate("/")}
              >
                back
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="justify-center flex flex-wrap gap-20 mt-10">
        {movies.map((tv) => (
          <div key={tv.id} className="">
            <div className="flex flex-col gap-y-3 w-[500px] h-[800px] border-2 border-black rounded-3xl items-center">
              <div className="font-black">{tv.name}</div>

              <div className="mx-5">{tv.overview}</div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Detail;
