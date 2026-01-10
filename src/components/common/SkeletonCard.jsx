import React from "react";
import { useTheme } from "../../hooks/useTheme";

export default function SkeletonCard({ count = 1 }) {
  const { theme } = useTheme();

  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-gray-200";
  const shimmerBg = theme === "dark" ? "bg-gray-700" : "bg-gray-300";

  const skeletonCards = Array.from({ length: count }, (_, index) => (
    <div
      key={`skeleton-${index}`}
      className={`rounded-2xl overflow-hidden shadow-lg animate-pulse`}
    >
      {/* Image placeholder */}
      <div className={`aspect-square ${cardBg} mb-4`}></div>

      {/* Content area */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className={`h-6 ${shimmerBg} rounded w-3/4`}></div>
        
        {/* Description lines */}
        <div className={`h-4 ${shimmerBg} rounded w-full`}></div>
        <div className={`h-4 ${shimmerBg} rounded w-5/6`}></div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className={`p-3 rounded-lg ${cardBg}`}>
            <div className={`h-3 ${shimmerBg} rounded w-1/2 mb-2`}></div>
            <div className={`h-4 ${shimmerBg} rounded w-3/4`}></div>
          </div>
          <div className={`p-3 rounded-lg ${cardBg}`}>
            <div className={`h-3 ${shimmerBg} rounded w-1/2 mb-2`}></div>
            <div className={`h-4 ${shimmerBg} rounded w-3/4`}></div>
          </div>
        </div>

        {/* Button placeholder */}
        <div className={`h-10 ${shimmerBg} rounded-lg mt-4`}></div>
      </div>
    </div>
  ));

  return <>{skeletonCards}</>;
}
