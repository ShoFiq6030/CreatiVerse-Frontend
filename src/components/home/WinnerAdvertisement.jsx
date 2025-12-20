import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import { FaTrophy, FaMedal, FaCrown, FaStar } from "react-icons/fa";
import { FiUsers, FiAward } from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";
import Loading from "../common/Loading";
import { Link } from "react-router";

export default function WinnerAdvertisement() {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["contest-winners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contest/get-contest-winners");
      return res.data.data;
    },
  });

  // Auto-rotate winners every 4 seconds
  useEffect(() => {
    if (!data || data.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [data]);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Loading />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">Failed to load winners</div>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  const totalPrizeMoney = data.reduce((sum, contest) => sum + contest.prizeMoney, 0);
  const totalWinners = data.length;

  const currentWinner = data[currentIndex];
  const nextWinner = data[(currentIndex + 1) % data.length];

  const sectionBg = theme === "dark" 
    ? "bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" 
    : "bg-gradient-to-br from-purple-50 via-pink-50 to-red-50";
  
  const cardBg = theme === "dark" 
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaTrophy className="text-3xl text-yellow-400" />
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor}`}>
              Champions Gallery
            </h2>
            <FaTrophy className="text-3xl text-yellow-400" />
          </div>
          <p className={`text-lg md:text-xl ${mutedText} max-w-3xl mx-auto`}>
            Be inspired by our recent winners! Their creativity, dedication, and 
            talent have earned them recognition and rewards. Could you be next?
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Main Winner Showcase */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl p-8 ${cardBg} shadow-xl relative overflow-hidden ${textColor}`}>
              {/* Decorative border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-red-500"></div>
              
              {/* Winner Image */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <div className="aspect-square rounded-xl overflow-hidden shadow-2xl">
                    <img 
                      src={currentWinner.image} 
                      alt={currentWinner.contestName}
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-linear-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg">
                    <FaCrown className="text-2xl" />
                  </div>
                </div>

                {/* Winner Details */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        #{currentIndex + 1} Winner
                      </span>
                      <span className={`text-sm ${mutedText}`}>Recent Victory</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold">
                      {currentWinner.contestName}
                    </h3>
                    <p className={`text-sm ${mutedText}`}>
                      {currentWinner.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-purple-50'}`}>
                      <div className="flex items-center gap-3">
                        <div className="bg-linear-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                          <FaMedal className="text-white" />
                        </div>
                        <div>
                          <p className={`text-sm ${mutedText}`}>Winner</p>
                          <p className="font-semibold">{currentWinner.winner.user.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-pink-50'}`}>
                      <div className="flex items-center gap-3">
                        <div className="bg-linear-to-r from-pink-500 to-red-500 p-2 rounded-lg">
                          <FiAward className="text-white" />
                        </div>
                        <div>
                          <p className={`text-sm ${mutedText}`}>Prize Money</p>
                          <p className="font-semibold text-2xl text-green-600">
                            ${currentWinner.prizeMoney}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link to={`/contest/${currentWinner._id}`} className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
                      View Contest
                    </Link>
                    <button className={`px-6 py-3 rounded-lg font-semibold border ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} transition duration-300`}>
                      See Submission
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-6">
              {data.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-linear-to-r from-purple-500 to-pink-500 scale-125' 
                      : theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View winner ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Stats and Inspiration */}
          <div className="space-y-6">
            <div className={`rounded-2xl p-8 ${cardBg} shadow-xl ${textColor}`}>
              <div className="flex items-center gap-3 mb-4">
                <FiUsers className="text-2xl text-purple-500" />
                <h4 className="text-2xl font-bold">Success Statistics</h4>
              </div>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-purple-50'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${mutedText}`}>Total Winners</p>
                      <p className="text-3xl font-bold">{totalWinners}</p>
                    </div>
                    <div className="bg-linear-to-r from-purple-500 to-pink-500 p-3 rounded-lg">
                      <FaStar className="text-white text-xl" />
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-pink-50'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${mutedText}`}>Total Prize Money</p>
                      <p className="text-3xl font-bold text-green-600">
                        ${totalPrizeMoney.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-linear-to-r from-pink-500 to-red-500 p-3 rounded-lg">
                      <FaTrophy className="text-white text-xl" />
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-red-50'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${mutedText}`}>Average Prize</p>
                      <p className="text-3xl font-bold text-blue-600">
                        ${Math.round(totalPrizeMoney / totalWinners).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-linear-to-r from-red-500 to-orange-500 p-3 rounded-lg">
                      <FiAward className="text-white text-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Winner Preview */}
            <div className={`rounded-2xl p-6 ${cardBg} shadow-xl ${textColor}`}>
              <h5 className={`text-sm ${mutedText} mb-2`}>Next Up</h5>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={nextWinner.image} 
                    alt={nextWinner.contestName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{nextWinner.contestName}</p>
                  <p className={`text-sm ${mutedText}`}>{nextWinner.winner.user.name}</p>
                </div>
              </div>
              <p className={`text-sm ${mutedText} mt-2`}>
                Prize: <span className="font-semibold text-green-600">${nextWinner.prizeMoney}</span>
              </p>
            </div>

            {/* Call to Action */}
            <div className={`rounded-2xl p-6 ${cardBg} shadow-xl ${textColor}`}>
              <h5 className="text-xl font-bold mb-2">Ready to Shine?</h5>
              <p className={`text-sm ${mutedText} mb-4`}>
                Join thousands of creators and compete for amazing prizes!
              </p>
              <Link to="/all-contest" className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
                Join a Contest Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
