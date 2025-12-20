import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import Loading from "../components/common/Loading";
import { FiClock } from "react-icons/fi";
import { FaDollarSign, FaTrophy, FaUsers } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";
import ContestSubmissionForm from "../components/ContestDetailsPage/ContestSubmissionForm";
import ModalWrapper from "../components/common/ModalWrapper";
import useAuth from "./../hooks/useAuth";
import ParticipationCard from "../components/ContestDetailsPage/ParticipationCard";
import { useToast } from "../provider/ToastProvider";

export default function ContestDetails() {
  const { contestId } = useParams();
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["contest", contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/get-contest/${contestId}`);

      return res.data.data;
    },
    enabled: !!contestId,
  });

  const { data: submissionData, refetch: submissionDataRefetch } = useQuery({
    queryKey: ["submission", contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/${contestId}`);

      return res.data.data;
    },
    enabled: !!contestId,
  });

  const userAlreadyParticipate = () => {
    const found = submissionData?.find(
      (submission) => submission.userId === user._id
    );
    return !!found;
  };

  useEffect(() => {
    if (!data) return;

    const calculateTimeLeft = () => {
      const deadline = new Date(data.deadline).getTime();
      const now = Date.now();
      const difference = deadline - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(
          `${days}d ${String(hours).padStart(2, "0")}h ${String(
            minutes
          ).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`
        );
      } else {
        setTimeLeft("Deadline passed");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Error loading contest.</p>;

  const contest = data;

  const winnerSubmissionId = contest?.winner?.submissionId;

  const copyUrlToClipboard = async () => {
    const currentUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
      success("URL copied to clipboard");
    } catch (err) {
      console.error("Failed to copy URL:", err);
      alert("Failed to copy URL");
    }
  };

  // console.log(user._id);
  // console.log(contest.creator);
  const cardBg =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";
  const metaText = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`container mx-auto relative top-20 px-6 py-10`}>
      <div className={`rounded-lg overflow-hidden shadow ${cardBg}`}>
        {openModal && (
          <ModalWrapper
            isOpen={true}
            title={"Participant Contest"}
            onClose={() => setOpenModal(false)}
          >
            <ContestSubmissionForm
              onClose={() => setOpenModal(false)}
              refetch={refetch}
              submissionDataRefetch={submissionDataRefetch}
            />
          </ModalWrapper>
        )}
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={
                contest.image ||
                "https://via.placeholder.com/800x500?text=No+Image"
              }
              alt={contest.contestName}
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold mb-3">{contest.contestName}</h1>
            <p className={`mb-4 ${metaText}`}>
              {contest.description || "No description provided."}
            </p>

            {/* taskInstruction to do */}
            <p className="mb-4">
              <strong className="underline">Task Instruction:</strong>{" "}
              {contest.taskInstruction || "No task instruction provided."}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <div className={`flex items-center gap-2 ${metaText}`}>
                <FiClock className="text-lg" />{" "}
                <span>{winnerSubmissionId ? "Time Over" : timeLeft}</span>
              </div>
              <div className={`flex items-center gap-2 ${metaText}`}>
                <FaUsers className="text-lg" />{" "}
                <span>{contest.participantsCount} participants</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 border rounded">
                <p className="text-sm text-gray-500">Entry Fee</p>
                <p className="font-semibold">
                  <FaDollarSign className="inline mr-1" /> ${contest.price}
                </p>
              </div>
              <div className="p-4 border rounded">
                <p className="text-sm text-gray-500">Prize Money</p>
                <p className="font-semibold text-green-600">
                  <FaTrophy className="inline mr-1" /> ${contest.prizeMoney}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              {user?.role === "user" &&
                !userAlreadyParticipate() &&
                !winnerSubmissionId && (
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer"
                    onClick={() => setOpenModal(true)}
                  >
                    Enter Contest
                  </button>
                )}

              <button
                onClick={copyUrlToClipboard}
                className="px-4 py-2 border rounded text-sm cursor-pointer"
              >
                Share
              </button>
            </div>

            <p className={`text-xs mt-4 ${metaText}`}>
              Published: {new Date(contest.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Submissions Section */}
        <div className="border-t mt-6">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Submissions</h2>
            {submissionData && submissionData.length > 0 ? (
              <div className="w-full h-100">
                {submissionData.map((submission) => (
                  <ParticipationCard
                    key={submission._id}
                    submission={submission}
                    currentUserId={user?._id}
                    contest={contest}
                    isWinner={submission._id === winnerSubmissionId}
                  />
                ))}
              </div>
            ) : (
              <p className={`text-sm ${metaText}`}>
                No submissions yet. Be the first to participate!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
