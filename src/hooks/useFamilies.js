import { useState, useEffect, useCallback } from "react";
import { familyApi } from "../services/familyApi";
import { mapFamilyStatus } from "../config/familyStatus";

export function useFamilies() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFamilies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await familyApi.getFamilies();
      const list = (res?.data?.families || []).map((f) => ({
        ...f,
        statusKey: mapFamilyStatus(f.status),
      }));
      setFamilies(list);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFamilies();
  }, [fetchFamilies]);

  return { families, loading, error, refetch: fetchFamilies };
}
