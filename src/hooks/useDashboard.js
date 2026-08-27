import { useCallback, useEffect, useState } from "react";
import { dashboardApi } from "../services/dashboardApi";

function getErrorMessage(error) {
  const result = error?.response?.data;
  const errors = Array.isArray(result?.errors) ? result.errors.filter(Boolean) : [];
  return [result?.message, ...errors, error?.message].find((value) => typeof value === "string" && /[\u0600-\u06ff]/.test(value)) || "تعذر تحميل لوحة التحكم.";
}

export default function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await dashboardApi.getMine();
      if (result?.success !== true || !result.data) {
        const errors = Array.isArray(result?.errors) ? result.errors.filter(Boolean) : [];
        const message = [result?.message, ...errors].find((value) => typeof value === "string" && /[\u0600-\u06ff]/.test(value));
        throw new Error(message || "تعذر تحميل لوحة التحكم.");
      }
      setData(result.data);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(load, 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  return { data, loading, error, retry: load };
}
