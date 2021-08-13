import styles from "components/reports/ReportsHeading/ReportsHeading.module.scss";

type Props = {
  date: Date;
};

export const ReportsHeading = ({ date }: Props): JSX.Element => (
  <div className={styles.container}>
    <h2>今日のレポート</h2>
    <p>
      {date.toLocaleDateString("ja-JP", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}
    </p>
  </div>
);

export default ReportsHeading;
