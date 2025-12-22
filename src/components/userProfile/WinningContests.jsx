import React from "react";
import { useTheme } from "../../hooks/useTheme";

export default function WinningContests({ contests = [] }) {
  const { theme } = useTheme();
  
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const highlightBg = theme === "dark" ? "bg-yellow-400" : "bg-yellow-400";

  if (contests.length === 0) {
    return (
      <div className={`text-center py-12 ${cardBg} rounded-lg ${textColor}`}>
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-xl font-semibold mb-2">No Winning Contests Yet</h3>
        <p className="text-gray-500">Keep participating to win amazing prizes!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">My Winning Contests ({contests.length})</h3>
        <div className="text-sm text-gray-500">
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
              <div className={`absolute -top-3 -right-3 ${highlightBg} text-black px-3 py-1 rounded-full font-bold text-sm`}>
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
              <p className="text-sm text-gray-600 mb-3">{contest.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <span className="text-sm font-medium">Prize Money</span>
                  <span className="text-lg font-bold text-green-600">
                    ${contest.prizeMoney || 'N/A'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <span className="text-sm font-medium">Winner</span>
                  <span className="text-sm">{contest.winnerName || 'You'}</span>
                </div>
                
                {/* <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <span className="text-sm font-medium">Category</span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {contest.category}
                  </span>
                </div> */}
                
                <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <span className="text-sm font-medium">Date Won</span>
                  <span className="text-sm">
                    {new Date(contest.winningDate || contest.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  🏅 Champion
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  💰 ${contest.prizeMoney || 'N/A'} Earned
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <div className={`p-4 rounded-lg ${cardBg} border-2 border-yellow-400`}>
          <h4 className="text-lg font-bold text-yellow-600 mb-2">Total Earnings</h4>
          <p className="text-3xl font-bold text-green-600">
            ${contests.reduce((total, contest) => total + (contest.prizeMoney || 0), 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
