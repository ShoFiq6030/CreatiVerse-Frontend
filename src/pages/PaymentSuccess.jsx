import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import Loading from "../components/common/Loading";
import { useTheme } from "../hooks/useTheme";
import {
  FaCheckCircle,
  FaDollarSign,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const tran_id = searchParams.get("tran_id");

  const navigate = useNavigate();
  const { theme } = useTheme();
  const [contestData, setContestData] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["payment-info", tran_id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/get-payment-info/${tran_id}`);
      return res.data.data;
    },
    enabled: !!tran_id,
  });



  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="text-red-500">Error loading payment information.</div>
    );
  if (!data) return <div>No payment information found.</div>;

  const cardBg =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";
  const metaText = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const successBg =
    theme === "dark"
      ? "bg-green-900/20 border-green-700"
      : "bg-green-50 border-green-200";
const formateDateAndTime = (dateString) => {
    const options = {
      year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }


  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      <div
        className={`max-w-md w-full space-y-8 ${cardBg} rounded-xl shadow-lg p-8`}
      >
        {/* Success Icon */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 border-4 border-green-500">
            <FaCheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold">Payment Successful!</h2>
          <p className={`mt-2 text-sm ${metaText}`}>
            Your payment has been processed successfully
          </p>
        </div>

        {/* Payment Details */}
        <div className={`mt-8 border ${successBg} rounded-lg p-6`}>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaDollarSign className="mr-2" />
            Payment Details
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={metaText}>Transaction ID:</span>
              <span className="font-medium">{data.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className={metaText}>Amount:</span>
              <span className="font-medium text-green-600">${data.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className={metaText}>Status:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {data.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={metaText}>Date:</span>
              <span className="font-medium">
                {formateDateAndTime(data.createdAt)}
                
              </span>
            </div>
          </div>
        </div>

        {/* Contest Information */}
     

        {/* Actions */}
        <div className="mt-6 space-y-4">
          <Link
            // onClick={handleGoToContest}
            to={`/contest/${data.contestId}`}
            // disabled={!contestData}
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors `}
          >
            Go to Contest
          </Link>

          <button
            onClick={() => navigate("/")}
            className={`w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
              theme === "dark"
                ? "text-gray-300 bg-gray-700 hover:bg-gray-600 border-gray-600"
                : "text-gray-700 bg-white hover:bg-gray-50"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
          >
            Back to Home
          </button>
        </div>

        {/* Additional Info */}
        <div className={`mt-6 text-center text-sm ${metaText}`}>
          <p>
            Thank you for your payment. You can now participate in the contest.
          </p>
          <p className="mt-2">
            If you have any questions, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
