import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../components/loginRegistration/Login";
import Registration from "../components/loginRegistration/Registration";
import EmailVerify from "../components/loginRegistration/EmailVerify";
import AllContest from "../pages/AllContest";
import ContestDetails from "../pages/ContestDetails";
import About from "../pages/About";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import AdminProfile from "../pages/AdminProfile";
import CreatorProfile from "../pages/CreatorProfile";
import UserProfilePage from "../pages/UserProfilePage";

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
        path: "/all-contest",
        element: <AllContest />,
      },
      {
        path: "/contest/:contestId",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
      },
    
      {
        path: "/auth/profile/admin/:userId",
        element: (
          <PrivateRoute>
            <AdminProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/auth/profile/creator/:userId",
        element: (
          <PrivateRoute>
            <CreatorProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/auth/profile/user/:userId",
        element: (
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
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
