import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import Loading from "../components/common/Loading";
import {
  FaTrophy,
  FaMedal,
  FaUser,
  FaCoins,
  FaUsers,
  FaCrown,
} from "react-icons/fa";

export default function Leaderboard() {
  const { user } = useAuth();
  const { theme } = useTheme();

  // Fetch leaderboard data
  const {
    data: leaderboardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/leaderboard");
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-6 py-10 text-red-500">
        Error loading leaderboard data
      </div>
    );
  }

  const getRankBackground = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-100 to-yellow-200";
      case 2:
        return "bg-gradient-to-br from-gray-100 to-gray-200";
      case 3:
        return "bg-gradient-to-br from-orange-100 to-orange-200";
      default:
        return theme === "dark" ? "bg-gray-800" : "bg-gray-50";
    }
  };

  const getRankBorder = (rank) => {
    switch (rank) {
      case 1:
        return "border-yellow-300";
      case 2:
        return "border-gray-300";
      case 3:
        return "border-orange-300";
      default:
        return theme === "dark" ? "border-gray-700" : "border-gray-200";
    }
  };

  return (
    <div
      className={`container mx-auto px-6 py-10 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <FaTrophy className="text-6xl text-purple-600 mr-4" />
          <div>
            <h1 className="text-4xl font-bold">Leaderboard</h1>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Top performers in the community
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      {leaderboardData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-lg p-6 text-center`}
          >
            <div className="flex items-center justify-center mb-4">
              <FaCrown className="text-yellow-500 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Top Winner</h3>
            <p className="text-2xl font-bold">
              {leaderboardData[0]?.user?.name || "N/A"}
            </p>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              } text-sm`}
            >
              {leaderboardData[0]?.totalPrizeEarning || 0} coins earned
            </p>
          </div>

          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-lg p-6 text-center`}
          >
            <div className="flex items-center justify-center mb-4">
              <FaUsers className="text-blue-500 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Total Players</h3>
            <p className="text-2xl font-bold">{leaderboardData.length}</p>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              } text-sm`}
            >
              Active participants
            </p>
          </div>

          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-lg p-6 text-center`}
          >
            <div className="flex items-center justify-center mb-4">
              <FaCoins className="text-green-500 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Total Prizes</h3>
            <p className="text-2xl font-bold">
              {leaderboardData.reduce(
                (total, entry) => total + entry.totalPrizeEarning,
                0
              )}
            </p>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              } text-sm`}
            >
              Coins distributed
            </p>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-lg overflow-hidden`}
      >
        <div
          className={`px-6 py-4 border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h2 className="text-lg font-semibold">Rankings</h2>
        </div>

        {leaderboardData.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No leaderboard data available yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                className={`${
                  theme === "dark" ? "bg-gray-900" : "bg-gray-50"
                }`}
              >
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Wins
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Participation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Earnings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboardData.map((entry, index) => (
                  <tr
                    key={entry.user._id}
                    className={`${
                      theme === "dark"
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-50"
                    } ${getRankBackground(index + 1)} border-l-4 ${
                      getRankBorder(index + 1)
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                              ? "bg-gray-400"
                              : index === 2
                              ? "bg-orange-500"
                              : "bg-purple-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        {index < 3 && (
                          <div className="ml-3">
                            {index === 0 && (
                              <FaMedal className="text-yellow-500 text-xl" />
                            )}
                            {index === 1 && (
                              <FaMedal className="text-gray-400 text-xl" />
                            )}
                            {index === 2 && (
                              <FaMedal className="text-orange-500 text-xl" />
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                            {entry.user.profileImage ? (
                              <img
                                className="h-12 w-12 rounded-full object-cover"
                                src={entry.user.profileImage}
                                alt={entry.user.name}
                              />
                            ) : (
                              entry.user.name.charAt(0).toUpperCase()
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">
                            {entry.user.name}
                          </div>
                          <div
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            {entry.user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaTrophy
                          className={`${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          } mr-2`}
                        />
                        <span className="text-sm font-medium">
                          {entry.winCount}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUsers
                          className={`${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          } mr-2`}
                        />
                        <span className="text-sm font-medium">
                          {entry.participantCount}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaCoins
                          className={`${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          } mr-2`}
                        />
                        <span className="text-sm font-medium">
                          {entry.totalPrizeEarning} coins
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Call to Action */}
      {user && (
        <div className="mt-12 text-center">
          <p
            className={`${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            } mb-4`}
          >
            Ready to climb the leaderboard?
          </p>
          <button className="bg-purple-600 text-white py-3 px-8 rounded-full hover:bg-purple-700 transition-colors">
            Join Contests
          </button>
        </div>
      )}
    </div>
  );
}
