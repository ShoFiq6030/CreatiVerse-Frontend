import React from "react";
import { FaUser, FaClock, FaImage } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function ParticipationCard({
  submission,
  currentUserId,
  contest,
}) {
  const { user } = useAuth();
  const { theme } = useTheme();
  // Check if this submission belongs to the current user
  const isCurrentUser = submission.userId === currentUserId;

  // Get user display name from submission data
  const userName = user?.name || "Anonymous";

  // Format submission date
  const submissionDate = new Date(submission.createdAt).toLocaleString();

  // Theme-based styling
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const hoverShadow =
    theme === "dark" ? "hover:shadow-gray-900/20" : "hover:shadow-md";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const textTertiary = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const userBg =
    theme === "dark"
      ? "bg-gray-700 text-gray-200"
      : "bg-gray-200 text-gray-700";
  const borderDashed = theme === "dark" ? "border-gray-600" : "border-gray-300";
  const textDashed = theme === "dark" ? "text-gray-400" : "text-gray-500";

  return (
    <div
      className={`rounded-lg p-4 w-full border-2 transition-all duration-300 ${
        isCurrentUser
          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg ring-2 ring-indigo-200 dark:ring-indigo-800"
          : `${borderColor} ${cardBg} ${hoverShadow}`
      }`}
    >
      {/* User Info Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isCurrentUser ? "bg-indigo-500 text-white" : userBg
            }`}
          >
            <FaUser className="text-lg" />
          </div>
          <div>
            <h3
              className={`font-semibold ${
                isCurrentUser ? "text-indigo-700 dark:text-indigo-300" : ""
              }`}
            >
              {userName}
            </h3>
            {isCurrentUser && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                Your Submission
              </span>
            )}
          </div>
        </div>
        <div
          className={`text-xs ${
            isCurrentUser
              ? "text-indigo-600 dark:text-indigo-400"
              : textSecondary
          }`}
        >
          <FaClock className="inline mr-1" />
          {submissionDate}
        </div>
      </div>

      <div>{submission?.submissionText}</div>

      {/* Submission Image */}
      <div className="mb-3">
        {submission?.submissionImg ? (
          <div
            className={`relative rounded-lg overflow-hidden border ${borderColor} group`}
          >
            <img
              src={submission.submissionImg}
              alt={`${userName}'s submission`}
              className=" object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = "none";
                const fallback = e.target.nextElementSibling;
                if (fallback) fallback.style.display = "block";
              }}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <FaImage className="text-sm" />
              <span>Submission Image</span>
            </div>

            {/* Fallback for broken images */}
            <div
              className="hidden absolute inset-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 text-sm"
              style={{ display: "none" }}
            >
              <FaImage className="mr-2" />
              Image not available
            </div>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed ${borderDashed} rounded-lg p-8 text-center ${textDashed}`}
          >
            <FaImage className="mx-auto text-3xl mb-2" />
            <p>No image provided</p>
          </div>
        )}
      </div>

      {/* Submission Content */}
      <div className="space-y-3">
        {/* Description */}
        {submission.description && (
          <div className={`text-sm ${textTertiary} line-clamp-3`}>
            "{submission.description}"
          </div>
        )}

        {/* Submission ID */}
        <div
          className={`flex justify-between items-center text-xs ${textSecondary}`}
        >
          <span>Submission ID: {submission._id?.slice(-6)}</span>
          {contest.creator === user._id ? (
            <span
              className={`px-2 py-1 rounded hover:cursor-pointer hover:bg-indigo-500  ${
                theme === "dark" ? "text-indigo-300 bg-indigo-900/50 " : "text-indigo-900 bg-indigo-300" 
              }  
                
            `}
            >
              Make Winner
            </span>
          ) : (
            <span
              className={`px-2 py-1 rounded ${
                isCurrentUser
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {submission.status || "Submitted"}
            </span>
          )}
        </div>
      </div>

      {/* Highlight Border for Current User */}
      {isCurrentUser && (
        <div className="absolute inset-0 rounded-lg pointer-events-none"></div>
      )}
    </div>
  );
}
