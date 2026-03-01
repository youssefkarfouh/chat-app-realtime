import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Protect routes by checking if a user is "connected".
 * This project stores the username in localStorage (key: "username"),
 * so we treat presence of that key as authentication.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const username = localStorage.getItem("username");

  if (!username) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;