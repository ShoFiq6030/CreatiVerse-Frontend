import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosSecure from "../../api/axiosSecure";
import Loading from "./../common/Loading";
import { useTheme } from "../../hooks/useTheme";
import { FaUsers, FaTrophy } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function PopularContest() {
  const { theme } = useTheme();
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contest/get-popular-contests");
      return res.data.data;
    },
  });

  if (error) return <div className="text-red-500">{error.message}</div>;

  const sectionBg =
    theme === "dark"
      ? "bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"
      : "bg-gradient-to-br from-purple-50 via-pink-50 to-red-50";

  const cardBg =
    theme === "dark"
      ? "bg-gradient-to-br from-gray-800 to-gray-900"
      : "bg-white";

  const textColor = theme === "dark" ? "text-white" : "text-gray-800";
  const mutedText = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <section className={`py-16 ${sectionBg} relative overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-pink-500/10 rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-red-500/10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-4`}>
            Popular Contests
          </h2>
          <p className={`text-lg md:text-xl ${mutedText} max-w-3xl mx-auto`}>
            Sorted by highest participation count. Join thousands of creators
            who are already competing for amazing prizes!
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loading />
          </div>
        ) : (
          <>
            {/* Contest Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.slice(0, 6).map((contest) => (
                <div
                  key={contest._id}
                  className={`rounded-2xl p-6 ${cardBg} shadow-xl relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${textColor}`}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-red-500`}
                  ></div>

                  <div className="relative">
                    <div className="aspect-square rounded-xl overflow-hidden shadow-lg mb-4">
                      <img
                        src={
                          contest.image ||
                          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop"
                        }
                        alt={contest.contestName}
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          theme === "dark"
                            ? "bg-gray-800/80 text-white"
                            : "bg-white/80 text-purple-700"
                        }`}
                      >
                        {contest.contestType}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xl font-semibold">
                        <FaUsers size={20} className="inline mr-1" />{" "}
                        {contest.participantsCount}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-bold">{contest.contestName}</h4>
                    <p className={`text-sm ${mutedText}`}>
                      {contest.description
                        ? contest.description.slice(0, 120) +
                          (contest.description.length > 120 ? "…" : "")
                        : "No description available."}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className={`p-3 rounded-lg ${
                          theme === "dark" ? "bg-gray-700/50" : "bg-purple-50"
                        }`}
                      >
                        <p className={`text-xs ${mutedText}`}>Entry Fee</p>
                        <p className="font-semibold">${contest.price}</p>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          theme === "dark" ? "bg-gray-700/50" : "bg-pink-50"
                        }`}
                      >
                        <p className={`text-xs ${mutedText}`}>Prize</p>
                        <p className="font-semibold text-green-600">
                          ${contest.prizeMoney}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        to={user ? `/contest/${contest._id}` : "/login"}
                        className="flex-1 bg-linear-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition duration-300 text-center"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show All Button */}
            {data?.length > 0 && (
              <div className={`mt-12 text-center ${textColor}`}>
                <Link
                  to="/all-contests"
                  className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
                >
                  Show All
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
