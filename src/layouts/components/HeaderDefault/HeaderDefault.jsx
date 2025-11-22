import styles from "./HeaderDefault.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import reactLogo from "~/assets/react.svg";

const cx = classNames.bind(styles);

function HeaderDefault() {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("logo-left")}>
          <Link to="/" className={cx("logo")}>
            <img
              src={reactLogo}
              alt="Logo ETL Tích hợp: Bán hàng - Quản lý kho"
              className={cx("logo-img")}
            />
          </Link>
          <h3 className={cx("title")}>Tích hợp: Bán hàng - Quản lý kho</h3>
        </div>
      </div>
    </header>
  );
}

export default HeaderDefault;
