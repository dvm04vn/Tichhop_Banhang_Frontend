import { useCallback, useEffect, useState } from "react";
import { mapEtlResponseToSessionUI } from "~/hooks/mapEtlToImportSession";
import { mockEtlResponse } from "~/data/mockImportResponse";

export function useMockImportSession(initialJobId) {
  const [session, setSession] = useState();
  const [jobId, setJobId] = useState(initialJobId || "MOCK_JOB_ID");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const mapped = mapEtlResponseToSessionUI(mockEtlResponse);
      setSession(mapped);
    } catch (err) {
      console.error("[useMockImportSession] fetchData error:", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const clearSession = useCallback(() => {
    setSession(null);
  }, []);

  return {
    jobId,
    setJobId,
    session,
    loading,
    error,
    refresh,
    clearSession,
  };
}
