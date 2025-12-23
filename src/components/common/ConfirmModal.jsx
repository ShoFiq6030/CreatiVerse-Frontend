import React from "react";
import Loading from "./Loading";
import { useTheme } from "../../hooks/useTheme";

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "btn-primary",
  loading = false,
}) {
  const { theme } = useTheme();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 rounded-xl w-full max-w-md p-6 relative shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3
            className={`${
              theme === "dark" ? "text-white" : " text-black"
            }text-lg font-semibold`}
          >
            {title}
          </h3>
          <button
            onClick={onCancel}
            className="btn btn-sm btn-circle btn-ghost"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="mb-6">
          <p
            className={`${
              theme === "dark" ? "text-white" : " text-black"
            }`}
          >
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 justify-end">
          <button className="btn" onClick={onCancel} disabled={loading}>
            {cancelText}
          </button>
          <button
            className={`btn ${confirmVariant}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
