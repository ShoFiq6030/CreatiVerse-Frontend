import React from "react";
import { useTheme } from "../../hooks/useTheme";
import ContestCard from "../common/ContestCard";

export default function ParticipatedContests({ contests = [] }) {
  const { theme } = useTheme();
  console.log(contests);

  // Sort contests by upcoming deadline
  const sortedContests = [...contests].sort((a, b) => {
    const dateA = new Date(a.contestDetails.deadline);
    const dateB = new Date(b.contestDetails.deadline);
    return dateA - dateB;
  });
  console.log(sortedContests);
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";

  if (sortedContests.length === 0) {
    return (
      <div className={`text-center py-12 ${cardBg} rounded-lg ${textColor}`}>
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-xl font-semibold mb-2">
          No Participated Contests Yet
        </h3>
        <p className="text-gray-500">Join contests to see them here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">
          Participated Contests ({sortedContests.length})
        </h3>
        <div className="text-sm text-gray-500">Sorted by upcoming deadline</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedContests.map((contest) => (
          <div
            key={contest._id}
            className={`${cardBg} rounded-lg shadow-lg overflow-hidden`}
          >
            <ContestCard contest={contest.contestDetails} />
            <div className="p-4 border-t border-gray-200">
              <h5 className="text-lg font-medium text-center mb-4">
                Payment Details
              </h5>
              <div className="flex justify-between items-center">
                <div className="flex items-center  gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contest?.paymentsDetails?.status === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {contest?.paymentsDetails?.status === "success"
                      ? "✅ Paid"
                      : "⏳ Pending Payment"}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  trans_id: {contest?.paymentsDetails?.transactionId || "N/A"}
                </span>
              </div>
            </div>
            {/* submission info  */}
            <div className="p-4 border-t border-gray-200 flex flex-col  justify-center items-center">
              <h5 className="text-lg font-medium">Submission Details</h5>
              <div className="">
                <span className="text-sm font-medium">
                  text: {contest.submissionText}
                </span>
                {contest.submissionImg ? (
                  <img
                    src={contest.submissionImg}
                    className="w-full h-40"
                    alt="Submission"
                  />
                ) : (
                  <p className="text-sm font-medium">No image submitted</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
