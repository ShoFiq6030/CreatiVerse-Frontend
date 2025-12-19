import React, { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import app from "./../../utils/firebaseConfig";

export default function ProfileTabs({ children }) {
  const [tab, setTab] = useState("overview");
  const { theme } = useTheme();
  const active =
    theme === "dark" ? "bg-indigo-600 text-white" : "bg-indigo-600 text-white";

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-2 rounded cursor-pointer ${
            tab === "overview" ? active : "border"
          }`}
          onClick={() => setTab("overview")}
        >
          Pending Contests
        </button>
        <button
          className={`px-3 py-2 rounded cursor-pointer ${
            tab === "submissions" ? active : "border"
          }`}
          onClick={() => setTab("submissions")}
        >
          Approved Contests
        </button>
        <button
          className={`px-3 py-2 rounded cursor-pointer ${
            tab === "complete" ? active : "border"
          }`}
          onClick={() => setTab("complete")}
        >
          Completed Contests
        </button>
      </div>

      <div>
        {tab === "overview" && <div>{children.overview}</div>}
        {tab === "submissions" && <div>{children.submissions}</div>}
        {tab === "complete" && <div>{children.complete}</div>}
      </div>
    </div>
  );
}
