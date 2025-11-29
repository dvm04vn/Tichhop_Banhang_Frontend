import React, { memo } from "react";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "./ErrorLogSection.module.scss";

const cx = classNames.bind(styles);

function ErrorLogSection({ logs, onExportLog }) {
  return (
    <section className={cx("wapper")}>
      <header className={cx("header")}>
        <div className={cx("left")}>
          <span className={cx("icon")}>!</span>
          <h2 className={cx("title")}>Dữ liệu lỗi / Log</h2>
        </div>
        <Button
          type="button"
          className={cx("secondaryBtn")}
          onClick={onExportLog}
        >
          Xuất Log
        </Button>
      </header>

      <div className={cx("list")}>
        {logs.map((log) => (
          <ErrorLogItem key={log.id} log={log} />
        ))}
        {logs.length === 0 && (
          <p className={cx("empty")}>Không có lỗi nào được ghi nhận.</p>
        )}
      </div>

      <p className={cx("note")}>
        Các bản ghi lỗi sẽ hiển thị chi tiết nguyên nhân để người dùng chỉnh sửa
        file CSV.
      </p>
    </section>
  );
}

function ErrorLogItem({ log }) {
  const date = new Date(log.createdAt);

  return (
    <article className={cx("item")}>
      <span className={cx("errBadge")}>ERR</span>
      <div className={cx("itemBody")}>
        <div className={cx("itemHeader")}>
          <div className={cx("itemTitle")}>
            {log.sku && <span>{log.sku}</span>}
            <span className={cx("itemLine")}>— Dòng {log.row}</span>
          </div>
          <div className={cx("itemTime")}>
            {date.toLocaleDateString("vi-VN")}{" "}
            {date.toLocaleTimeString("vi-VN")}
          </div>
        </div>
        {log.productName && (
          <p className={cx("itemProduct")}>{log.productName}</p>
        )}
        <p className={cx("itemMessage")}>{log.message}</p>
        <p className={cx("itemFile")}>File: {log.fileName}</p>
      </div>
    </article>
  );
}

export default memo(ErrorLogSection);
