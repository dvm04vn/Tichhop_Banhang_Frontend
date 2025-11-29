import { useMockImportSession } from "~/hooks/useMockImportSession";
import { useApiImportSession } from "~/hooks/useApiImportSession";
import { useEtlCsvDownload } from "~/hooks/useEtlCsvDownload";

const USE_MOCK = true; // đổi false khi nối backend

export function useImportData(initialJobId) {
  const mock = useMockImportSession(initialJobId);
  const api = useApiImportSession(USE_MOCK ? null : initialJobId);

  const { jobId, setJobId, session, loading, error, refresh, clearSession } =
    USE_MOCK ? mock : api;

  const { downloadTemplate, exportAll, exportImported, exportLog } =
    useEtlCsvDownload(session);

  return {
    jobId,
    setJobId,
    session,
    loading,
    error,
    refresh,
    clearSession,
    exportAll,
    exportImported,
    exportLog,
    downloadTemplate,
  };
}
