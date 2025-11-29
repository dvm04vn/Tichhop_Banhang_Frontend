import React, { memo } from "react";
import classNames from "classnames/bind";

import Button from "~/components/Button";

import styles from "./ImportedSection.module.scss";

const cx = classNames.bind(styles);

function ImportedSection({ summary, rows, onExportImported, onClear }) {
  return (
    <section className={cx("wapper")}>
      <header className={cx("header")}>
        <div className={cx("left")}>
          <span className={cx("icon")}>✓</span>
          <div>
            <h2 className={cx("title")}>Dữ liệu đã nhập (Imported)</h2>
            <p className={cx("summary")}>
              Records: {summary.totalRecords} • Errors: {summary.totalErrors}
            </p>
          </div>
        </div>

        <div className={cx("actions")}>
          <Button
            type="button"
            className={cx("secondaryBtn")}
            onClick={onExportImported}
          >
            Xuất Imported
          </Button>
          <Button type="button" className={cx("dangerBtn")} onClick={onClear}>
            Clear
          </Button>
        </div>
      </header>

      {/* Table */}
      <div className={cx("tableWrapper")}>
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Mã hàng (SKU)</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th className={cx("textRight")}>Tồn kho</th>
              <th className={cx("textRight")}>Đã bán</th>
              <th className={cx("textRight")}>Giá</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <ImportedRowItem key={row.id} row={row} />
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className={cx("empty")}>
                  Chưa có dữ liệu imported
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ImportedRowItem({ row }) {
  const statusLabel = row.status === "in_stock" ? "Còn hàng" : "Hết hàng";

  return (
    <tr>
      <td>{row.sku}</td>
      <td>{row.productName}</td>
      <td>{row.categoryName}</td>
      <td className={cx("textRight")}>{row.stock}</td>
      <td className={cx("textRight")}>{row.sold}</td>
      <td className={cx("textRight")}>{row.price.toLocaleString("vi-VN")}</td>
      <td>
        <span
          className={
            row.status === "in_stock"
              ? cx("statusInStock")
              : cx("statusOutStock")
          }
        >
          {statusLabel}
        </span>
      </td>
    </tr>
  );
}

export default memo(ImportedSection);
