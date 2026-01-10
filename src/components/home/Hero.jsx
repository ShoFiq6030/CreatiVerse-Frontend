import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useTheme } from "../../hooks/useTheme";
import { categories } from "../../constants/categories";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const { theme } = useTheme();

  const navigate = useNavigate();

  const searchContests = (e) => {
    e.preventDefault();

    const searchQuery = new URLSearchParams({
      search: query || "",
      type: type || "all",
    }).toString();

    navigate(`/all-contests?${searchQuery}`);
  };

  return (
    <section className=" text-white relative overflow-hidden py-10">
      {/* Animated background layers */}
      <div
        className={`hero-gradient-color animate-gradient inset-0 absolute`}
      ></div>
      <div className=" mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold hero-text drop-shadow-[8px_8px_1px_rgba(139,92,246,50)]">
            Discover Amazing Contests
          </h1>

          <p className="mt-4 text-lg md:text-xl text-purple-100">
            Find contests by type, skill, or keyword. Enter a term and choose a
            contest type to get started.
          </p>

          <form
            onSubmit={searchContests}
            className="mt-8 md:bg-white/10 md:backdrop-blur-sm md:rounded-full p-2 flex flex-col md:flex-row items-center gap-3 max-w-3xl mx-auto shadow-lg"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 flex-1 px-4 ">
              <FiSearch className="text-white text-xl" size={25} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search contests, e.g. logo design, photography..."
                className="bg-white text-black outline-none w-full  border-2 border-white/20 focus:border-white/40 rounded-full py-2 px-3 transition-all duration-150"
                aria-label="Search contests"
              />
            </div>

            {/* Category Select */}
            <div className="relative mr-2">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={`appearance-none rounded-full px-4 py-2 pr-10 outline-none transition-all duration-150 ${
                  theme === "dark"
                    ? "bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-white/30"
                    : "bg-white text-purple-700 border border-purple-200 focus:ring-2 focus:ring-purple-300"
                }`}
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

              {/* Dropdown Icon */}
              <svg
                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${
                  theme === "dark" ? "text-white" : "text-purple-700"
                }`}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
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

            {/* Submit Button */}
            <button
              type="submit"
              className="flex-1 bg-linear-to-r from-pink-600 to-purple-600 text-white py-2 px-4 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
