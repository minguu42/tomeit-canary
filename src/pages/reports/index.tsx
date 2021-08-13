import Head from "next/head";

import TopAppBar from "components/common/TopAppBar";
import ReportsHeading from "components/reports/ReportsHeading";
import styles from "pages/reports/Reports.module.scss";

const Reports = (): JSX.Element => (
  <>
    <Head>
      <title>レポート - tomeit</title>
    </Head>
    <TopAppBar />
    <main className={styles.main}>
      <ReportsHeading date={new Date()} />
    </main>
  </>
);

export default Reports;
