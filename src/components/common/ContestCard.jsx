import React, { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";
import { FaDollarSign, FaTrophy, FaUsers } from "react-icons/fa";
import { Link } from "react-router";

export default function ContestCard({ contest }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const deadline = new Date(contest.deadline).getTime();
      const now = new Date().getTime();
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
  }, [contest.deadline]);

  return (
    <Link
      to={`/contest/${contest._id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition hover:scale-105"
    >
      <img
        src={
          contest.image || "https://via.placeholder.com/400x300?text=No+Image"
        }
        alt={contest.contestName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3">{contest.contestName}</h3>
        <div className="space-y-2 text-sm">
          <p className="text-red-500 font-semibold flex items-center gap-2">
            <FiClock aria-hidden className="text-lg" />
            <span> {timeLeft}</span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <FaDollarSign className="text-sm text-gray-700" aria-hidden />
            <span>
              Entry Fee:{" "}
              <strong className="font-semibold">${contest.price}</strong>
            </span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <FaTrophy className="text-sm text-green-600" aria-hidden />
            <span>
              Prize Money:{" "}
              <strong className="font-semibold text-green-600">
                ${contest.prizeMoney}
              </strong>
            </span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <FaUsers className="text-sm" aria-hidden />
            <span>
              Participants:{" "}
              <strong className="font-semibold">
                {contest.participantsCount}
              </strong>
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
