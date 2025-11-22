import * as Request from "~/utils/httpsRequest";

const getImported = async (params = {}) => {
  try {
    const response = await Request.GET({
      path: "/etl/imported",
      config: { params },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching imported data:", error);
    throw new Error("Lỗi khi lấy dữ liệu đã nhập");
  }
};

const getErrors = async (params = {}) => {
  try {
    const response = await Request.GET({
      path: "/etl/errors",
      config: { params },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching errors:", error);
    throw new Error("Lỗi khi lấy dữ liệu lỗi");
  }
};

const uploadCSV = async (formData) => {
  try {
    const response = await Request.POST({
      path: "/etl/import",
      body: formData,
      config: {
        headers: { "Content-Type": "multipart/form-data" },
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading CSV:", error);
    throw new Error("Lỗi khi tải lên file CSV");
  }
};

const exportCSV = async (type = "all") => {
  try {
    const response = await Request.http.get(`/etl/export?type=${type}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error exporting CSV:", error);
    throw new Error("Lỗi khi xuất dữ liệu CSV");
  }
};

const clearSession = async () => {
  try {
    const response = await Request.POST({ path: "/etl/clear" });
    return response.data;
  } catch (error) {
    console.error("Error clearing session:", error);
    throw new Error("Lỗi khi xóa session ETL");
  }
};

const ETLService = {
  getImported,
  getErrors,
  uploadCSV,
  exportCSV,
  clearSession,
};

export default ETLService;
