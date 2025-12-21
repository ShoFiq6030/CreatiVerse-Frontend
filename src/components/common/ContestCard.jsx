import React, { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import {
  FaDollarSign,
  FaTrophy,
  FaUsers,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router";
import { useTheme } from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";
import ConfirmModal from "./ConfirmModal";
import { useQuery } from "@tanstack/react-query";

export default function ContestCard({ contest, onEdit, onDelete }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { theme } = useTheme();

  const { data: userData } = useQuery({
    queryKey: ["user", contest.creator],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${contest.creator}`);
      return res.data.data;
    },
  });
  console.log(userData);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const deadline = new Date(contest.deadline).getTime();
      const now = new Date().getTime();
      const difference = deadline - now;
      const isWinner = contest.status === "completed";
      if (isWinner) {
        setTimeLeft("Contest Completed");
        return;
      }

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
  }, [contest.deadline, contest.status]);

  // Helper to format `createdAt` to a readable date/time
  const formatPublished = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString();
  };

  const cardBg =
    theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800";
  const metaText = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const mutedBg = theme === "dark" ? "bg-gray-700/50" : "bg-white/70";
  const { user } = useAuth();

  // Delete contest function
  const handleDelete = async () => {
    try {
      const response = await axiosSecure.delete(
        `/contest/delete-contest/${contest._id}`
      );
      if (response.data.success) {
        setShowDeleteModal(false);
        if (onDelete) {
          onDelete(contest._id);
        }
      } else {
        // Handle error case - could show error in modal or console
        console.error(response.data.message || "Failed to delete contest");
      }
    } catch (error) {
      console.error("Error deleting contest:", error);
    }
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Contest"
        message={`Are you sure you want to delete "${contest.contestName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <div
        className={`rounded-lg shadow-md overflow-hidden transition transform hover:shadow-lg hover:scale-105 ${cardBg}`}
      >
        <div className="relative">
          <img
            src={
              contest.image ||
              "https://via.placeholder.com/400x300?text=No+Image"
            }
            alt={contest.contestName}
            className="w-full h-48 object-cover"
          />
          <div
            className={`absolute top-3 left-3 px-2 py-1 rounded ${mutedBg} ${metaText} text-xs font-medium`}
          >
            <FiClock aria-hidden className="inline mr-1" />
            <span>{timeLeft}</span>
          </div>
          <div
            className={`absolute top-3 right-3 px-2 py-1 rounded ${mutedBg} ${metaText} text-xs font-medium`}
          >
            <FaUsers aria-hidden className="inline mr-1" />
            <span>{contest.participantsCount}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{contest.contestName}</h3>

          <p className={`text-sm mb-3 ${metaText}`}>
            {contest.description
              ? contest.description.slice(0, 120) +
                (contest.description.length > 120 ? "…" : "")
              : "No description available."}
          </p>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 text-sm">
              {/* creator details  */}
              <div>
                <p className={`flex items-center gap-2 ${metaText}`}>
                  <FaUser className="text-sm" aria-hidden />
                  <span>
                    CreatorId:{" "}
                    <strong className="font-semibold">
                      {contest?.creator}
                    </strong>
                  </span>
                </p>
                {userData && user.role === "admin" && (
                  <>
                    <div>
                      <p className={`flex items-center gap-2 ${metaText}`}>
                        <FaUser className="text-sm" aria-hidden />
                        <span>
                          Name:{" "}
                          <strong className="font-semibold">
                            {userData?.name}
                          </strong>
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className={`flex items-center gap-2 ${metaText}`}>
                        <MdAlternateEmail />

                        <span>
                          Email:{" "}
                          <strong className="font-semibold">
                            {userData?.email}
                          </strong>
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
              <p className={`flex items-center gap-2 ${metaText}`}>
                <FaDollarSign className="text-sm" aria-hidden />
                <span>
                  Entry Fee:{" "}
                  <strong className="font-semibold">${contest.price}</strong>
                </span>
              </p>
              <p className={`flex items-center gap-2 ${metaText}`}>
                <FaTrophy className="text-sm text-green-500" aria-hidden />
                <span>
                  Prize:{" "}
                  <strong className="font-semibold text-green-500">
                    ${contest.prizeMoney}
                  </strong>
                </span>
              </p>
              <p className={`text-xs ${metaText}`}>
                Published {formatPublished(contest.createdAt)}
              </p>
            </div>

            <div className="ml-auto space-y-2">
              <Link
                to={`/contest/${contest._id}`}
                className="inline-block px-3 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition"
              >
                {user?.role === "creator" && user?._id === contest.creator
                  ? "submissions"
                  : " Details"}
              </Link>

              {/* Admin can delete any contest */}
              {user?.role === "admin" && (
                <>
                  <button
                    onClick={() => onEdit?.(contest)}
                    className="btn btn-sm btn-outline w-full"
                    title="Edit contest"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="btn btn-sm btn-outline btn-error w-full flex items-center gap-2"
                    title="Delete contest"
                  >
                    <FaTrash className="text-sm" />
                    Delete
                  </button>
                </>
              )}

              {/* Creator can delete only their own contest when status is pending */}
              {user?.role === "creator" &&
                user?._id === contest.creator &&
                contest.status === "pending" && (
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="btn btn-sm btn-outline btn-error w-full flex items-center gap-2"
                    title="Delete contest"
                  >
                    <FaTrash className="text-sm" />
                    Delete
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
