import { Navigate } from "react-router-dom";
import { getDashboardPath, getStoredUser } from "../utils/session";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = getStoredUser();

  if (token && user) {
    return <Navigate to={getDashboardPath(user) || "/auth-401"} replace />;
  }

  return children;
}
