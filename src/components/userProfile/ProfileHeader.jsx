import React from "react";
import { Link } from "react-router";
import { useTheme } from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";

export default function ProfileHeader({ onEdit }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const muted = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`flex items-center gap-1 md:gap-6 mb-6`}>
      <div className="w-10 h-10 md:w-28 md:h-28 rounded-full overflow-hidden border-2">
        <img
          src={user?.profileImage || "https://via.placeholder.com/150"}
          alt={user?.name || "User"}
          className="w-10 h-10 md:w-full md:h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold">{user?.name || "Unnamed"}</h2>
            <p className={`text-sm ${muted}`}>{user?.role || "Member"}</p>
            <p className={`mt-2 text-sm ${muted} hidden md:block`}>
              {user?.bio || "No bio yet."}
            </p>
          </div>

          <div className="ml-auto flex gap-2">
            <button
              className=" px-1 md:px-3 md:py-2 text-sm rounded bg-indigo-600 text-white hover:cursor-pointer"
              onClick={ ()=>onEdit("password")}
            >
              Change Password
            </button>
            <button
              className="px-3 py-2 rounded bg-indigo-600 text-white hover:cursor-pointer"
              onClick={()=>onEdit("profile")}
            >
              Edit Profile
            </button>
            {/* <Link to="/all-contests" className="px-3 py-2 rounded border">
              Browse Contests
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
