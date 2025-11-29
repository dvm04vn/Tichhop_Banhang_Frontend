import { useCallback, useEffect, useState } from "react";
import { mapEtlResponseToSessionUI } from "~/hooks/mapEtlToImportSession";
import {
  // getEtlJob,
  exportAllCsv,
  exportImportedCsv,
  exportErrorLog,
  downloadTemplateCsv,
} from "~/services/etl.service";
import { mockEtlResponse } from "~/data/mockImportResponse";

export function useImportData(initialJobId) {
  const [session, setSession] = useState(null);
  const [jobId, setJobId] = useState(initialJobId || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(/** @type {Error|null} */ (null));

  const fetchData = useCallback(async (id) => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);

      // TODO: dùng backend thật => bỏ comment dòng dưới và comment dòng mock.
      // const res = await getEtlJob(id);
      const res = mockEtlResponse;

      const mapped = mapEtlResponseToSessionUI(res);
      setSession(mapped);
    } catch (err) {
      console.error("[useImportData] fetchData error:", err);
      setError(/** @type {Error} */ (err));
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
    if (jobId) {
      fetchData(jobId);
    }
  }, [jobId, fetchData]);

  const clearSession = useCallback(() => {
    setSession(null);
  }, []);

  const handleExportAll = useCallback(() => {
    if (!jobId) return;
    exportAllCsv(jobId);
  }, [jobId]);

  const handleExportImported = useCallback(() => {
    if (!jobId) return;
    exportImportedCsv(jobId);
  }, [jobId]);

  const handleExportLog = useCallback(() => {
    if (!jobId) return;
    exportErrorLog(jobId);
  }, [jobId]);

  const handleDownloadTemplate = useCallback(() => {
    downloadTemplateCsv();
  }, []);

  return {
    jobId,
    setJobId,
    session,
    loading,
    error,
    refresh,
    clearSession,
    exportAll: handleExportAll,
    exportImported: handleExportImported,
    exportLog: handleExportLog,
    downloadTemplate: handleDownloadTemplate,
  };
}
