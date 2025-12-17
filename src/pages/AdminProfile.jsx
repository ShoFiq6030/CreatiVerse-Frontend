import React, { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import { useParams } from "react-router";
import ProfileHeader from "../components/userProfile/ProfileHeader";
import ProfileStats from "../components/userProfile/ProfileStats";
import ProfileTabs from "../components/userProfile/ProfileTabs";
import EditProfileForm from "../components/userProfile/EditProfileForm";
import ContestCard from "../components/common/ContestCard";
import Loading from "../components/common/Loading";

export default function AdminProfile() {
  const { theme } = useTheme();
  const [editing, setEditing] = useState(false);
  const { userId } = useParams();

  const wrapperBg =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${userId}`);
      return res.data.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-6 py-10 text-red-500">
        Error loading user profile data
      </div>
    );
  }

  const stats = data?.stats || { contests: 0, wins: 0, points: 0 };
  const submissions = data?.submissions || [];

  return (
    <div className={`container mx-auto px-6 py-10 ${wrapperBg}`}>
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
          Admin
        </span>
      </div>
      
      <ProfileHeader user={data} onEdit={() => setEditing(true)} />

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <ProfileTabs
            children={{
              overview: (
                <div className="space-y-6">
                  <div className="mb-4">
                    <ProfileStats stats={stats} />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Recent Submissions
                    </h3>
                    {submissions.length ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {submissions.map((s) => (
                          <ContestCard key={s._id} contest={s} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm">
                        You have not submitted to any contests yet.
                      </p>
                    )}
                  </div>
                </div>
              ),
              submissions: (
                <div>
                  <h3 className="text-lg font-semibold mb-3">My Submissions</h3>
                  {submissions.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {submissions.map((s) => (
                        <ContestCard key={s._id} contest={s} />
                      ))}
                    </div>
                  ) : (
                    <p>No submissions yet.</p>
                  )}
                </div>
              ),
              settings: (
                <div className="max-w-xl">
                  {editing ? (
                    <EditProfileForm
                      user={data}
                      onClose={() => setEditing(false)}
                    />
                  ) : (
                    <div>
                      <p className="mb-2">Name: {data?.name || "-"}</p>
                      <p className="mb-2">Email: {data?.email || "-"}</p>
                      <p className="mb-2">Role: {data?.role || "-"}</p>
                      <button
                        className="btn mt-3"
                        onClick={() => setEditing(true)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ),
            }}
          />
        </div>

        <aside className="md:col-span-1">
          <div className="sticky top-6 space-y-4">
            <ProfileStats stats={stats} />

            <div className="p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">About</h4>
              <p className="text-sm">{data?.bio || "No bio yet."}</p>
            </div>
            
            <div className="p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Admin Actions</h4>
              <button className="btn w-full mb-2">Manage Users</button>
              <button className="btn w-full">System Settings</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
