export function mapEtlResponseToSessionUI(res) {
  const successFiles = Array.isArray(res.successFiles) ? res.successFiles : [];
  const errorFiles = Array.isArray(res.errorFiles) ? res.errorFiles : [];

  /** @type {ImportedRowUI[]} */
  const importedRows = [];

  successFiles.forEach((file) => {
    const records = Array.isArray(file.data) ? file.data : [];

    records.forEach((record, index) => {
      const stock = Number(record.stock ?? 0);
      const sold = Number(record.sold ?? 0);
      const price = Number(record.price ?? 0);

      importedRows.push({
        id: `${file._id || file.fileName || "file"}-${index}`,
        productName: record.nameProduct || "",
        sku: record.sku || "",
        categoryName: record.categoryName || "Uncategorized",
        price,
        stock,
        sold,
        color: record.color || "",
        size: record.size || "",
        status: stock > 0 ? "in_stock" : "out_of_stock",
      });
    });
  });

  /** @type {ImportErrorLogUI[]} */
  const errorLogs = [];

  errorFiles.forEach((file) => {
    const fileErrors = Array.isArray(file.errors) ? file.errors : [];

    fileErrors.forEach((err) => {
      const original = err.originalData || {};
      const skuRaw = original["mã hàng"] ?? original.sku;
      const productNameRaw = original["tên sản phẩm"] ?? original.nameProduct;

      const sku =
        typeof skuRaw === "string" && skuRaw.trim() ? skuRaw.trim() : undefined;
      const productName =
        typeof productNameRaw === "string" && productNameRaw.trim()
          ? productNameRaw.trim()
          : undefined;

      errorLogs.push({
        id:
          err._id ||
          `${file.fileName || "file"}-${err.row || "row"}-${err.field || "all"}`,
        row: Number(err.row ?? 0),
        sku,
        productName,
        message: err.message || "Lỗi không xác định",
        createdAt: file.timestamp || res.updatedAt || res.createdAt,
        fileName: file.fileName || "",
      });
    });
  });

  const summaryRaw = res.summary || {};
  const summary = {
    totalFiles: Number(summaryRaw.totalFiles ?? 0),
    successfulFiles: Number(summaryRaw.successfulFiles ?? 0),
    failedFiles: Number(summaryRaw.failedFiles ?? 0),
    totalRecords: Number(summaryRaw.totalRecords ?? 0),
    totalErrors: Number(summaryRaw.totalErrors ?? 0),
  };

  return {
    jobId: res.jobId || "",
    summary,
    importedRows,
    errorLogs,
  };
}
