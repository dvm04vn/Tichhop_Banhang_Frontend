import { GET } from "~/utils/HttpsRequest";

export async function getEtlJob(jobId) {
  const res = await GET({
    path: `/etl/jobs/${jobId}`,
    config: {},
  });

  return res.data;
}

export async function exportAllCsv(jobId) {
  const res = await GET({
    path: `/etl/jobs/${jobId}/export/all`,
    config: {
      responseType: "blob",
    },
  });

  // TODO: xử lý download file từ res.data (blob)
  console.log("[etl.service] exportAllCsv - blob received", res);
}

export async function exportImportedCsv(jobId) {
  const res = await GET({
    path: `/etl/jobs/${jobId}/export/imported`,
    config: {
      responseType: "blob",
    },
  });

  // TODO: xử lý download file từ res.data (blob)
  console.log("[etl.service] exportImportedCsv - blob received", res);
}

export async function exportErrorLog(jobId) {
  const res = await GET({
    path: `/etl/jobs/${jobId}/export/errors`,
    config: {
      responseType: "blob",
    },
  });

  // TODO: xử lý download file từ res.data (blob)
  console.log("[etl.service] exportErrorLog - blob received", res);
}

export async function downloadTemplateCsv() {
  const res = await GET({
    path: `/etl/template/products`, // đổi path nếu backend dùng route khác
    config: {
      responseType: "blob",
    },
  });

  // TODO: xử lý download file từ res.data (blob)
  console.log("[etl.service] downloadTemplateCsv - blob received", res);
}
