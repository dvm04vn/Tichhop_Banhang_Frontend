import styles from "./Home.module.scss";
import classNames from "classnames/bind";

import ImportControls from "~/components/ImportControls";
import ImportedSection from "~/components/ImportedSection";
import ErrorLogSection from "~/components/ErrorLogSection";
import useImportData from "~/hooks/useImportData";

const cx = classNames.bind(styles);

function Home() {
  const { imported, errors, uploadFile, exportCSV, clearAll } = useImportData();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("ImportControls")}>
        <ImportControls
          uploadFile={uploadFile}
          exportCSV={exportCSV}
          clearAll={clearAll}
        />
      </div>

      <div className={cx("content")}>
        <ImportedSection data={imported} />

        <ErrorLogSection errors={errors} />
      </div>
    </div>
  );
}

export default Home;
