import { useState, useEffect, useCallback } from "react";
import { familyApi } from "../services/familyApi";
import { mapFamilyStatus } from "../config/familyStatus";

async function loadFamilies() {
  const res = await familyApi.getFamilies();
  return (res?.data?.families || []).map((family) => ({
    ...family,
    statusKey: mapFamilyStatus(family.status),
  }));
}

export function useFamilies() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFamilies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setFamilies(await loadFamilies());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialFamilies() {
      try {
        const list = await loadFamilies();
        if (!cancelled) setFamilies(list);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadInitialFamilies();
    return () => {
      cancelled = true;
    };
  }, []);

  return { families, loading, error, refetch: fetchFamilies };
}
