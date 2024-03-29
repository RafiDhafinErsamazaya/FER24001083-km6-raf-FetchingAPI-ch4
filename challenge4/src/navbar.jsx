import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 opacity-90 p-5 flex items-center justify-between px-20 fixed top-0 left-0 w-full z-50">
      {/* Nav kembali ke Hompepage*/}
      <a href="/" className="text-white text-xl font-bold hover:text-slate-400">
        Movie List
      </a>

      {/* Fitur Search untuk menuju page search */}
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => {
          navigate("/search-movie");
        }}
      >
        <p className="hover:text-slate-800 border bg-slate-200 font-normal cursor-pointer hover:font-semibold rounded-xl px-4 py-1.5 hover:bg-slate-400">
          More Movies
        </p>
      </div>
    </nav>
  );
}

export default Nav;
