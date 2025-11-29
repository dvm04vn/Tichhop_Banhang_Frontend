export function mapEtlResponseToSessionUI(res) {
  const successFiles = Array.isArray(res.successFiles) ? res.successFiles : [];
  const errorFiles = Array.isArray(res.errorFiles) ? res.errorFiles : [];

  const importedRows = [];

  successFiles.forEach((file) => {
    const records = Array.isArray(file.data) ? file.data : [];
    records.forEach((record, index) => {
      importedRows.push({
        id: `${file._id || file.fileName}-${index}`,
        productName: record.nameProduct,
        sku: record.sku,
        categoryName: record.categoryName,
        price: record.price,
        stock: record.stock,
        sold: record.sold,
        color: record.color,
        size: record.size,
        status: record.stock > 0 ? "in_stock" : "out_of_stock",
      });
    });
  });

  const errorLogs = [];

  errorFiles.forEach((file) => {
    const fileErrors = Array.isArray(file.errors) ? file.errors : [];
    fileErrors.forEach((err) => {
      const original = err.originalData || {};
      const sku = original["mã hàng"] || original.sku;
      const productName = original["tên sản phẩm"] || original.nameProduct;

      errorLogs.push({
        id: err._id,
        row: err.row,
        sku: typeof sku === "string" ? sku : undefined,
        productName: typeof productName === "string" ? productName : undefined,
        message: err.message,
        createdAt: file.timestamp,
        fileName: file.fileName,
      });
    });
  });

  return {
    jobId: res.jobId,
    summary: res.summary,
    importedRows,
    errorLogs,
  };
}
