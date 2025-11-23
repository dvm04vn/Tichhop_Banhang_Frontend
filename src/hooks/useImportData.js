import { useState } from "react";
import { MOCK_IMPORT_RESPONSE } from "~/data/mockImportResponse";

export default function useImportData() {
  const [importedRows, setImportedRows] = useState([]);
  const [errorLogs, setErrorLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Khi bấm Import, tạm thời mình bỏ qua "file" và dùng mock luôn
  const handleImport = async () => {
    try {
      setLoading(true);

      const payload = MOCK_IMPORT_RESPONSE;

      const successRows = payload.filter((r) => r.isValid);
      const errorRows = payload.filter((r) => !r.isValid);

      // Map imported
      const mappedImported = successRows.map((row, idx) => {
        const v = row.validatedData || {};
        const index = typeof row.current === "number" ? row.current : idx;

        return {
          index,
          nameProduct: v.nameProduct,
          nameCategories: v.nameCategories,
          price: v.price,
          stock: v.stock,
          sold: v.sold,
          color: v.color,
          size: v.size,
          weight: v.weight,
          unit: v.unit,
          sku: v.sku,
          brand: v.brand,
          description: v.description,
          status:
            typeof v.stock === "number" && v.stock > 0
              ? "Còn hàng"
              : "Hết hàng",
        };
      });

      // Map errors
      const mappedErrors = errorRows.flatMap((row, idx) => {
        const rowErrors = Array.isArray(row.errors) ? row.errors : [];
        const baseIndex =
          typeof row.current === "number" ? row.current : idx;

        const productName =
          row.validatedData?.nameProduct ||
          row.rowData?.["tên sản phẩm"] ||
          "Không rõ sản phẩm";

        if (rowErrors.length === 0) {
          return [
            {
              id: `${baseIndex}-unknown`,
              index: baseIndex,
              lineNumber: baseIndex + 2,
              productName,
              message: "Lỗi không xác định",
              field: "",
              fileName: "",
              createdAt: new Date().toISOString(),
            },
          ];
        }

        return rowErrors.map((err, errorIdx) => ({
          id: `${baseIndex}-${errorIdx}-${err.field || "field"}`,
          index: baseIndex,
          lineNumber: baseIndex + 2,
          productName,
          field: err.field,
          fileName: err.fileName,
          message: err.errorMessage,
          createdAt: new Date().toISOString(),
        }));
      });

      setImportedRows(mappedImported);
      setErrorLogs(mappedErrors);
    } finally {
      setLoading(false);
    }
  };

  const clearImported = () => setImportedRows([]);
  const clearErrors = () => setErrorLogs([]);
  const clearAll = () => {
    clearImported();
    clearErrors();
  };

  const exportImported = () => {
    console.log("Fake export imported:", importedRows);
    alert("Fake export imported (log ra console) 😆");
  };

  const exportErrorLog = () => {
    console.log("Fake export error logs:", errorLogs);
    alert("Fake export error log (log ra console) 😆");
  };

  const downloadTemplate = () => {
    alert("Fake download template – chưa nối backend.");
  };

  const totalImported = importedRows.length;
  const totalErrors = errorLogs.length;

  return {
    importedRows,
    errorLogs,
    totalImported,
    totalErrors,
    loading,
    handleImport,
    exportImported,
    exportErrorLog,
    clearImported,
    clearErrors,
    downloadTemplate,

    // giữ interface cũ cho Home/ImportControls
    imported: importedRows,
    errors: errorLogs,
    uploadFile: handleImport,
    exportCSV: exportImported,
    clearAll,
  };
}
