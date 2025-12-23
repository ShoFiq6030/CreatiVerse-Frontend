import React from "react";

export default function ModalWrapper({ isOpen, title, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 rounded-xl w-full max-w-lg p-4 sm:p-6 relative mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>

        {/* Body */}
        {children}
      </div>
    </div>
  );
}
