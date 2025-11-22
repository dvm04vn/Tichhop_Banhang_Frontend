import { useState, useCallback } from "react";
import ETLService from "~/services/etl.service";

const useImportData = () => {
  const [imported, setImported] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadFile = useCallback(async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await ETLService.uploadCSV(formData);
      setImported(res.data);
      setErrors(res.errors || []);
    } catch (error) {
      setErrors([error.message]);
    } finally {
      setLoading(false);
    }
  }, []);

  const exportCSV = useCallback(async (type = "all") => {
    try {
      setLoading(true);
      const data = await ETLService.exportCSV(type);
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "export.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAll = useCallback(async () => {
    try {
      setLoading(true);
      await ETLService.clearSession();
      setImported([]);
      setErrors([]);
    } catch (error) {
      setErrors([error.message]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    imported,
    errors,
    loading,
    uploadFile,
    exportCSV,
    clearAll,
  };
};

export default useImportData;
