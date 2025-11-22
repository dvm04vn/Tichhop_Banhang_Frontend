import { useState, useRef } from "react";
import styles from "./ImportControls.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ImportControls = ({ uploadFile, exportCSV, clearAll }) => {
  const [selectedFile, setSelectedFile] = useState(null); // Lưu file đã chọn
  const inputRef = useRef(null); // Reference cho input file

  // Xử lý khi chọn file
  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Cập nhật file đã chọn
    }
  };

  // Xử lý import khi nhấn nút Import
  const handleImport = () => {
    if (!selectedFile) {
      alert("Chưa chọn file để import");
      return;
    }
    uploadFile(selectedFile); // Gọi hàm uploadFile từ props
  };

  // Giả lập tải mẫu CSV (API integration sẽ thực hiện sau)
  const handleDownloadTemplate = () => {
    alert("Tải mẫu CSV... (API integration later)");
  };

  // Xuất CSV (All)
  const handleExport = () => {
    alert("Xuất CSV... (API integration later)");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("controls")}>
        {/* Nút Tải mẫu CSV */}
        <button
          className={cx("btn", "downloadTemplateBtn")}
          onClick={handleDownloadTemplate}
        >
          Tải mẫu CSV
        </button>

        {/* Nút Xuất CSV (All) */}
        <button
          className={cx("btn", "exportCSVBtn")}
          onClick={handleExport}  // Thêm xử lý xuất CSV
        >
          Xuất CSV (All)
        </button>

        {/* Nút Chọn file và Import */}
        <input
          type="file"
          ref={inputRef}
          className={cx("fileInput")}
          onChange={handleSelectFile}
        />
        <button className={cx("btn", "importBtn")} onClick={handleImport}>
          Import
        </button>
      </div>

      {/* Hiển thị tên file đã chọn */}
      {selectedFile && (
        <p className={cx("selectedFile")}>{selectedFile.name}</p>
      )}
    </div>
  );
};

export default ImportControls;
