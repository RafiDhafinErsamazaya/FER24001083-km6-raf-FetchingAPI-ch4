import React, { useState, useEffect } from "react";
import Nav from "./navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API_KEY = "0389f7dff3b6002ad073a6a720cee29b";

function Movie() {
  let location = useLocation();
  const [data, setData] = useState([]);

  const DetailMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US&api_key=${API_KEY}`,
        { headers: { accept: "application/json" } }
      );
      console.log("Detail data ", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    DetailMovie();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Nav />

      {/*Data Detail Movie */}
      <section>
        <div className="mt-60 text-left" key={data?.title}>
          <div className="absolute top-0 left-0 w-full h-screen flex">
            <img
              src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
              className="w-full h-screen object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-screen bg-black/80 flex items-center">
              <div className="container">
                <div className="flex gap-6 mt-12 border-4 border-white rounded-lg items-center bg-slate-800">
                  <div className="w-1/4">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
                      className="w-full object-cover rounded-lg shadow-slate-800 shadow-lg text-left"
                    />
                  </div>
                  <div className="w-3/4 flex flex-col justify-between text-white">
                    <div className="flex flex-col">
                      <p className="text-6xl font-bold mb-8 ">{data?.title}</p>
                      <div className="w-full h-0.5 bg-gradient-to-r from-white"></div>
                      <p className="mt-4 mb-4">{data?.overview}</p>
                      <h1 className="text-lg font-semibold text-left mt-4">
                        Production Companies:
                      </h1>
                      <ul className="list-disc text-white font-normal text-base ps-4 text-left">
                        {data?.production_companies &&
                          data?.production_companies.map((e, index) => (
                            <li key={index}>{e?.name}</li>
                          ))}
                      </ul>
                    </div>
                    <h1 className="text-lg font-semibold mt-6 text-left">
                      Genres:
                    </h1>
                    <div className="flex gap-2">
                      {data?.genres &&
                        data?.genres.map((e, index) => (
                          <p
                            key={index}
                            className="text-white font-normal text-base py-4"
                          >
                            <div className="text-slate-900 bg-slate-200 rounded-full px-3 py-1.5">
                              {e?.name}
                            </div>
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Movie;
