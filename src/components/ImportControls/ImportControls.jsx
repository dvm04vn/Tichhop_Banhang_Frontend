import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "./ImportControls.module.scss";

const cx = classNames.bind(styles);

function ImportControls({
  onDownloadTemplate,
  onExportAll,
  onRefresh,
  onOpenImportModal,
}) {
  return (
    <div className={cx("wrapper")}>
      {/* 1. Import CSV */}
      {onOpenImportModal && (
        <Button
          type="button"
          className={cx("secondaryBtn")}
          onClick={onOpenImportModal}
        >
          Import CSV
        </Button>
      )}
      {/* 2. Tải mẫu CSV */}
      <Button
        type="button"
        className={cx("secondaryBtn")}
        onClick={onDownloadTemplate}
      >
        Tải mẫu CSV
      </Button>

      {/* 3. Xuất CSV (All) */}
      <Button type="button" className={cx("primaryBtn")} onClick={onExportAll}>
        Xuất CSV (All)
      </Button>
      {onRefresh && (
        <Button
          type="button"
          className={cx("secondaryBtn")}
          onClick={onRefresh}
        >
          Refresh
        </Button>
      )}
    </div>
  );
}

export default ImportControls;
