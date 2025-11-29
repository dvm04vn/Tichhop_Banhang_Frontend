import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "./ImportControls.module.scss";

const cx = classNames.bind(styles);

function ImportControls({ onDownloadTemplate, onExportAll, onRefresh }) {
  return (
    <div className={cx("wrapper")}>
      {onRefresh && (
        <Button
          type="button"
          className={cx("secondaryBtn")}
          onClick={onRefresh}
        >
          Refresh
        </Button>
      )}
      <Button
        type="button"
        className={cx("secondaryBtn")}
        onClick={onDownloadTemplate}
      >
        Tải mẫu CSV
      </Button>
      <Button type="button" className={cx("primaryBtn")} onClick={onExportAll}>
        Xuất CSV (All)
      </Button>
    </div>
  );
}

export default ImportControls;
