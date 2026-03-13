import { useAuth } from "@/global/store/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Protect routes by checking if a user is "connected".
 * Used as a layout route — nested routes render via <Outlet />.
 */
const ProtectedRoute = () => {
  const location = useLocation();
  const { user, accessToken } = useAuth();

  if (!user || !accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;