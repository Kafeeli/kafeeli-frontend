import { Navigate } from "react-router-dom";
import { getStoredUser, getUserRoles } from "../utils/session";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = getStoredUser();

  if (token && user) {
    const roles = getUserRoles(user);

    if (roles.includes("SuperAdmin") || roles.includes("Admin")) {
      return <Navigate to="/admin-dashboard" replace />;
    }

    if (roles.includes("Guardian")) {
      return <Navigate to="/guardian-profile" replace />;
    }

    if (roles.includes("Sponsor")) {
      return <Navigate to="/sponsorProfile" replace />;
    }

    return <Navigate to="/landing-page" replace />;
  }

  return children;
}
