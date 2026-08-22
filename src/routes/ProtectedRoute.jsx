// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, roles }) {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roles && !roles.includes(user.role)) {
//     return <Navigate to="/auth-401" replace />;
//   }

//   return children;
// }
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // غير مسجل
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // لو الصفحة لها صلاحيات محددة
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/auth-401" replace />;
  }

  return children;
}

export default ProtectedRoute;