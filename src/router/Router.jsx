import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../components/loginRegistration/Login";
import Registration from "../components/loginRegistration/Registration";
import EmailVerify from "../components/loginRegistration/EmailVerify";

let router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        index: true,
        element: <Login />,
      },
      {
        path: "/registration",
        index: true,
        element: <Registration />,
      },
      {
        path: "/verify-email",
        element: <EmailVerify />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
