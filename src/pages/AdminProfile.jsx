import React, { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import { Link, useParams } from "react-router";
import ProfileHeader from "../components/userProfile/ProfileHeader";
import ProfileStats from "../components/userProfile/ProfileStats";
import ProfileTabs from "../components/userProfile/ProfileTabs";
import EditProfileForm from "../components/userProfile/EditProfileForm";
import ModalWrapper from "../components/common/ModalWrapper";
import ContestCard from "../components/common/ContestCard";
import UpdateCreateContestForm from "../components/common/UpdateCreateContestForm";
import Loading from "../components/common/Loading";
import useAuth from "../hooks/useAuth";

export default function AdminProfile() {
  const { theme } = useTheme();
  const [editing, setEditing] = useState(false);
  const [contestModalOpen, setContestModalOpen] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openEditPasswordModal, setOpenEditPasswordModal] = useState(false);
  const { userId } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const wrapperBg =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${userId}`);
      return res.data.data;
    },
  });

  const { data: userContest, refetch: refetchContests } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`contest/get-contests-auth`);
      return res.data.data;
    },
  });

  const handleEdit = (value) => {
    if (value === "profile") {
      setOpenEditProfileModal(true);
    } else if (value === "password") {
      setOpenEditPasswordModal(true);
    }
  };
  console.log(userContest);
  if (user.role !== "admin") {
    return (
      <div className="container mx-auto px-6 py-10 text-red-500">
        Access Denied. You do not have permission to view this page.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-6 py-10 text-red-500">
        Error loading user profile data
      </div>
    );
  }
  refetchContests();

  const pendingContest =
    userContest?.contests?.filter((c) => c.status === "pending") || [];

  const approvedContest =
    userContest?.contests
      ?.filter((c) => c.status === "approved")
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) || [];

  const completeContest =
    userContest?.contests
      ?.filter((c) => c.status === "completed")
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) || [];

  const stats = {
    contests: userContest?.contests?.length || 0,
    approved: approvedContest?.length,
    completed: completeContest?.length || 0,
  };

  return (
    <div className={`container min-h-screen mx-auto px-6 py-10 ${wrapperBg}`}>
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
          Admin
        </span>
      </div>

      <ProfileHeader user={data} onEdit={handleEdit} />
      {/* profile edit modal  */}
      {openEditProfileModal && (
        <ModalWrapper
          title={"Profile Edit Form"}
          isOpen={true}
          onClose={() => setOpenEditProfileModal(false)}
        >
          <EditProfileForm
            editValue="profile"
            user={data}
            onClose={() => setOpenEditProfileModal(false)}
          />
        </ModalWrapper>
      )}
      {/* password change modal  */}
      {openEditPasswordModal && (
        <ModalWrapper
          title={"Change Password"}
          isOpen={true}
          onClose={() => setOpenEditPasswordModal(false)}
        >
          <EditProfileForm
            editValue="password"
            user={data}
            onClose={() => setOpenEditPasswordModal(false)}
          />
        </ModalWrapper>
      )}
      {/* create contest  */}
      <ModalWrapper
        isOpen={contestModalOpen}
        title={selectedContest ? "Edit Contest" : "Create Contest"}
        onClose={() => {
          setContestModalOpen(false);
          setSelectedContest(null);
        }}
      >
        <UpdateCreateContestForm
          refetchContests={refetchContests}
          contest={selectedContest}
          userRole={user?.role}
          onClose={() => {
            setContestModalOpen(false);
            setSelectedContest(null);
          }}
          onSuccess={() => {
            queryClient.invalidateQueries(["userProfile", userId]);
          }}
        />
      </ModalWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 order-2 md:order-2">
          <ProfileTabs>
            <div participated>
              <div className="space-y-6">
                <div className="mb-4">
                  {/* <ProfileStats stats={stats} /> */}
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Pending Contests
                  </h3>
                  {pendingContest.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pendingContest.map((s) => (
                        <ContestCard
                          key={s._id}
                          contest={s}
                          onEdit={(contest) => {
                            setSelectedContest(contest);
                            setContestModalOpen(true);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm">No pending contests.</p>
                  )}
                </div>
              </div>
            </div>

            <div winning>
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Latest Approved Contests
                </h3>
                {approvedContest.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {approvedContest.map((s) => (
                      <ContestCard
                        key={s._id}
                        contest={s}
                        onEdit={(contest) => {
                          setSelectedContest(contest);
                          setContestModalOpen(true);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p>No contests yet.</p>
                )}
              </div>
            </div>

            <div profile>
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Latest Completed Contests
                </h3>
                {completeContest.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {completeContest.map((s) => (
                      <ContestCard
                        key={s._id}
                        contest={s}
                        onEdit={(contest) => {
                          setSelectedContest(contest);
                          setContestModalOpen(true);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p>No contests yet.</p>
                )}
              </div>
            </div>
          </ProfileTabs>
        </div>
        <aside className="md:col-span-1 order-1 md:order-1">
          <div className="sticky top-6 space-y-4">
            <ProfileStats stats={stats} />

            {/* <div className="p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">About</h4>
              <p className="text-sm">{data?.bio || "No bio yet."}</p>
            </div> */}

            <div className="p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Admin Actions</h4>
              <Link to={`/admin/manage-users`} className="btn w-full mb-2">
                Manage Users
              </Link>
              <button
                className="btn w-full mb-2"
                onClick={() => setContestModalOpen(true)}
              >
                Create Contest
              </button>
              {/* <button className="btn w-full">System Settings</button> */}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
