import React, { useState } from "react";
import ContestCard from "../common/ContestCard";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { useTheme } from "./../../hooks/useTheme";
import { categories } from "../../constants/categories";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const { theme } = useTheme();

  

  const navigate = useNavigate();

  const searchContests = (e) => {
    e?.preventDefault();
   
    const searchQuery = new URLSearchParams({
      search: query || "",
      type: type || "all",
    }).toString();
    navigate(`/all-contest?${searchQuery}`);
  };

  return (
    <section className="relative top-13 bg-linear-to-r from-purple-600 via-pink-500 to-red-400 text-white">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            Discover Amazing Contests
          </h1>
          <p className="mt-4 text-lg md:text-xl text-purple-100/90">
            Find contests by type, skill, or keyword. Enter a term and choose a
            contest type to get started.
          </p>

          <form
            onSubmit={searchContests}
            className="mt-8 bg-white/10 backdrop-blur-sm rounded-full p-2 flex flex-col md:flex-row items-center gap-3 max-w-3xl mx-auto shadow-lg"
          >
            <div className="flex items-center gap-3 flex-1 px-4">
              <FiSearch className="text-white text-xl " size={25}/>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search contests, e.g. logo design, photography..."
                className="bg-transparent placeholder-purple-200 outline-none w-full text-white border-2 border-white/20 focus:border-white/40 rounded-full py-2 px-3 transition-all duration-150"
                aria-label="Search contests"
              />
            </div>

            <div className="relative mr-2">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={`appearance-none rounded-full px-4 py-2 pr-10 outline-none transition-all duration-150 ${
                  theme === "dark"
                    ? "bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-white/30"
                    : "bg-white text-purple-700 border border-purple-200 focus:ring-2 focus:ring-purple-300"
                }`}
                aria-label="Select contest type"
              >
                {categories.map((c) => (
                  <option
                    key={c.value}
                    value={c.value}
                    className={
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-white text-purple-700"
                    }
                  >
                    {c.label}
                  </option>
                ))}
              </select>

              {/* Chevron */}
              <svg
                className={`pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  theme === "dark" ? "text-white" : "text-purple-700"
                }`}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <button
              type="submit"
               className="flex-1 bg-linear-to-r from-pink-600 to-purple-600 text-white py-2 px-4 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition duration-300 text-center"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      {/* Decorative bottom shape */}
      {/* <div className="absolute -bottom-10 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" className="w-full h-20 text-white/20">
          <path
            fill="currentColor"
            d="M0,0 C360,80 1080,0 1440,80 L1440 0 L0 0 Z"
          ></path>
        </svg>
      </div> */}
    </section>
  );
}
