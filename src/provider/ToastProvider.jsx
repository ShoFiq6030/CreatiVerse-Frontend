import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((s) => s.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (type, message, opts = {}) => {
      const id = ++idCounter;
      const toast = { id, type, message, ...opts };
      setToasts((s) => [...s, toast]);
      const timeout = opts.duration ?? 4000;
      if (timeout > 0) setTimeout(() => remove(id), timeout);
      return id;
    },
    [remove]
  );

  return (
    <ToastContext.Provider value={{ push, remove }}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded shadow-lg max-w-sm text-sm font-medium text-white ${
              t.type === "success"
                ? "bg-green-600"
                : t.type === "error"
                ? "bg-red-600"
                : "bg-gray-700"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return {
    success: (msg, opts) => ctx.push("success", msg, opts),
    error: (msg, opts) => ctx.push("error", msg, opts),
    info: (msg, opts) => ctx.push("info", msg, opts),
  };
}

export default ToastProvider;
