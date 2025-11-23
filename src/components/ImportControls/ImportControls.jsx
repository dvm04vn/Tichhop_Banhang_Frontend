import { useState, useRef } from "react";
import styles from "./ImportControls.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ImportControls = ({
  uploadFile,        // (file) => void | Promise
  exportCSV,         // () => void | Promise - xuất dữ liệu imported
  clearAll,          // () => void - clear imported + errors
  downloadTemplate,  // () => void | Promise - tải file CSV mẫu
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleImport = async () => {
    try {
      // hiện tại đang mock, nên cho phép gọi kể cả khi chưa chọn file
      await uploadFile(selectedFile || null);
    } catch (error) {
      console.error("Import lỗi:", error);
      alert("Import thất bại, vui lòng thử lại.");
    } finally {
      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDownloadTemplate = async () => {
    if (!downloadTemplate) {
      alert("Chưa cấu hình tải mẫu CSV.");
      return;
    }
    try {
      await downloadTemplate();
    } catch (error) {
      console.error("Tải template lỗi:", error);
      alert("Tải template thất bại.");
    }
  };

  const handleExport = async () => {
    if (!exportCSV) {
      alert("Chưa cấu hình export CSV.");
      return;
    }
    try {
      await exportCSV();
    } catch (error) {
      console.error("Export CSV lỗi:", error);
      alert("Export CSV thất bại.");
    }
  };

  const handleClearAll = () => {
    if (clearAll) clearAll();
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("controls")}>
        <button
          className={cx("btn", "templateBtn")}
          onClick={handleDownloadTemplate}
          type="button"
        >
          Tải mẫu CSV
        </button>

        <button
          className={cx("btn", "exportBtn")}
          onClick={handleExport}
          type="button"
        >
          Xuất CSV (All)
        </button>

        <div className={cx("fileWrapper")}>
          <input
            type="file"
            accept=".csv"
            ref={inputRef}
            className={cx("fileInput")}
            onChange={handleSelectFile}
          />
        </div>

        <button
          className={cx("btn", "importBtn")}
          onClick={handleImport}
          type="button"
        >
          Import
        </button>

        {clearAll && (
          <button
            className={cx("btn", "clearBtn")}
            onClick={handleClearAll}
            type="button"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default ImportControls;
