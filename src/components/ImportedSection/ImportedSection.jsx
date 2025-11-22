import styles from "./ImportedSection.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ImportedSection = ({ data }) => {
  const isEmpty = !Array.isArray(data) || data.length === 0;

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("title")}>Dữ liệu đã nhập (Imported)</h3>

      {isEmpty ? (
        <p className={cx("empty")}>Chưa có dữ liệu nào</p>
      ) : (
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td className={cx({ ok: row.status === "OK", error: row.status !== "OK" })}>
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ImportedSection;
