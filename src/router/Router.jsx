import { createBrowserRouter } from "react-router"; 
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";


// 1. Keep Layouts and critical components as standard imports
import PrivateRoute from "../PrivateRoutes/PrivateRoute";

// 2. Convert Page imports to Lazy imports
const Home = lazy(() => import("../pages/Home"));
const AllContest = lazy(() => import("../pages/AllContest"));
const ContestDetails = lazy(() => import("../pages/ContestDetails"));
const AdminProfile = lazy(() => import("../pages/AdminProfile"));
const CreatorProfile = lazy(() => import("../pages/CreatorProfile"));
const UserProfilePage = lazy(() => import("../pages/UserProfilePage"));
const About = lazy(() => import("../pages/About"));
const Login = lazy(() => import("../components/loginRegistration/Login"));
const Registration = lazy(() => import("../components/loginRegistration/Registration"));
const EmailVerify = lazy(() => import("../components/loginRegistration/EmailVerify"));
const ManageUsers = lazy(() => import("../pages/ManageUsers"));
const NotFound = lazy(() => import("../pages/NotFound"));

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
        path: "/all-contests",
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
      {
        path: "/admin/manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;