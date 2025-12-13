import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";

import router from "./router/Router.jsx";
import { ThemeProvider } from "./context/ThemeContest.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
  // </StrictMode>
);
