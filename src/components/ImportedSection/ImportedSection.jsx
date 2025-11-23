import styles from "./ImportedSection.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ImportedSection = ({ data = [], total, onExport, onClear }) => {
  const rowCount = typeof total === "number" ? total : data.length;

  const handleExport = () => {
    if (onExport) onExport();
  };

  const handleClear = () => {
    if (onClear) onClear();
  };

  return (
    <section className={cx("wrapper")}>
      <header className={cx("header")}>
        <div className={cx("headerLeft")}>
          <h2 className={cx("title")}>Dữ liệu đã nhập (Imported)</h2>
          <p className={cx("subtitle")}>
            Imported: <span className={cx("badge")}>{rowCount}</span>
          </p>
        </div>

        <div className={cx("headerRight")}>
          {onExport && (
            <button
              type="button"
              className={cx("btn", "btnExport")}
              onClick={handleExport}
            >
              Xuất Imported
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

      {data.length === 0 ? (
        <div className={cx("emptyState")}>
          Chưa có dữ liệu imported. Hãy chọn file CSV và nhấn <b>Import</b>.
        </div>
      ) : (
        <div className={cx("tableWrapper")}>
          <table className={cx("table")}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã hàng</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Tồn kho</th>
                <th>Đã bán</th>
                <th>Giá</th>
                <th>Màu sắc</th>
                <th>Kích thước</th>
                <th>Thương hiệu</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => {
                const status =
                  row.status ??
                  (typeof row.stock === "number" && row.stock > 0
                    ? "Còn hàng"
                    : "Hết hàng");

                const statusClass =
                  status === "Còn hàng" ? "statusInStock" : "statusOutOfStock";

                return (
                  <tr key={row.index ?? row.sku ?? idx}>
                    <td>{idx + 1}</td>
                    <td>{row.sku}</td>
                    <td>{row.nameProduct}</td>
                    <td>{row.nameCategories}</td>
                    <td>{row.stock}</td>
                    <td>{row.sold}</td>
                    <td>
                      {typeof row.price === "number"
                        ? row.price.toLocaleString("vi-VN")
                        : row.price}
                    </td>
                    <td>{row.color}</td>
                    <td>{row.size}</td>
                    <td>{row.brand}</td>
                    <td>
                      <span className={cx("status", statusClass)}>
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ImportedSection;
