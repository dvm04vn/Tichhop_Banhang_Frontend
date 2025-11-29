import { useCallback } from "react";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";

import ImportControls from "~/components/ImportControls";
import ImportedSection from "~/components/ImportedSection";
import ErrorLogSection from "~/components/ErrorLogSection";
import { useImportData } from "~/hooks/useImportData";

const cx = classNames.bind(styles);
const DEMO_JOB_ID = "019aca05-a654-7187-b6c3-401f72eed3ba";

function Home() {
  const {
    session,
    loading,
    error,
    refresh,
    clearSession,
    exportAll,
    exportImported,
    exportLog,
    downloadTemplate,
  } = useImportData(DEMO_JOB_ID);

  const handleRefresh = useCallback(() => {
    refresh();
  }, [refresh]);

  return (
    <div className={cx("wrapper")}>
      <section className={cx("etlCard")}>
        <header className={cx("etlHeader")}>
          <div className={cx("etlBadge")}>ETL</div>
          <div>
            <h2 className={cx("etlTitle")}>
              Tích hợp: Bán hàng ↔ Quản lý kho
            </h2>
            <p className={cx("etlSubtitle")}>
              Pipeline: CSV Import → Validate → Split (Imported / Error) → DB
            </p>
          </div>
        </header>

        <ImportControls
          onDownloadTemplate={downloadTemplate}
          onExportAll={exportAll}
          onRefresh={handleRefresh}
        />

        {loading && (
          <p className={cx("stateText")}>Đang tải dữ liệu import...</p>
        )}
        {error && (
          <p className={cx("stateError")}>
            Có lỗi khi lấy dữ liệu import. Kiểm tra console.
          </p>
        )}

        {session && (
          <div className={cx("contentGrid")}>
            <ImportedSection
              summary={{
                totalRecords: session.summary.totalRecords,
                totalErrors: session.summary.totalErrors,
              }}
              rows={session.importedRows}
              onExportImported={exportImported}
              onClear={clearSession}
            />
            <ErrorLogSection logs={session.errorLogs} onExportLog={exportLog} />
          </div>
        )}

        <p className={cx("note")}>
          Ghi chú: Đây là giao diện demo cho pipeline ETL. Bạn có thể kết nối
          API để CRUD dữ liệu thực và thay jobId demo bằng jobId thực tế.
        </p>
      </section>
    </div>
  );
}

export default Home;
