import React from "react";
import { useTheme } from "../../hooks/useTheme";

export default function ProfileAnalytics({ userStats = {} }) {
  const { theme } = useTheme();
  
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
  
  // Calculate win percentage
  const participated = userStats.participated || 0;
  const wins = userStats.wins || 0;
  const winPercentage = participated > 0 ? Math.round((wins / participated) * 100) : 0;

  // Generate chart data
  const chartData = {
    win: winPercentage,
    lose: 100 - winPercentage
  };

  const getChartColor = (percentage) => {
    if (percentage >= 80) return '#10b981'; // Green
    if (percentage >= 60) return '#3b82f6'; // Blue
    if (percentage >= 40) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  return (
    <div className={`space-y-6 ${cardBg} rounded-lg p-6 ${textColor}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">My Profile Analytics</h3>
        <div className="text-sm text-gray-500">
          Performance Overview
        </div>
      </div>

      {/* Win Percentage Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl">
          <h4 className="text-lg font-semibold mb-4 text-center">Win Percentage</h4>
          
          <div className="relative">
            <svg className="w-full h-64" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              
              {/* Win percentage arc */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={getChartColor(chartData.win)}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${chartData.win * 2.83} 283`}
                transform="rotate(-90 50 50)"
              />
              
              {/* Center text */}
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dy=".3em"
                className="text-2xl font-bold"
                fill={theme === "dark" ? "#ffffff" : "#1f2937"}
              >
                {winPercentage}%
              </text>
            </svg>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {wins} wins out of {participated} participated contests
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">{participated}</div>
              <div className="text-sm text-gray-600">Total Participated</div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">{wins}</div>
              <div className="text-sm text-gray-600">Total Wins</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-purple-600">
                ${userStats.totalEarnings || 0}
              </div>
              <div className="text-sm text-gray-600">Total Earnings</div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-orange-600">
                {userStats.avgRating || 0}/5
              </div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-4">Performance Insights</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium">Strong Performance</span>
            </div>
            <p className="text-sm mt-2 text-gray-600">
              {winPercentage >= 50 ? 'Keep up the great work!' : 'There\'s room for improvement.'}
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'}`}>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium">Earning Potential</span>
            </div>
            <p className="text-sm mt-2 text-gray-600">
              You've earned ${userStats.totalEarnings || 0} from contests
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}`}>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="font-medium">Community Rating</span>
            </div>
            <p className="text-sm mt-2 text-gray-600">
              Average rating of {userStats.avgRating || 0}/5 from participants
            </p>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-4">Achievement Badges</h4>
        
        <div className="flex flex-wrap gap-3">
          {participated >= 5 && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              🏃‍♂️ Active Participant
            </span>
          )}
          {wins >= 3 && (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              🏆 Multi-Winner
            </span>
          )}
          {winPercentage >= 70 && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              🎯 Sharp Shooter
            </span>
          )}
          {userStats.totalEarnings >= 100 && (
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              💎 High Earner
            </span>
          )}
          {participated === 0 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              🎯 Ready to Start
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
