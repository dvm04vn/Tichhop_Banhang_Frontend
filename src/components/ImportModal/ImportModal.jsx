import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "./ImportModal.module.scss";

const cx = classNames.bind(styles);

const fileKey = (f) => `${f.name}__${f.size}__${f.lastModified}`;
const isCsv = (f) =>
  !!f && (f.type === "text/csv" || f.name?.toLowerCase().endsWith(".csv"));
const formatBytes = (b) => {
  if (typeof b !== "number") return "";
  const u = ["B", "KB", "MB", "GB"];
  let i = 0,
    n = b;
  while (n >= 1024 && i < u.length - 1) ((n /= 1024), i++);
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${u[i]}`;
};

function ImportModal({
  open,
  onClose,
  onUpload,
  uploading = false,
  maxFiles = 10,
  accept = ".csv,text/csv",
  validateFile,
}) {
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const inputRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      setFiles([]);
      setErrors([]);
      setDragOver(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const totalSize = useMemo(
    () => files.reduce((sum, f) => sum + f.size, 0),
    [files]
  );
  const fileCount = files.length;

  const pushError = useCallback(
    (msg) => setErrors((prev) => (prev.includes(msg) ? prev : [...prev, msg])),
    []
  );
  const clearError = useCallback(
    (msg) => setErrors((prev) => prev.filter((x) => x !== msg)),
    []
  );

  const defaultValidate = useCallback((f) => {
    if (!isCsv(f)) return "Chỉ nhận tệp CSV (.csv)";
    return null;
  }, []);

  const mergeFiles = useCallback(
    (incoming) => {
      if (!incoming?.length) return;
      setErrors([]);
      setFiles((prev) => {
        const map = new Map(prev.map((f) => [fileKey(f), f]));
        for (const f of incoming) {
          if (map.size >= maxFiles) {
            pushError(`Tối đa ${maxFiles} tệp.`);
            break;
          }
          const msg =
            (validateFile && validateFile(f)) || defaultValidate(f) || null;
          if (msg) {
            pushError(`${f.name}: ${msg}`);
            continue;
          }
          const k = fileKey(f);
          if (!map.has(k)) map.set(k, f);
        }
        return Array.from(map.values());
      });
    },
    [maxFiles, validateFile, defaultValidate, pushError]
  );

  const openPicker = useCallback(() => inputRef.current?.click(), []);
  const onPickChange = useCallback(
    (e) => mergeFiles(Array.from(e.target.files || [])),
    [mergeFiles]
  );
  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
      mergeFiles(Array.from(e.dataTransfer.files || []));
    },
    [mergeFiles]
  );
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);
  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  const removeAt = useCallback(
    (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx)),
    []
  );
  const clearAll = useCallback(() => {
    setFiles([]);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const handleUpload = useCallback(() => {
    if (!fileCount || uploading) return;
    onUpload(files);
    onClose();
  }, [fileCount, uploading, onUpload, files, onClose]);

  if (!open) return null;

  return (
    <div
      className={cx("backdrop")}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
        <header className={cx("header")}>
          <h3 id={titleId} className={cx("title")}>
            Import CSV
          </h3>
          <button className={cx("close")} aria-label="Đóng" onClick={onClose}>
            ×
          </button>
        </header>

        <section className={cx("body")}>
          <div
            className={cx("dropzone", { dragOver })}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple
              className={cx("fileInput")}
              onChange={onPickChange}
            />
            <Button
              type="button"
              className={cx("secondaryBtn")}
              onClick={openPicker}
              disabled={uploading}
            >
              Chọn hoặc kéo-thả CSV
            </Button>
          </div>

          {errors.length > 0 && (
            <div className={cx("alert")}>
              <ul className={cx("alertList")}>
                {errors.map((m, i) => (
                  <li key={i} className={cx("alertItem")}>
                    {m}
                    <button
                      type="button"
                      className={cx("alertClose")}
                      aria-label="Ẩn"
                      onClick={() => clearError(m)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {fileCount > 0 && (
            <div className={cx("listWrap")}>
              <div className={cx("listHeader")}>
                <span>
                  Đã chọn <strong>{fileCount}</strong> tệp
                </span>
                <span className={cx("muted")}>{formatBytes(totalSize)}</span>
              </div>

              <ul className={cx("fileList")}>
                {files.map((f, i) => (
                  <li key={fileKey(f)} className={cx("fileItem")}>
                    <div className={cx("fileMeta")}>
                      <span className={cx("fileIcon")}>📄</span>
                      <div className={cx("fileText")}>
                        <span className={cx("fileName")}>{f.name}</span>
                        <span className={cx("fileSize")}>
                          {formatBytes(f.size)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={cx("remove")}
                      onClick={() => removeAt(i)}
                      title="Xoá"
                      aria-label={`Xoá ${f.name}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>

              <div className={cx("listActions")}>
                <Button
                  type="button"
                  className={cx("ghostBtn")}
                  onClick={clearAll}
                >
                  Xoá tất cả
                </Button>
              </div>
            </div>
          )}
        </section>

        <footer className={cx("footer")}>
          <Button
            type="button"
            className={cx("ghostBtn")}
            onClick={onClose}
            disabled={uploading}
          >
            Hủy
          </Button>
          <Button
            type="button"
            className={cx("primaryBtn")}
            onClick={handleUpload}
            disabled={fileCount === 0 || uploading}
          >
            {uploading
              ? "Đang import..."
              : `Import${fileCount ? ` (${fileCount})` : ""}`}
          </Button>
        </footer>
      </div>
    </div>
  );
}

export default ImportModal;
