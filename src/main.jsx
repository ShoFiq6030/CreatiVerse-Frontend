import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import router from "./router/Router.jsx";
import { ThemeProvider } from "./context/ThemeContest.jsx";
import QueryProvider from "./provider/QueryProvider.jsx";
import ToastProvider from "./provider/ToastProvider";
import AuthProvider from "./context/AuthContext";
import Loading from "./components/common/Loading.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <ToastProvider>
            {/* <Suspense fallback={<Loading />}> */}
              <RouterProvider router={router} />
            {/* </Suspense> */}
          </ToastProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>
);
