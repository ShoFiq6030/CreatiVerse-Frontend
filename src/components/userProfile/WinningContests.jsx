import React from "react";
import { useTheme } from "../../hooks/useTheme";

export default function WinningContests({ contests = [] }) {
  const { theme } = useTheme();

  const containerBg =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const mutedText = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const innerBg = theme === "dark" ? "bg-gray-700" : "bg-gray-100";
  const highlight =
    theme === "dark"
      ? "bg-yellow-400 text-gray-900"
      : "bg-yellow-400 text-gray-900";
  const champBadge =
    theme === "dark"
      ? "bg-purple-800 text-purple-100"
      : "bg-purple-100 text-purple-800";
  const moneyBadge =
    theme === "dark"
      ? "bg-green-800 text-green-100"
      : "bg-green-100 text-green-800";

  if (contests.length === 0) {
    return (
      <div
        className={`text-center py-12 ${cardBg} rounded-lg ${
          theme === "dark" ? "text-gray-100" : "text-gray-800"
        }`}
      >
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-xl font-semibold mb-2">No Winning Contests Yet</h3>
        <p className={`${mutedText}`}>
          Keep participating to win amazing prizes!
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${containerBg}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">
          My Winning Contests ({contests.length})
        </h3>
        <div className={`text-sm ${mutedText}`}>
          Celebrate your victories! 🎉
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest, index) => (
          <div
            key={contest._id}
            className={`${cardBg} rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300`}
          >
            <div className="relative">
              <div
                className={`absolute -top-3 -right-3 ${highlight} px-3 py-1 rounded-full font-bold text-sm`}
              >
                #{index + 1} Winner
              </div>
              <img
                src={contest.image || "/api/placeholder/400/200"}
                alt={contest.title}
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="p-4">
              <h4 className="text-lg font-bold mb-2">{contest.title}</h4>
              <p className={`text-sm mb-3 ${mutedText}`}>
                {contest.description}
              </p>

              <div className="space-y-2">
                <div
                  className={`${innerBg} p-2 rounded flex justify-between items-center`}
                >
                  <span className="text-sm font-medium">Prize Money</span>
                  <span className="text-lg font-bold text-green-500">
                    ${contest.prizeMoney || "N/A"}
                  </span>
                </div>

                <div
                  className={`${innerBg} p-2 rounded flex justify-between items-center`}
                >
                  <span className="text-sm font-medium">Winner</span>
                  <span className={`text-sm ${mutedText}`}>
                    {contest.winnerName || "You"}
                  </span>
                </div>

                <div
                  className={`${innerBg} p-2 rounded flex justify-between items-center`}
                >
                  <span className="text-sm font-medium">Date Won</span>
                  <span className={`text-sm ${mutedText}`}>
                    {new Date(
                      contest.winningDate || contest.deadline
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <span
                  className={`px-2 py-1 ${champBadge} text-xs rounded-full`}
                >
                  🏅 Champion
                </span>
                <span
                  className={`px-2 py-1 ${moneyBadge} text-xs rounded-full`}
                >
                  💰 ${contest.prizeMoney || "N/A"} Earned
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className={`p-4 rounded-lg ${cardBg} border-2 border-yellow-400`}>
          <h4
            className={`text-lg font-bold mb-2 ${
              theme === "dark" ? "text-yellow-300" : "text-yellow-600"
            }`}
          >
            Total Earnings
          </h4>
          <p
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-green-300" : "text-green-600"
            }`}
          >
            $
            {contests.reduce(
              (total, contest) => total + (contest.prizeMoney || 0),
              0
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
