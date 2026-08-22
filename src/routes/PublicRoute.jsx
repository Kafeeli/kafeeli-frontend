import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user) {
    if (user.role === "SuperAdmin" || user.role === "Admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    if (user.role === "Guardian") {
      return <Navigate to="/guardian-profile" replace />;
    }

    if (user.role === "Sponsor") {
      return <Navigate to="/sponsorProfile" replace />;
    }

    return <Navigate to="/landing-page" replace />;
  }

  return children;
}