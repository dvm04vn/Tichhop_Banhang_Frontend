import { useCallback } from "react";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";

import ImportControls from "~/components/ImportControls";
import ImportedSection from "~/components/ImportedSection";
import ErrorLogSection from "~/components/ErrorLogSection";
import useImportData from "~/hooks/useImportData";

const cx = classNames.bind(styles);

function Home() {
  const {
    importedRows,
    errorLogs,
    totalImported,
    totalErrors,
    handleImport,
    exportImported,
    exportErrorLog,
    clearImported,
    clearErrors,
    downloadTemplate,
  } = useImportData();

  const handleClearAll = useCallback(() => {
    clearImported();
    clearErrors();
  }, [clearImported, clearErrors]);

  return (
    <div className={cx("page")}>
      <div className={cx("frame")}>
        <div className={cx("topRow")}>
          <div className={cx("etlInfo")}>
            <div className={cx("etlBadge")}>ETL</div>
            <div className={cx("etlText")}>
              <div className={cx("etlTitle")}>
                Tích hợp: Bán hàng ↔ Quản lý kho
              </div>
              <div className={cx("etlSubtitle")}>
                Pipeline: CSV import → Validate → Split (Imported / Error) → DB
              </div>
            </div>
          </div>

          <div className={cx("etlActions")}>
            <ImportControls
              uploadFile={handleImport}
              exportCSV={exportImported}
              clearAll={handleClearAll}
              downloadTemplate={downloadTemplate}
            />
          </div>
        </div>

        <div className={cx("content")}>
          <ImportedSection
            data={importedRows}
            total={totalImported}
            onExport={exportImported}
            onClear={clearImported}
          />

          <ErrorLogSection
            errors={errorLogs}
            total={totalErrors}
            onExportLog={exportErrorLog}
            onClear={clearErrors}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
