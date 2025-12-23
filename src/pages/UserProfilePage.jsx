import React, { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import { useParams } from "react-router";
import ProfileHeader from "../components/userProfile/ProfileHeader";
import ProfileStats from "../components/userProfile/ProfileStats";
import ProfileTabs from "../components/userProfile/ProfileTabs";
import EditProfileForm from "../components/userProfile/EditProfileForm";
import ParticipatedContests from "../components/userProfile/ParticipatedContests";
import WinningContests from "../components/userProfile/WinningContests";
import ProfileAnalytics from "../components/userProfile/ProfileAnalytics";
import Loading from "../components/common/Loading";
import ModalWrapper from "../components/common/ModalWrapper";
import useAuth from "../hooks/useAuth";

export default function UserProfilePage() {
  const { theme } = useTheme();
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openEditPasswordModal, setOpenEditPasswordModal] = useState(false);
  const { userId } = useParams();
  const { user } = useAuth();

  const wrapperBg =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${userId}`);
      return res.data.data;
    },
  });
  const {
    data: userParticipatedContestData,
    isLoading: userParticipatedContestLoading,
    isError: userParticipatedContestError,
  } = useQuery({
    queryKey: ["userContestData", userId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/contest-participated/${userId}`
      );
      return res.data.data;
    },
  });
  const {
    data: userWinningContestData,
    isLoading: userWinningContestLoading,
    isError: userWinningContestError,
  } = useQuery({
    queryKey: ["userWinningContestData", userId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/contest-win/${userId}`);
      return res.data.data;
    },
  });

  const userContestData = userParticipatedContestData?.filter(
    (contest) => contest.contestDetails.status !== "completed"
  );
  const handleEdit = (value) => {
    if (value === "profile") {
      setOpenEditProfileModal(true);
    } else if (value === "password") {
      setOpenEditPasswordModal(true);
    }
  };

  // console.log(userContestData);
  if (user.role !== "user") {
    return (
      <div className="container h-screen mx-auto px-6 py-10 text-red-500">
        Access Denied. You do not have permission to view this page.
      </div>
    );
  }
  if (
    isLoading ||
    userParticipatedContestLoading ||
    userWinningContestLoading
  ) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  if (isError || userParticipatedContestError || userWinningContestError) {
    return (
      <div className="container h-screen mx-auto px-6 py-10 text-red-500">
        Error loading user profile data
      </div>
    );
  }

  const userStats = {
    participated: userParticipatedContestData.length,
    wins: userWinningContestData.length,
    points: userWinningContestData?.reduce(
      (total, contest) => total + (contest?.prizeMoney || 0),
      0
    ),
  };
  console.log(userWinningContestData);
  return (
    <div className={`container min-h-screen mx-auto px-6 py-10 ${wrapperBg}`}>
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

      <ProfileHeader user={data} onEdit={handleEdit} />

      <div className="mt-8">
        <ProfileStats stats={userStats} />
      </div>

      <div className="mt-8">
        <ProfileTabs>
          <div participated>
            <ParticipatedContests contests={userContestData || []} />
          </div>
          <div winning>
            <WinningContests contests={userWinningContestData} />
          </div>
          <div profile>
            <ProfileAnalytics userStats={userStats} />
          </div>
        </ProfileTabs>
      </div>
    </div>
  );
}
