import styles from "./ErrorLogSection.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ErrorLogSection = ({ errors }) => {
  const isEmpty = !Array.isArray(errors) || errors.length === 0;

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("title")}>Dữ liệu lỗi/Log</h3>

      {isEmpty ? (
        <p className={cx("empty")}>Không có lỗi nào</p>
      ) : (
        <ul className={cx("list")}>
          {errors.map((err, idx) => (
            <li key={idx} className={cx("item")}>
              {err}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ErrorLogSection;
