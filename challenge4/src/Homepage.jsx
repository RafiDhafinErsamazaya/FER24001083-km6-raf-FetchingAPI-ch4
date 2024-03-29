import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./navbar";
import { useNavigate } from "react-router-dom";

const API_KEY = "0389f7dff3b6002ad073a6a720cee29b";

function Homepage() {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState([]);
  const [movieCurrentPage, setMovieCurrentPage] = useState(1);
  const [movieTotalPages, setMovieTotalPages] = useState(1);
  const [peopleData, setPeopleData] = useState([]);
  const [peopleCurrentPage, setPeopleCurrentPage] = useState(1);
  const [peopleTotalPages, setPeopleTotalPages] = useState(1);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?&api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${movieCurrentPage}`,
        { headers: { accept: "application/json" } }
      );
      console.log("response.data ", response.data);
      setMovieData(response.data.results);
      setMovieTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getPopularPeople = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/popular?&api_key=${API_KEY}&page=${peopleCurrentPage}&language=en-US`,
        { headers: { accept: "application/json" } }
      );
      console.log("People data ", response.data);
      setPeopleData(response.data.results);
      setPeopleTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, [movieCurrentPage]);

  useEffect(() => {
    getPopularPeople();
  }, [peopleCurrentPage]);

  const showAlert = () => {
    alert("detail people belum ada");
  };

  const goToNextMoviePage = () => {
    setMovieCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevMoviePage = () => {
    setMovieCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPeoplePage = () => {
    setPeopleCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPeoplePage = () => {
    setPeopleCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      {/* Navbar */}
      <Nav />

      {/* Hero Section */}
      <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
        {/* Background Image */}
        <img
          src="image/JJK.GIF"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Blur */}
        <div className="absolute inset-0 bg-black opacity-20 z-10"></div>

        {/* Content*/}
        <div className="relative z-20 text-white text-center">
          <h1 className="text-2xl md:text-6xl font-bold mb-10">
            Enjoy With Us
          </h1>
          <a
            href="#popularmovie"
            className="hover:text-slate-800 border bg-slate-200 font-normal text-black cursor-pointer hover:font-semibold rounded-full px-8 py-1.5 hover:bg-slate-400 text-xl mt-6"
          >
            Start Watching
          </a>
        </div>
      </div>

      {/* List Movie */}
      <section id="popularmovie" className="container mt-[750px] mb-16">
        <div className="my-8">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold text-slate-900">
              Popular List Movie
            </h1>

            <div className="flex gap-2 items-center">
              {/* Prev Button */}
              <button
                onClick={goToPrevMoviePage}
                disabled={movieCurrentPage === 1}
                className={`${
                  movieCurrentPage === 1
                    ? "bg-slate-600"
                    : "bg-slate-800 hover:bg-slate-900"
                } rounded-full px-2 py-2 text-white font-semibold`}
              >
                <svg
                  class="h-3 w-3 fill-white md:h-3.5 md:w-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  stroke-width="1.5"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
              </button>
              <p className="text-slate-800 text-center">
                {movieCurrentPage}/{movieTotalPages}
              </p>
              {/* Next Button */}
              <button
                onClick={goToNextMoviePage}
                disabled={movieCurrentPage === movieTotalPages}
                className={`${
                  movieCurrentPage === movieTotalPages
                    ? "bg-slate-600"
                    : "bg-slate-800 hover:bg-slate-900"
                } rounded-full px-2 py-2 text-slate-400 font-semibold`}
              >
                <svg
                  class="h-3 w-3 fill-white md:h-3.5 md:w-3.5"
                  stroke-width="1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 ">
          {Array.isArray(movieData) &&
            movieData.map((e) => (
              <div
                key={e.id}
                className="w-full cursor-pointer h-full overflow-hidden rounded-md text-white shadow-lg hover:shadow-slate-600 hover:shadow-lg bg-slate-800"
                onClick={() => {
                  navigate("/detail-movie", { state: { id: e.id } });
                }}
              >
                <img
                  className="w-full object-cover h-60"
                  src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                  alt={e.title}
                />
                <div className="pt-3 pb-2 px-3">
                  <div className="flex flex-col justify-between">
                    <div className="min-h-8">
                      <p className="text-sm font-bold leading-tight line-clamp-2">
                        {e.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 justify-between">
                      <p className="text-sm font-normal">{e.release_date}</p>
                      <div className="flex items-center gap-1">
                        <div className="w-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path
                              fill="#FFD43B"
                              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                            />
                          </svg>
                        </div>
                        <div className="text-sm font-semibold">
                          {e?.vote_average?.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* List Popular People */}
        <div>
          <div className="w-full h-0.5 bg-gradient-to-r from-slate-800 my-24">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold text-slate-900 my-8">People</h1>

              <div className="flex gap-2 items-center">
                {/* Prev Button */}
                <button
                  onClick={goToPrevPeoplePage}
                  disabled={peopleCurrentPage === 1}
                  className={`${
                    peopleCurrentPage === 1
                      ? "bg-slate-600"
                      : "bg-slate-800 hover:bg-slate-900"
                  } rounded-full px-2 py-2 text-white font-semibold`}
                >
                  <svg
                    class="h-3 w-3 fill-white md:h-3.5 md:w-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    stroke-width="1.5"
                  >
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                  </svg>
                </button>
                <p className="text-slate-800 text-center">
                  {peopleCurrentPage}/{peopleTotalPages}
                </p>
                {/* Next Button */}
                <button
                  onClick={goToNextPeoplePage}
                  disabled={peopleCurrentPage === peopleTotalPages}
                  className={`${
                    peopleCurrentPage === peopleTotalPages
                      ? "bg-slate-600"
                      : "bg-slate-800 hover:bg-slate-900"
                  } rounded-full px-2 py-2 text-slate-400 font-semibold`}
                >
                  <svg
                    class="h-3 w-3 fill-white md:h-3.5 md:w-3.5"
                    stroke-width="1.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* card people popular data */}
            <div className="grid grid-cols-7 gap-4">
              {peopleData.map((e) => (
                <div
                  key={e.id}
                  className="w-full overflow-hidden rounded-md text-white shadow-lg bg-slate-800 hover:shadow-slate-900 hover:shadow-lg"
                  onClick={showAlert}
                >
                  {e.profile_path !== null ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                      className="w-full object-cover h-60 "
                    />
                  ) : (
                    <img
                      src="image/profile.JPG"
                      className="w-full object-cover h-60 "
                    />
                  )}
                  <div className="py-4">
                    <div className="text-md font-bold text-center mb-4 py-2">
                      {e?.name}
                    </div>
                    <div className="text-sm text-red-500 text-center  mb-1">
                      {e?.known_for_department}
                    </div>
                    <div className="text-sm text-center mb-1">
                      {e?.original_name}
                    </div>
                    <div className="text-sm text-center">{e?.popularity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
