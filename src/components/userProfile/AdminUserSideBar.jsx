import React from "react";
import ProfileStats from "./ProfileStats";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function AdminUserSideBar({
  statsVisible = false,
  stats,
  setContestModalOpen,
}) {
  const { user } = useAuth();

  return (
    <aside className="md:col-span-1 order-1 md:order-2">
      <div className="sticky top-6 space-y-4">
        {statsVisible && <ProfileStats stats={stats} />}

        {/* <div className="p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">About</h4>
              <p className="text-sm">{data?.bio || "No bio yet."}</p>
            </div> */}

        <div className="p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Admin Actions</h4>
          <Link
            to={`${
              statsVisible
                ? "/admin/manage-users"
                : `/auth/profile/admin/${user?._id}`
            }`}
            className="btn w-full mb-2"
          >
            {statsVisible ? "Manage users" : "Manage contests "}
          </Link>
          {statsVisible && (
            <button
              className="btn w-full mb-2"
              onClick={() => setContestModalOpen(true)}
            >
              Create Contest
            </button>
          )}

          {/* <button className="btn w-full">System Settings</button> */}
        </div>
      </div>
    </aside>
  );
}
