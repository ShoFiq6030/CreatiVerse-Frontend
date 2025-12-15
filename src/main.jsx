import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import router from "./router/Router.jsx";
import { ThemeProvider } from "./context/ThemeContest.jsx";
import QueryProvider from "./provider/QueryProvider.jsx";
import ToastProvider from "./provider/ToastProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>
);
