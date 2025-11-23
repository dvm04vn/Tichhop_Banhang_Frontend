import styles from "./ErrorLogSection.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ErrorLogSection = ({ errors = [], total, onExportLog, onClear }) => {
  const count = typeof total === "number" ? total : errors.length;

  const handleExportLog = () => {
    if (onExportLog) onExportLog();
  };

  const handleClear = () => {
    if (onClear) onClear();
  };

  const formatTime = (value) => {
    if (!value) return "";
    try {
      const d = typeof value === "string" ? new Date(value) : value;
      return d.toLocaleString("vi-VN");
    } catch {
      return "";
    }
  };

  return (
    <section className={cx("wrapper")}>
      <header className={cx("header")}>
        <div className={cx("headerLeft")}>
          <h2 className={cx("title")}>Dữ liệu lỗi / Log</h2>
          <p className={cx("subtitle")}>
            Errors: <span className={cx("badge")}>{count}</span>
          </p>
        </div>

        <div className={cx("headerRight")}>
          {onExportLog && (
            <button
              type="button"
              className={cx("btn", "btnExport")}
              onClick={handleExportLog}
            >
              Xuất Log
            </button>
          )}
          {onClear && (
            <button
              type="button"
              className={cx("btn", "btnClear")}
              onClick={handleClear}
            >
              Clear
            </button>
          )}
        </div>
      </header>

      {errors.length === 0 ? (
        <div className={cx("emptyState")}>
          Không có lỗi nào. File CSV hiện tại đã được xử lý hợp lệ.
        </div>
      ) : (
        <div className={cx("list")}>
          {errors.map((log, idx) => {
            const lineNumber =
              log.lineNumber ??
              (typeof log.index === "number" ? log.index + 1 : undefined);

            const productName = log.productName || "Không rõ sản phẩm";

            const key = log.id ?? `${log.index ?? idx}-${log.field ?? "err"}`;

            return (
              <div key={key} className={cx("item")}>
                <div className={cx("itemHeader")}>
                  <div className={cx("lineInfo")}>
                    {typeof lineNumber === "number" && (
                      <span className={cx("lineTag")}>Dòng {lineNumber}</span>
                    )}
                    <span className={cx("productName")}>{productName}</span>
                  </div>

                  {log.createdAt && (
                    <span className={cx("time")}>
                      {formatTime(log.createdAt)}
                    </span>
                  )}
                </div>

                <div className={cx("itemBody")}>
                  {log.fileName && (
                    <div className={cx("meta")}>
                      <span className={cx("label")}>Cột:</span>
                      <span className={cx("value")}>{log.fileName}</span>
                    </div>
                  )}

                  {log.field && (
                    <div className={cx("meta")}>
                      <span className={cx("label")}>Field:</span>
                      <span className={cx("value")}>{log.field}</span>
                    </div>
                  )}

                  {log.message && (
                    <div className={cx("message")}>{log.message}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ErrorLogSection;
