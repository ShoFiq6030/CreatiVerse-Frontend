import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, authLoading } = useAuth();
  const location = useLocation();
  if (authLoading) return;

  if (!user) {
    // redirect to login and preserve current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
