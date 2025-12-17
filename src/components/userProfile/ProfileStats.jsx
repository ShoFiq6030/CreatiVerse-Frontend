import React from "react";
import { useTheme } from "../../hooks/useTheme";

export default function ProfileStats({ stats = {} }) {
  const { theme } = useTheme();
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-gray-50";

  return (
    <div className={`p-4 rounded-lg shadow ${cardBg}`}>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-sm text-gray-500">Contests</div>
          <div className="text-xl font-semibold">{stats.contests || 0}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Wins</div>
          <div className="text-xl font-semibold">{stats.wins || 0}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Points</div>
          <div className="text-xl font-semibold">{stats.points || 0}</div>
        </div>
      </div>
    </div>
  );
}
