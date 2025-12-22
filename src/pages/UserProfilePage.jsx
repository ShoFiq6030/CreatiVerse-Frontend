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

export default function UserProfilePage() {
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
  const {
    data: userContestData,
    isLoading: userContestLoading,
    isError: userContestError,
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

  // console.log(userContestData);

  if (isLoading || userContestLoading || userWinningContestLoading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  if (isError || userContestError || userWinningContestError) {
    return (
      <div className="container h-screen mx-auto px-6 py-10 text-red-500">
        Error loading user profile data
      </div>
    );
  }

  // // Mock data for contests (in real app, this would come from API)
  // const participatedContests = data.participatedContests || [];
  // const winningContests = data.winningContests || [];
  const userStats = {
    participated: userContestData.length,
    wins: userWinningContestData.length,
    totalEarnings: userWinningContestData.reduce(
      (total, contest) => total + (contest.prizeMoney || 0),
      0
    ),
    avgRating: (
      (userWinningContestData.length / userContestData.length) *
      100
    ).toFixed(2),
  };

  return (
    <div className={`container min-h-screen mx-auto px-6 py-10 ${wrapperBg}`}>
      {editing && (
        <ModalWrapper
          title={"Profile Edit Form"}
          isOpen={true}
          onClose={() => setEditing(false)}
        >
          <EditProfileForm user={data} onClose={() => setEditing(false)} />
        </ModalWrapper>
      )}

      <ProfileHeader user={data} onEdit={() => setEditing(true)} />

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
