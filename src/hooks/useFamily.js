import { useState, useEffect, useCallback } from "react";
import { familyApi } from "../services/familyApi";
import { mapFamilyStatus } from "../config/familyStatus";

export function useFamily(familyId) {
  const [family, setFamily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFamily = useCallback(async () => {
    if (!familyId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await familyApi.getFamily(familyId);
      const data = res?.data;
      setFamily(data ? { ...data, statusKey: mapFamilyStatus(data.status) } : null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [familyId]);

  useEffect(() => {
    fetchFamily();
  }, [fetchFamily]);

  return { family, loading, error, refetch: fetchFamily };
}
