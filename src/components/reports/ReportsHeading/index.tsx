import styles from "./styles.module.scss";
import { formatToLocalDate } from "lib/format";

type Props = {
  date: Date;
};

export const ReportsHeading = ({ date }: Props): JSX.Element => (
  <div className={styles.container}>
    <h2>今日のレポート</h2>
    <p>{formatToLocalDate(date)}</p>
  </div>
);

const ReportsHeadingContainer = (): JSX.Element => {
  const today = new Date();
  return <ReportsHeading date={today} />;
};

export default ReportsHeadingContainer;
