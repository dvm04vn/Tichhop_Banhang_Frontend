import { useCallback, useEffect, useState } from "react";
import { mapEtlResponseToSessionUI } from "~/hooks/mapEtlToImportSession";
import { getEtlJob } from "~/services/etl.service";

export function useApiImportSession(initialJobId) {
  const [session, setSession] = useState();
  const [jobId, setJobId] = useState(initialJobId || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (id) => {
    if (!id) return; // không có jobId thì không gọi API
    try {
      setLoading(true);
      setError(null);

      const res = await getEtlJob(id); // gọi backend
      const mapped = mapEtlResponseToSessionUI(res);
      setSession(mapped);
    } catch (err) {
      console.error("[useApiImportSession] fetchData error:", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (jobId) {
      fetchData(jobId);
    }
  }, [jobId, fetchData]);

  const refresh = useCallback(() => {
    if (jobId) fetchData(jobId);
  }, [jobId, fetchData]);

  const clearSession = useCallback(() => setSession(null), []);

  return { jobId, setJobId, session, loading, error, refresh, clearSession };
}
