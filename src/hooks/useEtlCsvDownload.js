import { useCallback } from "react";
import { mapEtlResponseToSessionUI } from "~/hooks/mapEtlToImportSession";
import { mockEtlResponse } from "~/data/mockImportResponse";

function toCsvRow(fields) {
  return fields
    .map((value) => {
      const raw = value == null ? "" : String(value);
      const escaped = raw.replace(/"/g, '""');
      return `"${escaped}"`;
    })
    .join(",");
}

function downloadTextFile(
  content,
  fileName,
  mimeType = "text/csv;charset=utf-8"
) {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

const toNum = (v) => (v == null || v === "" ? 0 : Number(v) || 0);

function buildTemplateCsvFromMock() {
  const errorFiles = Array.isArray(mockEtlResponse.errorFiles)
    ? mockEtlResponse.errorFiles
    : [];

  let headerKeys = [];
  const rows = [];

  for (const file of errorFiles) {
    const errs = Array.isArray(file.errors) ? file.errors : [];
    for (const err of errs) {
      const original = err.originalData || {};
      const keys = Object.keys(original);
      if (!keys.length) continue;

      if (!headerKeys.length) {
        headerKeys = keys;
      }

      const rowValues = headerKeys.map((k) => original[k]);
      rows.push(rowValues);
    }
  }

  // fallback nếu không có errorFiles/originalData
  if (!headerKeys.length) {
    headerKeys = [
      "tên sản phẩm",
      "tên danh mục",
      "giá tiền",
      "tổng số lượng",
      "tống số lượng đã bán",
      "màu sắc",
      "kích thước",
      "trọng lượng",
      "đơn vị tính trọng lượng",
      "mã hàng",
      "tên thương hiệu",
      "mô tả",
    ];

    rows.push([
      "Áo thun nam cổ tròn",
      "Thời trang nam",
      250000,
      100,
      15,
      "Đen",
      "L",
      0.3,
      "kg",
      "TSHIRT-BLK-L",
      "Brand A",
      "Áo thun nam chất liệu cotton thoáng mát",
    ]);
  }

  const headerLine = toCsvRow(headerKeys);
  const dataLines = rows.slice(0, 5).map((r) => toCsvRow(r)); // vài dòng ví dụ

  return [headerLine, ...dataLines].join("\r\n");
}

function buildAllCsvFromSession(session) {
  const effectiveSession =
    session || mapEtlResponseToSessionUI(mockEtlResponse);

  const rows = effectiveSession.importedRows || [];

  const header = toCsvRow([
    "Mã hàng (SKU)",
    "Tên sản phẩm",
    "Danh mục",
    "Tồn kho",
    "Đã bán",
    "Giá",
    "Trạng thái",
  ]);

  const dataRows = rows.map((row) =>
    toCsvRow([
      row.sku,
      row.productName,
      row.categoryName,
      toNum(row.stock),
      toNum(row.sold),
      toNum(row.price),
      row.status === "in_stock" ? "Còn hàng" : "Hết hàng",
    ])
  );

  return [header, ...dataRows].join("\r\n");
}

function buildImportedCsvFromSession(session) {
  // Ở demo dữ liệu imported chính là importedRows
  return buildAllCsvFromSession(session);
}

function buildErrorLogCsvFromSession(session) {
  const effectiveSession =
    session || mapEtlResponseToSessionUI(mockEtlResponse);

  const logs = Array.isArray(effectiveSession.errorLogs)
    ? effectiveSession.errorLogs
    : [];

  const header = toCsvRow([
    "SKU",
    "Sản phẩm",
    "Dòng",
    "Thông điệp",
    "File",
    "Thời gian",
  ]);

  const dataRows = logs.map((log) =>
    toCsvRow([
      log.sku || "",
      log.productName || "",
      toNum(log.row),
      log.message || "",
      log.fileName || "",
      log.createdAt ? new Date(log.createdAt).toLocaleString("vi-VN") : "",
    ])
  );

  return [header, ...dataRows].join("\r\n");
}

export function useEtlCsvDownload(session) {
  const downloadTemplate = useCallback(() => {
    const csv = buildTemplateCsvFromMock();
    downloadTextFile(csv, "products-template-mock.csv");
  }, []);

  const exportAll = useCallback(() => {
    const csv = buildAllCsvFromSession(session || null);
    downloadTextFile(csv, "etl-all-mock.csv");
  }, [session]);

  const exportImported = useCallback(() => {
    const csv = buildImportedCsvFromSession(session || null);
    downloadTextFile(csv, "etl-imported-mock.csv");
  }, [session]);

  const exportLog = useCallback(() => {
    const csv = buildErrorLogCsvFromSession(session || null);
    downloadTextFile(csv, "etl-errors-mock.csv");
  }, [session]);

  return {
    downloadTemplate,
    exportAll,
    exportImported,
    exportLog,
  };
}
