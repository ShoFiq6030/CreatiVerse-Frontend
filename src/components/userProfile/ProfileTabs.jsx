import React, { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

export default function ProfileTabs({ children }) {
  const [tab, setTab] = useState("participated");
  const { theme } = useTheme();
  const active =
    theme === "dark" ? "bg-indigo-600 text-white" : "bg-indigo-600 text-white";

  // Helper: support both patterns for passing tab content:
  // 1) as named properties on children (children.participated)
  // 2) as React elements with a boolean prop (e.g., <div participated>)
  const getChild = (name) => {
    if (children && typeof children === "object" && children[name]) {
      return children[name];
    }
    const arr = React.Children.toArray(children);
    const found = arr.find(
      (child) => child && child.props && child.props[name]
    );
    return found || null;
  };

  return (
    <div>
      <div className="flex gap-2 mb-4 border-b border-gray-300 pb-2">
        <button
          className={`px-4 py-2 rounded-lg cursor-pointer font-medium transition-all duration-200 ${
            tab === "participated"
              ? active
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => setTab("participated")}
        >
          My Participated Contests
        </button>
        <button
          className={`px-4 py-2 rounded-lg cursor-pointer font-medium transition-all duration-200 ${
            tab === "winning"
              ? active
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => setTab("winning")}
        >
          My Winning Contests
        </button>
        <button
          className={`px-4 py-2 rounded-lg cursor-pointer font-medium transition-all duration-200 ${
            tab === "profile"
              ? active
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => setTab("profile")}
        >
          My Profile
        </button>
      </div>

      <div className="mt-4">
        {tab === "participated" && <div>{getChild("participated")}</div>}
        {tab === "winning" && <div>{getChild("winning")}</div>}
        {tab === "profile" && <div>{getChild("profile")}</div>}
      </div>
    </div>
  );
}
