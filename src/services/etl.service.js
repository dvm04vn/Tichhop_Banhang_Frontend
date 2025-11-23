import * as Request from "~/utils/httpsRequest";

export const etlService = {
  importCsv(formData) {
    return Request.post("/etl/import", formData);
  },

  exportImported() {
    return Request.get("/etl/export/imported", { responseType: "blob" });
  },

  exportErrorLog() {
    return Request.get("/etl/export/errors", { responseType: "blob" });
  },

  downloadTemplate() {
    return Request.get("/etl/template", { responseType: "blob" });
  },
};
