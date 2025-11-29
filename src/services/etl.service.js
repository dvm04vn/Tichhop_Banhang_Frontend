import { GET, POST } from "~/utils/HttpsRequest";

/**
 * Helper: tải blob về máy người dùng.
 * @param {Blob|ArrayBuffer|string} data
 * @param {string} fileName
 * @param {string} [mimeType]
 */
function downloadBlob(data, fileName, mimeType = "text/csv;charset=utf-8") {
  if (!data) return;

  const blob =
    data instanceof Blob ? data : new Blob([data], { type: mimeType });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

/**
 * Lấy thông tin job ETL theo jobId.
 * @param {string} jobId
 * @returns {Promise<any>}
 */
export async function getEtlJob(jobId) {
  if (!jobId) {
    throw new Error("[etl.service] getEtlJob: jobId is required");
  }

  const res = await GET({
    path: `/etl/jobs/${jobId}`,
    config: {},
  });

  return res.data;
}

/**
 * Upload nhiều file CSV lên hệ thống ETL.
 * @param {File[]} files
 * @returns {Promise<any>}
 */
export async function uploadImportFiles(files) {
  if (!files || !files.length) {
    throw new Error("[etl.service] uploadImportFiles: files is empty");
  }

  const formData = new FormData();
  files.forEach((file) => {
    // "files" là key backend quy ước, nếu backend dùng tên khác thì đổi ở đây
    formData.append("files", file);
  });

  const res = await POST({
    path: `/etl/import`, // TODO: chỉnh lại path nếu backend bạn khác
    config: formData,
  });

  return res.data;
}

/**
 * Export toàn bộ CSV (Imported + Error nếu backend hỗ trợ).
 * @param {string} jobId
 */
export async function exportAllCsv(jobId) {
  if (!jobId) return;

  const res = await GET({
    path: `/etl/jobs/${jobId}/export/all`,
    config: {
      responseType: "blob",
    },
  });

  downloadBlob(res.data, `etl-all-${jobId}.csv`);
}

/**
 * Export riêng dữ liệu Imported.
 * @param {string} jobId
 */
export async function exportImportedCsv(jobId) {
  if (!jobId) return;

  const res = await GET({
    path: `/etl/jobs/${jobId}/export/imported`,
    config: {
      responseType: "blob",
    },
  });

  downloadBlob(res.data, `etl-imported-${jobId}.csv`);
}

/**
 * Export log lỗi.
 * @param {string} jobId
 */
export async function exportErrorLog(jobId) {
  if (!jobId) return;

  const res = await GET({
    path: `/etl/jobs/${jobId}/export/errors`,
    config: {
      responseType: "blob",
    },
  });

  downloadBlob(res.data, `etl-errors-${jobId}.csv`);
}

/**
 * Tải file CSV template (mẫu import sản phẩm).
 */
export async function downloadTemplateCsv() {
  const res = await GET({
    path: `/etl/template/products`, // TODO: chỉnh theo route backend thực tế
    config: {
      responseType: "blob",
    },
  });

  downloadBlob(res.data, "products-template.csv");
}
