import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { currentUserApi } from "../services/currentUserApi";
import { apiErrorMessage, unwrapResult } from "../utils/apiUi";
import { getStoredUser, getUserRoles } from "../utils/session";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const user = getStoredUser();
  const [serverUser, setServerUser] = useState(null);
  const [checking, setChecking] = useState(Boolean(token && user));
  const [checkError, setCheckError] = useState("");

  const verifySession = useCallback(async () => {
    if (!token) return;
    setChecking(true);
    setCheckError("");
    try {
      setServerUser(unwrapResult(await currentUserApi.getSession(), "تعذر التحقق من الجلسة."));
    } catch (requestError) {
      setCheckError(apiErrorMessage(requestError, "تعذر التحقق من الجلسة."));
    } finally {
      setChecking(false);
    }
  }, [token]);

  useEffect(() => {
    const timeoutId = window.setTimeout(verifySession, 0);
    return () => window.clearTimeout(timeoutId);
  }, [verifySession]);

  // غير مسجل
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (checking) {
    return <div dir="rtl" className="grid min-h-screen place-items-center bg-gray-50 font-[Cairo] font-bold text-[#003469]">جارٍ التحقق من الجلسة...</div>;
  }

  if (checkError) {
    return <div dir="rtl" className="grid min-h-screen place-items-center bg-gray-50 p-6 font-[Cairo]"><div className="max-w-md rounded-xl border border-red-200 bg-white p-6 text-center shadow-sm"><p className="text-sm text-red-700">{checkError}</p><button type="button" onClick={verifySession} className="mt-4 rounded-lg bg-[#003469] px-5 py-2.5 text-sm font-bold text-white">إعادة المحاولة</button></div></div>;
  }

  const userRoles = getUserRoles(serverUser || user);
  const requiredRoles = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles];

  if (
    serverUser?.isActive === false ||
    userRoles.length === 0 ||
    (requiredRoles.length > 0 &&
      !userRoles.some((role) => requiredRoles.includes(role)))
  ) {
    return <Navigate to="/auth-401" replace />;
  }

  return children;
}

export default ProtectedRoute;
