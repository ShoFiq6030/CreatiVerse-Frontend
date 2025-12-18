import React, { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

export default function ProfileTabs({ children }) {
  const [tab, setTab] = useState("overview");
  const { theme } = useTheme();
  const active =
    theme === "dark" ? "bg-indigo-600 text-white" : "bg-indigo-600 text-white";

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-2 rounded ${
            tab === "overview" ? active : "border"
          }`}
          onClick={() => setTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-3 py-2 rounded ${
            tab === "submissions" ? active : "border"
          }`}
          onClick={() => setTab("submissions")}
        >
          My Submissions
        </button>
        {/* <button
          className={`px-3 py-2 rounded ${
            tab === "settings" ? active : "border"
          }`}
          onClick={() => setTab("settings")}
        >
          Settings
        </button> */}
      </div>

      <div>
        {tab === "overview" && <div>{children.overview}</div>}
        {tab === "submissions" && <div>{children.submissions}</div>}
        {tab === "settings" && <div>{children.settings}</div>}
      </div>
    </div>
  );
}
