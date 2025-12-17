import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import Loading from "../components/common/Loading";
import { FiClock } from "react-icons/fi";
import { FaDollarSign, FaTrophy, FaUsers } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";

export default function ContestDetails() {
  const { contestId } = useParams();
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["contest", contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/get-contest/${contestId}`);
      
      return res.data.data;
    },
    enabled: !!contestId,
  });

  useEffect(() => {
    if (!data) return;

    const calculateTimeLeft = () => {
      const deadline = new Date(data.deadline).getTime();
      const now = Date.now();
      const difference = deadline - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(
          `${days}d ${String(hours).padStart(2, "0")}h ${String(
            minutes
          ).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`
        );
      } else {
        setTimeLeft("Deadline passed");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Error loading contest.</p>;

  const contest = data;
  const cardBg =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";
  const metaText = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`container mx-auto px-6 py-10`}>
      <div className={`rounded-lg overflow-hidden shadow ${cardBg}`}>
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={
                contest.image ||
                "https://via.placeholder.com/800x500?text=No+Image"
              }
              alt={contest.contestName}
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold mb-3">{contest.contestName}</h1>
            <p className={`mb-4 ${metaText}`}>
              {contest.description || "No description provided."}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <div className={`flex items-center gap-2 ${metaText}`}>
                <FiClock className="text-lg" /> <span>{timeLeft}</span>
              </div>
              <div className={`flex items-center gap-2 ${metaText}`}>
                <FaUsers className="text-lg" />{" "}
                <span>{contest.participantsCount} participants</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 border rounded">
                <p className="text-sm text-gray-500">Entry Fee</p>
                <p className="font-semibold">
                  <FaDollarSign className="inline mr-1" /> ${contest.price}
                </p>
              </div>
              <div className="p-4 border rounded">
                <p className="text-sm text-gray-500">Prize Money</p>
                <p className="font-semibold text-green-600">
                  <FaTrophy className="inline mr-1" /> ${contest.prizeMoney}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded">
                Enter Contest
              </button>
              <a href="#" className="px-4 py-2 border rounded text-sm">
                Share
              </a>
            </div>

            <p className={`text-xs mt-4 ${metaText}`}>
              Published: {new Date(contest.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
