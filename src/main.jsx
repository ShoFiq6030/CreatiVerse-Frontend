import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import router from "./router/Router.jsx";
import { ThemeProvider } from "./context/ThemeContest.jsx";
import QueryProvider from "./provider/QueryProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>
);
