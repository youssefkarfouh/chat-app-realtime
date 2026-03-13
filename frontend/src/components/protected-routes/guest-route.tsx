import { useAuth } from "@/global/store/useAuth";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Prevent authenticated users from accessing guest-only routes (login, register).
 * If the user is already logged in, redirect them to the home page.
 */
const GuestRoute = () => {
  const { user, accessToken } = useAuth();

  if (user && accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
