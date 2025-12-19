import React from "react";
import { useTheme } from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";

export default function ProfileStats({ stats = {} }) {
  const { theme } = useTheme();
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-gray-50";
  const {user}=useAuth()
  const adminAndCreator= user?.role === 'admin' || user?.role ==='creator';
  const normalUser= user?.role === 'user';

  return (
    <div className={`p-4 rounded-lg shadow ${cardBg}`}>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-sm text-gray-500">{adminAndCreator ? "Contests" : "Participated"}</div>
          <div className="text-xl font-semibold">{stats.contests || stats.participated || 0}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">{adminAndCreator ? "Approved" : "Wins"}</div>
          <div className="text-xl font-semibold">{stats.wins ||stats.approved|| 0}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">{adminAndCreator ? "Completed" : "Earnings"}</div>
          <div className="text-xl font-semibold">{stats.points ||stats.completed|| 0}</div>
        </div>
      </div>
    </div>
  );
}
