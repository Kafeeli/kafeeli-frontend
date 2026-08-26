import { useState, useEffect, useCallback } from "react";
import { familyApi } from "../services/familyApi";
import { mapFamilyStatus } from "../config/familyStatus";

async function loadFamily(familyId) {
  const res = await familyApi.getFamily(familyId);
  const data = res?.data;
  return data ? { ...data, statusKey: mapFamilyStatus(data.status) } : null;
}

export function useFamily(familyId) {
  const [family, setFamily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFamily = useCallback(async () => {
    if (!familyId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await loadFamily(familyId);
      setFamily(data);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [familyId]);

  useEffect(() => {
    if (!familyId) return;

    let cancelled = false;

    async function loadInitialFamily() {
      try {
        const data = await loadFamily(familyId);
        if (!cancelled) setFamily(data);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadInitialFamily();
    return () => {
      cancelled = true;
    };
  }, [familyId]);

  return { family, loading, error, refetch: fetchFamily };
}
