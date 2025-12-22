import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useTheme } from "../hooks/useTheme";
import { FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const tran_id = searchParams.get("tran_id");
  const contest_id = searchParams.get("contest_id");

//   const reason = searchParams.get("reason");
  const { theme } = useTheme();
  const navigate = useNavigate();

  const cardBg =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";
  const metaText = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const failedBg =
    theme === "dark"
      ? "bg-red-900/20 border-red-700"
      : "bg-red-50 border-red-200";

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      <div
        className={`max-w-md w-full space-y-8 ${cardBg} rounded-xl shadow-lg p-8`}
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 border-4 border-red-500">
            <FaTimesCircle className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold">Payment Failed</h2>
          <p className={`mt-2 text-sm ${metaText}`}>
            Unfortunately, your payment could not be processed.
          </p>
        </div>

        <div className={`mt-8 border ${failedBg} rounded-lg p-6`}>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaExclamationTriangle className="mr-2" /> Failure Details
          </h3>

          <div className="space-y-3 text-sm">
            {tran_id && (
              <div className="flex justify-between">
                <span className={metaText}>Transaction ID:</span>
                <span className="font-medium">{tran_id}</span>
              </div>
            )}
            {contest_id && (
              <div className="flex justify-between">
                <span className={metaText}>Contest ID:</span>
                <span className="font-medium">{contest_id}</span>
              </div>
            )}
            {/* {reason && (
              <div className="flex justify-between">
                <span className={metaText}>Reason:</span>
                <span className="font-medium">
                  {decodeURIComponent(reason)}
                </span>
              </div>
            )} */}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Link
            to={`/contest/${contest_id}`}
            className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors `}
          >
            Back to Contest
          </Link>

          <Link
            to="/"
            className={`w-full block text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
              theme === "dark"
                ? "text-gray-300 bg-gray-700 hover:bg-gray-600 border-gray-600"
                : "text-gray-700 bg-white hover:bg-gray-50"
            }`}
          >
            Go to Home
          </Link>
        </div>

        <div className={`mt-6 text-center text-sm ${metaText}`}>
          <p>If you need help, please contact support or try again later.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
