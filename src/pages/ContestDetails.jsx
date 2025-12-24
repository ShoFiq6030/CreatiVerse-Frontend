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
import PaymentConfirmModal from "../components/ContestDetailsPage/PaymentConfirmModal";

export default function ContestDetails() {
  const { contestId } = useParams();
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [loading,setLoading] =useState(false)
  const { user } = useAuth();
  const { success, error } = useToast();

  const {
    data,
    isLoading,
    error: contestError,
    refetch,
  } = useQuery({
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
  const { data: paymentData, refetch: paymentDataRefetch } = useQuery({
    queryKey: ["payment", user?._id, contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/payment-info`, {
        params: {
          userId: user._id,
          contestId: contest._id,
        },
      });

      return res.data.data;
    },
  });
  // console.log(paymentData);

  const userAlreadyParticipate = () => {
    const found = submissionData?.find(
      (submission) => submission.userId._id === user._id
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
  const copyUrlToClipboard = async () => {
    const currentUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(currentUrl);
      success("URL copied to clipboard");
    } catch (err) {
      console.error("Failed to copy URL:", err);
      alert("Failed to copy URL");
    }
  };
  const openPopup = (urlFromBackend) => {
    const width = 400;
    const height = 700;
    const left = window.screen.width - width / 2;
    const top = window.screen.height - height / 2;

    // Opens a centered popup window
    window.open(
      urlFromBackend, // URL from backend
      "_blank", // Opens in new tab/popup
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
  };
  const handleEnterContest = async () => {
    setPaymentModal(true);
  };
  const handlePayment = async () => {
    // setPaymentModal(false);
    // setOpenModal(true);
    try {
      setLoading(true)
      const res = await axiosSecure.post(`/payments/process-payment`, {
        userId: user._id,
        contestId: contest._id,
      });
      if (!res.data.url) {
        throw new Error("Payment URL not received");
      }
      const { url } = res.data;
      // openPopup(url);
      window.location.replace(url);
      // console.log(url);
    } catch (error) {
      console.log(error);
      error("Payment failed. Please try again.");
    }finally{
      setLoading(false)
    }
  };
  const handleSubmission = () => {
    setOpenModal(true);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  if (contestError)
    return <p className="text-red-500 min-h-screen flex items-center justify-center">Error loading contest.</p>;

  const contest = data;

  const winnerSubmissionId = contest?.winner?.submissionId;
  // console.log(user._id);
  // console.log(contest.creator);
  const cardBg =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";
  const metaText = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`container mx-auto  my-20 px-6 py-10`}>
      <div className={`rounded-lg  shadow ${cardBg}`}>
        {paymentModal && (
          <PaymentConfirmModal
            open={paymentModal}
            onClose={() => setPaymentModal(false)}
            entryFee={contest.price}
            onPay={handlePayment}
            loading={loading}
          />
        )}

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
                    className={`px-4 ${
                      paymentData?.status === "success" && "hidden"
                    } py-2 bg-indigo-600 text-white rounded cursor-pointer`}
                    onClick={handleEnterContest}
                  >
                    Enter Contest
                  </button>
                )}
              {paymentData?.status === "success" &&
                !userAlreadyParticipate() && (
                  <button
                    className={`px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer`}
                    onClick={handleSubmission}
                  >
                    submit your work
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
              <div className="w-full h-full space-y-4">
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
